<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select'
import Message from 'primevue/message'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import { ref, inject, onMounted, watch } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {useProjectStore} from "@/stores/project"
import {useAuthStore} from "@/stores/auth"
import {useBalanceStore} from "@/stores/balance"
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();
const projectStore = useProjectStore();
const authStore = useAuthStore();
const balanceStore = useBalanceStore();

const categories = ref([]);
const storages = ref([]);
const users = ref([]);
const fromStorage = ref();
const submiting = ref(false);

const schema = yup.object({
  amount: yup.number().required().min(0.0000000001,"Min 0.0000000001").max(9999999999999999999.9999999999).label('Amount'),
  description: yup.string().required().max(50).label('Description'),
  spender: yup.number().required().label('Spender'),
  storage: yup.number().required().label('Storage'),
  category: yup.number().required().label('Category'),
  expensedAt: yup.date().required().label('Expense date'),
});

const { defineField, handleSubmit,setErrors, setValues, resetForm,errors } = useForm({
  validationSchema: schema,
});

const [amount] = defineField('amount');
const [description] = defineField('description');
const [category] = defineField('category');
const [storage] = defineField('storage');
const [spender] = defineField('spender');
const [expensedAt] = defineField('expensedAt');

const dialogRef = inject('dialogRef');

onMounted(async ()=>{
    users.value = await projectStore.getProjectUsers(projectStore.currentProject.projectId);
    storages.value = await balanceStore.getNonEmptyStorages(projectStore.currentProject.projectId);
    categories.value = await balanceStore.getProjectCategories(projectStore.currentProject.projectId);
    setValues({ 
        spender: authStore.user.id, 
        expensedAt:new Date(),
        storage:storages.value[0]?.id,
        category:categories.value[0]?.id,
    }, false);
});

watch(storage, (newValue)=>{
    fromStorage.value = storages.value.find((item)=>{
        return item.id === newValue;
    });
});

const onAddExpense = handleSubmit(async (values) => {
    submiting.value = true;
    const result = await balanceStore.addExpense(projectStore.currentProject.Project.id, values);
    submiting.value = false;
    if(result.status === "success"){
        dialogRef.value.close();
        toastManager.show("Expense added!");
    }else{
        let errors = result.fieldErrors;
        if(errors){
            setErrors(errors);
        }else{
            toastManager.error();
        }
    }
});

</script>
<template>
    <form @submit="onAddExpense">
        <div class="mb-4 flex flex-col gap-y-4">
            <div class="field">
                <InputText type="text" v-model="description" placeholder="Description" fluid
                :class="{ 'p-invalid': errors.description }"/>
                <Message v-if="errors.description"  size="small" severity="error" variant="simple">{{ errors.description }}</Message>
            </div>
            <div class="field">
                <Select 
                class="h-full"
                name="category" v-model="category" :options="categories" :highlightOnSelect="false" 
                optionLabel="name" optionValue="id" placeholder="Select category" fluid
                :class="{ 'p-invalid': errors.category }" >
                </Select>
                <Message v-if="errors.category"  size="small" severity="error" variant="simple">{{ errors.category }}</Message>
            </div>
            <div class="grid grid-cols-2 gap-x-2">
                <div class="field">
                    <Select 
                    class="h-full"
                    name="storage" v-model="storage" :options="storages" :highlightOnSelect="false" 
                    optionLabel="name" optionValue="id" placeholder="Select storage" fluid
                    :class="{ 'p-invalid': errors.storage }"  >
                    </Select>
                    <Message v-if="errors.storage"  size="small" severity="error" variant="simple">{{ errors.storage }}</Message>
                </div>
                <!-- <h1 class="text-sm font-light uppercase">Available balance: <span class="font-extrabold">11</span></h1> -->
                <div class="field">
                    <InputNumber v-model="amount" autocomplete="off" placeholder="Expense amount" 
                    inputId="amount" v-bind="$currencyFieldProps(fromStorage?.currency)" fluid
                    :class="{ 'p-invalid': errors.amount }" />
                    <Message v-if="errors.amount"  size="small" severity="error" variant="simple">{{ errors.amount }}</Message>
                </div>
                <div v-if="fromStorage" class="col-span-2">
                    <small>Available balance:</small>
                    <h3>{{$formatCurrency(fromStorage.balance, fromStorage.currency)}}</h3>
                </div>
            </div>

            <div class="grid gap-2 grid-cols-2">
                <div class="field">
                    <DatePicker v-model="expensedAt" showIcon fluid iconDisplay="input" placeholder="Expense date" dateFormat="dd.mm.yy"
                    :class="{ 'p-invalid': errors.expensedAt }" />
                    <Message v-if="errors.expensedAt"  size="small" severity="error" variant="simple">{{ errors.expensedAt }}</Message>
                </div>
                <div class="field">
                    <Select  
                    class="h-full"
                    name="spender" 
                    v-model="spender" 
                    :options="users" 
                    :highlightOnSelect="false" 
                    optionLabel="firstName" 
                    optionValue="id" 
                    fluid
                    :class="{ 'p-invalid': errors.spender }" >
                    </Select>
                    <Message v-if="errors.spender"  size="small" severity="error" variant="simple">{{ errors.spender }}</Message>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <Button label="Cancel" text severity="secondary" @click="dialogRef.close()" autofocus />
            <Button :loading="submiting" :disabled="submiting" label="Add" class="ml-2" type="submit" autofocus />
        </div>
    </form> 
</template>