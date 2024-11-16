<script setup>
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import { ref, onMounted, onUpdated, computed, watch } from 'vue';
import DatePicker from 'primevue/datepicker'
import Chip from 'primevue/chip'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {useProjectStore} from "@/stores/project"
import {useAuthStore} from "@/stores/auth"
import BalanceService from "@/services/BalanceService"

const emit = defineEmits(['add-transfer'])
const visible = defineModel('visible');
const authStore = useAuthStore();
const projectStore = useProjectStore();


const schema = yup.object({
  fromStorage: yup.number().required().label('From Storage'),
  toStorage: yup.number().required().label('To Storage'),
  transferredAt: yup.date().required().label('Transfer date'),
  transferrer: yup.number().required().label('Transferror'),
  transferredAmount: yup.number().nullable().min(0).max(9999999999999999999.9999999999).label('Transfer'),
  receivedAmount: yup.number().nullable().min(0).max(9999999999999999999.9999999999).label('Recieve'),
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
    const result = await BalanceService.addTransfer(projectStore.currentProject.projectId, values);
    if(result.status === "success"){
        emit('add-transfer', result);
    }else{
        let errors = result.fieldErrors;
        if(errors){
            setErrors(errors);
        }else{
            alert("ERROR");
        }
    }
});

const storages = ref([]);
const fromStorages = ref([]);
const toStorages = ref([]);
const users = ref([])

onUpdated(()=>{
    resetForm();
    setValues({ 
        transferrer: authStore.user.id, 
        transferredAt:new Date(),
    });
})
onMounted(async()=>{
    users.value = await projectStore.getProjectUsers(projectStore.currentProject.projectId);
    const results = await BalanceService.getAllStorages(projectStore.currentProject.projectId);
    storages.value = results;
    fromStorages.value = results;
    toStorages.value = results;
});

watch(fromStorage, (newValue)=>{
    toStorages.value = storages.value.filter((item)=>{
        return item.id !== newValue;
    });
});

watch(toStorage, (newValue)=>{
    fromStorages.value = storages.value.filter((item)=>{
        return item.id !== newValue;
    });
})

</script>
<template>
    <Dialog v-model:visible="visible" modal header="Make transfer" :style="{ width: '25rem' }">
        <form @submit="onAddTransfer">
            <div class="mb-4 flex flex-col gap-y-5">
                <div>
                    <h1 class="text-lg">From storage</h1>
                    <div class="mb-2">
                        <div class="field">
                            <Select name="fromStorage" v-model="fromStorage" :options="fromStorages" :highlightOnSelect="false" 
                            optionLabel="name" optionValue="id" placeholder="Select storage" fluid
                            :class="{ 'p-invalid': errors.fromStorage }"  >
                            </Select>
                            <Message v-if="errors.fromStorage"  size="small" severity="error" variant="simple">{{ errors.fromStorage }}</Message>
                        </div>
                    </div>
                    <div class="field">
                        <InputNumber v-model="transferredAmount" autocomplete="off" placeholder="Amount to transfer" 
                        inputId="transferredAmount" mode="currency" currency="EUR" locale="de-DE" fluid 
                        :class="{ 'p-invalid': errors.transferredAmount }" />
                        <Message v-if="errors.transferredAmount"  size="small" severity="error" variant="simple">{{ errors.transferredAmount }}</Message>
                    </div>
                </div>
                <div>
                    <h1 class="text-lg">To storage</h1>
                    <div class="mb-2">
                        <div class="field">
                            <Select name="toStorage" v-model="toStorage" :options="toStorages" :highlightOnSelect="false" 
                            optionLabel="name" optionValue="id" placeholder="Select storage" fluid
                            :class="{ 'p-invalid': errors.toStorage }"  >
                            </Select>
                            <Message v-if="errors.toStorage"  size="small" severity="error" variant="simple">{{ errors.toStorage }}</Message>
                        </div>
                    </div>
                    <div class="field">
                        <InputNumber v-model="receivedAmount" autocomplete="off" placeholder="Amount to receive" 
                        inputId="receivedAmount" mode="currency" currency="EUR" locale="de-DE" fluid 
                        :class="{ 'p-invalid': errors.receivedAmount }" />
                        <Message v-if="errors.receivedAmount"  size="small" severity="error" variant="simple">{{ errors.receivedAmount }}</Message>
                    </div>
                </div>
                <div class="grid gap-2 grid-cols-2">
                    <div class="field">
                        <DatePicker v-model="transferredAt" showIcon fluid iconDisplay="input" placeholder="Transfer date" dateFormat="dd.mm.yy"
                        :class="{ 'p-invalid': errors.transferredAt }" />
                        <Message v-if="errors.transferredAt"  size="small" severity="error" variant="simple">{{ errors.transferredAt }}</Message>
                    </div>
                    <div class="field">
                        <Select  name="transferrer" v-model="transferrer" :options="users" :highlightOnSelect="false" 
                        optionLabel="firstName" optionValue="id" fluid
                        :class="{ 'p-invalid': errors.transferrer }" >
                        </Select>
                        <Message v-if="errors.transferrer"  size="small" severity="error" variant="simple">{{ errors.transferrer }}</Message>
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button label="Transfer" type="submit" autofocus />
            </div>
        </form>
    </Dialog>    
</template>