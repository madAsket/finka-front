<script setup>
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select'
import Message from 'primevue/message'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import Chip from 'primevue/chip'
import { ref, onMounted, onUpdated, computed, watch, watchEffect } from 'vue';
import Fieldset from 'primevue/fieldset'
import Divider from 'primevue/divider';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import BalanceService from "@/services/BalanceService"
import {useProjectStore} from "@/stores/project"
import {useAuthStore} from "@/stores/auth"
import {useBalanceStore} from "@/stores/balance"

const visible = defineModel('visible');
const projectStore = useProjectStore();
const authStore = useAuthStore();
const balanceStore = useBalanceStore();

const categories = ref([]);
const storages = ref([]);
const users = ref([]);
const availableBalance = ref();

const schema = yup.object({
  amount: yup.number().nullable().min(0).max(9999999999999999999.9999999999).label('Limit'),
  description: yup.string().required().label('Name'),
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

onUpdated(()=>{
    resetForm();
    setValues({ 
        spender: authStore.user.id, 
        expensedAt:new Date(),
        storage:storages.value[0]?.id,
        category:categories.value[0]?.id,
    });
});

const onAddExpense = handleSubmit(async (values) => {
    const result = await BalanceService.addExpense(projectStore.currentProject.Project.id, values);
    if(result.status === "success"){
        balanceStore.addExpense(result);
        visible.value = false;
    }else{
        let errors = result.fieldErrors;
        if(errors){
            setErrors(errors);
        }else{
            //TODO show something went wrong?
        }
    }

});

onMounted(async()=>{
    users.value = await projectStore.getProjectUsers(projectStore.currentProject.projectId);
    storages.value = await BalanceService.getNonEmptyStorages(projectStore.currentProject.projectId);
    categories.value = await BalanceService.getProjectCategories(projectStore.currentProject.projectId);
});

</script>
<template>
    <Dialog v-model:visible="visible" modal header="Add Expense" :style="{ width: '25rem' }">
        <form @submit="onAddExpense">
            <div class="mb-4 flex flex-col gap-y-5">
                <div class="field">
                    <InputText type="text" v-model="description" placeholder="Description" fluid
                    :class="{ 'p-invalid': errors.description }"/>
                    <Message v-if="errors.description"  size="small" severity="error" variant="simple">{{ errors.description }}</Message>
                </div>
                <div class="field">
                    <Select name="category" v-model="category" :options="categories" :highlightOnSelect="false" 
                    optionLabel="name" optionValue="id" placeholder="Select category" fluid
                    :class="{ 'p-invalid': errors.category }" >
                    </Select>
                    <Message v-if="errors.category"  size="small" severity="error" variant="simple">{{ errors.category }}</Message>
                </div>
                <div class="field">
                    <Select name="storage" v-model="storage" :options="storages" :highlightOnSelect="false" 
                    optionLabel="name" optionValue="id" placeholder="Select storage" fluid
                    :class="{ 'p-invalid': errors.storage }"  >
                    </Select>
                    <Message v-if="errors.storage"  size="small" severity="error" variant="simple">{{ errors.storage }}</Message>
                </div>
                <!-- <h1 class="text-sm font-light uppercase">Available balance: <span class="font-extrabold">11</span></h1> -->
                <div class="field">
                    <InputNumber v-model="amount" autocomplete="off" placeholder="Expense amount" 
                    inputId="amount" mode="currency" currency="EUR" locale="de-DE" fluid
                    :class="{ 'p-invalid': errors.amount }" />
                    <Message v-if="errors.amount"  size="small" severity="error" variant="simple">{{ errors.amount }}</Message>
                </div>
                <div class="grid gap-2 grid-cols-2">
                    <div class="field">
                        <DatePicker v-model="expensedAt" showIcon fluid iconDisplay="input" placeholder="Expense date" dateFormat="dd.mm.yy"
                        :class="{ 'p-invalid': errors.expensedAt }" />
                        <Message v-if="errors.expensedAt"  size="small" severity="error" variant="simple">{{ errors.expensedAt }}</Message>
                    </div>
                    <div class="field">
                        <Select  name="spender" v-model="spender" :options="users" :highlightOnSelect="false" 
                        optionLabel="firstName" optionValue="id" fluid
                        :class="{ 'p-invalid': errors.spender }" >
                        </Select>
                        <Message v-if="errors.spender"  size="small" severity="error" variant="simple">{{ errors.spender }}</Message>
                    </div>
                </div>
            </div>
            <div class="flex justify-end">
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button label="Add" type="submit" autofocus />
            </div>
        </form>
    </Dialog>    
</template>