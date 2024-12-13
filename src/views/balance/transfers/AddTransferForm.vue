<script setup>
import Button from 'primevue/button';
import Message from 'primevue/message';
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import { ref, onMounted, onUpdated, computed, watch, inject } from 'vue';
import DatePicker from 'primevue/datepicker'
import Chip from 'primevue/chip'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {useProjectStore} from "@/stores/project"
import {useAuthStore} from "@/stores/auth"
import { useBalanceStore } from '@/stores/balance';
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();
const dialogRef = inject('dialogRef');
const emit = defineEmits(['save']);
const authStore = useAuthStore();
const projectStore = useProjectStore();
const balanceStore = useBalanceStore();
const submiting = ref(false);

const schema = yup.object({
  fromStorage: yup.number().required().label('From Storage'),
  toStorage: yup.number().required().label('Target storage'),
  transferredAt: yup.date().required().label('Transfer date'),
  transferrer: yup.number().required().label('Transferror'),
  transferredAmount: yup.number().required().min(0.0000000001,"Min 0.0000000001").max(9999999999999999999.9999999999).label('Tranfsef amount'),
  receivedAmount: yup.number().required().min(0.0000000001,"Min 0.0000000001").max(9999999999999999999.9999999999).label('Recieve amount'),
}).noUnknown(true);

const { defineField, handleSubmit,setErrors, setValues, resetForm,errors } = useForm({
  validationSchema: schema,
});

const [fromStorage] = defineField('fromStorage');
const [toStorage] = defineField('toStorage');
const [transferredAt] = defineField('transferredAt');
const [transferrer] = defineField('transferrer');
const [transferredAmount] = defineField('transferredAmount');
const [receivedAmount] = defineField('receivedAmount');


const onAddTransfer = handleSubmit(async (values) => {
    submiting.value = true;
    const result = await balanceStore.addTransfer(projectStore.currentProject.projectId, values);
    submiting.value = false;
    if(result.status === "success"){
        emit('save', result);
        dialogRef.value.close();
        toastManager.show('Trasferred!');
    }else{
        let errors = result.fieldErrors;
        if(errors){
            setErrors(errors);
        }else{
            toastManager.error();
        }
    }
});
const fromStorageItem = ref(dialogRef.value.data?.currentStorage);
const toStorageItem = ref();
const storages = ref([]);
const fromStorages = ref([]);
const toStorages = ref([]);
const users = ref([])

onMounted(async()=>{
    users.value = await projectStore.getProjectUsers(projectStore.currentProject.projectId);
    const results = await balanceStore.getAllStorages(projectStore.currentProject.projectId);
    storages.value = results;
    fromStorages.value = results.filter((item)=>{
        return item.balance > 0;
    });
    toStorages.value = results;
    setValues({ 
        transferrer: authStore.user.id, 
        transferredAt:new Date(),
        fromStorage:fromStorageItem.value?.id
    },false);
});

const fromCurrency = computed(()=>{
    return fromStorageItem.value?.currency || projectStore.currentProject.Project.currency
}); 

const toCurrency = computed(()=>{
    return toStorageItem.value?.currency || projectStore.currentProject.Project.currency
}); 

watch(fromStorage, (newValue)=>{
    toStorages.value = storages.value.filter((item)=>{
        if(newValue === item.id){
            fromStorageItem.value = item;
        }
        return item.id !== newValue;
    });
});

watch(toStorage, (newValue)=>{
    fromStorages.value = storages.value.filter((item)=>{
        if(newValue === item.id){
            toStorageItem.value = item;
        }
        return item.id !== newValue;
    });
})

</script>
<template>
    <form @submit="onAddTransfer">
        <div class="mb-4 flex flex-col gap-y-5">
            <div>
                <h1 class="text-lg">From storage</h1>
                <div class="grid grid-cols-2 gap-1 mb-2">
                    <div class="field w-50">
                        <Select 
                        class="h-full"
                        name="fromStorage" v-model="fromStorage" :options="fromStorages" :highlightOnSelect="false" 
                        optionLabel="name" optionValue="id" placeholder="Select storage" fluid
                        :class="{ 'p-invalid': errors.fromStorage }"  >
                        </Select>
                        <Message v-if="errors.fromStorage"  size="small" severity="error" variant="simple">{{ errors.fromStorage }}</Message>
                    </div>
                    <div class="field w-50">
                        <InputNumber v-model="transferredAmount" autocomplete="off" placeholder="Amount to transfer" 
                        inputId="transferredAmount" v-bind="$currencyFieldProps(fromCurrency)" fluid 
                        :class="{ 'p-invalid': errors.transferredAmount }" />
                        <Message v-if="errors.transferredAmount"  size="small" severity="error" variant="simple">{{ errors.transferredAmount }}</Message>
                    </div>
                </div>
                <div v-if="fromStorageItem">
                    <small>Available balance:</small>
                    <h3>{{$formatCurrency(fromStorageItem.balance, fromStorageItem.currency)}}</h3>
                </div>
            </div>
            <div>
                <h1 class="text-lg">To storage</h1>
                <div class="grid grid-cols-2 gap-1 mb-2">
                    <div class="field">
                        <Select 
                        class="h-full"
                        name="toStorage" v-model="toStorage" :options="toStorages" :highlightOnSelect="false" 
                        optionLabel="name" optionValue="id" placeholder="Select storage" fluid
                        :class="{ 'p-invalid': errors.toStorage }"  >
                        </Select>
                        <Message v-if="errors.toStorage"  size="small" severity="error" variant="simple">{{ errors.toStorage }}</Message>
                    </div>
                    <div class="field">
                        <InputNumber v-model="receivedAmount" autocomplete="off" placeholder="Amount to receive" 
                        inputId="receivedAmount" v-bind="$currencyFieldProps(toCurrency)"  fluid 
                        :class="{ 'p-invalid': errors.receivedAmount }" />
                        <Message v-if="errors.receivedAmount"  size="small" severity="error" variant="simple">{{ errors.receivedAmount }}</Message>
                    </div>
                </div>
                <div v-if="toStorageItem">
                    <small>Updated balance:</small>
                    <h3>{{$formatCurrency((Number(receivedAmount || 0) + Number(toStorageItem.balance)), toStorageItem.currency)}}</h3>
                </div>
            </div>
            <div class="grid gap-2 grid-cols-2">
                <div class="field">
                    <DatePicker v-model="transferredAt" showIcon fluid iconDisplay="input" placeholder="Transfer date" dateFormat="dd.mm.yy"
                    :class="{ 'p-invalid': errors.transferredAt }" />
                    <Message v-if="errors.transferredAt"  size="small" severity="error" variant="simple">{{ errors.transferredAt }}</Message>
                </div>
                <div class="field">
                    <Select  
                    class="h-full"
                    name="transferrer" v-model="transferrer" :options="users" :highlightOnSelect="false" 
                    optionLabel="firstName" optionValue="id" fluid
                    :class="{ 'p-invalid': errors.transferrer }" >
                    </Select>
                    <Message v-if="errors.transferrer"  size="small" severity="error" variant="simple">{{ errors.transferrer }}</Message>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <Button label="Cancel" text severity="secondary" @click="dialogRef.close()" autofocus />
            <Button :loading="submiting" :disabled="submiting" label="Transfer" class="ml-2" type="submit" autofocus />
        </div>
    </form>
</template>