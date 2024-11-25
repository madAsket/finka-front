<script setup>
import Button from 'primevue/button';
import Select from 'primevue/select'
import MultiSelect from "primevue/multiselect"
import Message from 'primevue/message';
import InputNumber from 'primevue/inputnumber'
import { ref, onMounted, inject, watch } from 'vue';
import DatePicker from 'primevue/datepicker'
import Chip from 'primevue/chip'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {useProjectStore} from "@/stores/project"
import {useAuthStore} from "@/stores/auth"
import { useBalanceStore } from '@/stores/balance';

const dialogRef = inject('dialogRef');
const emit = defineEmits(['save'])
const authStore = useAuthStore();
const projectStore = useProjectStore();
const balanceStore = useBalanceStore();
const storages = ref([]);
const users = ref([]);
const currentCurrency = ref(projectStore.currentProject.Project.currency)

const schema = yup.object({
  storage: yup.number().required().label('Storage'),
  depositedAt: yup.date().required().label('Desposit date'),
  author: yup.number().required().label('Author'),
  amount: yup.number().nullable().min(0).max(9999999999999999999.9999999999).label('Amount'),
});

const { defineField, handleSubmit,setErrors, setValues, resetForm,errors } = useForm({
  validationSchema: schema,
});

const onAddDeposit = handleSubmit(async (values) => {
    const result = await balanceStore.addDeposit(projectStore.currentProject.projectId, values);
    if(result.status === "success"){
        emit('save', result);
        dialogRef.value.close();
    }else{
        let errors = result.fieldErrors;
        if(errors){
            setErrors(errors);
        }else{
            alert("ERROR");
        }
    }
});

const [storage] = defineField('storage');
const [depositedAt] = defineField('depositedAt');
const [author] = defineField('author');
const [amount] = defineField('amount');

onMounted(async()=>{
    users.value = await projectStore.getProjectUsers(projectStore.currentProject.projectId);
    storages.value = await balanceStore.getAllStorages(projectStore.currentProject.projectId);
    setValues({ 
        author: authStore.user.id, 
        depositedAt:new Date(),
        storage: dialogRef.value.data?.currentStorage ? dialogRef.value.data.currentStorage.id : storages.value[0]?.id}
    , false);
});


watch(storage, ()=>{
    const st = storages.value.find((item)=>{
        return item.id === storage.value;
    });
    if(st) currentCurrency.value = st.currency;
})
// const selectedTags = ref();


// const tags = ref([
//     {
//         color:"orange",
//         id:'3',
//         label:'Зарплата',
//     },
//     {
//         color:"orange",
//         id:'2',
//         label:'Карта',
//     },
//     {
//         color:"orange",
//         id:'1',
//         label:'Крипта',
//     },
//     {
//         color:"orange",
//         id:'1',
//         label:'Кэш',
//     }
// ])



</script>
<template>
    <form @submit="onAddDeposit">
        <div class="mb-4 flex flex-col gap-y-5">
            <div class="field">
                <Select name="storage" v-model="storage" :options="storages" :highlightOnSelect="false" 
                optionLabel="name" optionValue="id" placeholder="Select a Storage" fluid
                :class="{ 'p-invalid': errors.storage }" >
                </Select>
                <Message v-if="errors.storage"  size="small" severity="error" variant="simple">{{ errors.storage }}</Message>
            </div>
            <div class="field">
                <InputNumber v-model="amount" autocomplete="off" placeholder="Amount" 
                inputId="amount" v-bind="$currencyFieldProps(currentCurrency)" fluid
                :class="{ 'p-invalid': errors.amount }"  />
                <Message v-if="errors.amount"  size="small" severity="error" variant="simple">{{ errors.amount }}</Message>
            </div>
            <!-- <div class="">
                <MultiSelect v-model="selectedTags" display="chip" :options="tags" optionLabel="label" placeholder="Tags"
                    :maxSelectedLabels="3" fluid />
            </div> -->
            <div class="grid gap-2 grid-cols-2">
                <div class="field">
                    <DatePicker v-model="depositedAt" showIcon fluid iconDisplay="input" placeholder="Deposit date" dateFormat="dd.mm.yy"
                    :class="{ 'p-invalid': errors.depositedAt }" />
                    <Message v-if="errors.depositedAt"  size="small" severity="error" variant="simple">{{ errors.depositedAt }}</Message>
                </div>
                <div class="field">
                    <Select  name="author" v-model="author" :options="users" :highlightOnSelect="false" 
                    optionLabel="firstName" optionValue="id" fluid
                    :class="{ 'p-invalid': errors.author }" >
                        <!-- <template #value="slotProps">
                            <div v-if="slotProps.value">
                                <Chip size="small" small :pt="{image:{width:'20px',heigth:'20px;'}}" :label="slotProps.value.firstName" :image="slotProps.value.avatar" />
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="max-w-36">
                                <Chip size="small" :pt="{image:{style:'width:20px;height:20px'}}" :label="slotProps.option.firstName" :image="slotProps.option.avatar" />
                            </div>
                        </template> -->
                    </Select>
                    <Message v-if="errors.author"  size="small" severity="error" variant="simple">{{ errors.author }}</Message>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <Button label="Cancel" text severity="secondary" @click="dialogRef.close()" autofocus />
            <Button label="Top up" type="submit" autofocus />
        </div>
    </form> 
</template>