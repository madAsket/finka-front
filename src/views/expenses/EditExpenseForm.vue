<script setup>
import Button from 'primevue/button';
import Message from 'primevue/message';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import DatePicker from 'primevue/datepicker';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref, inject, onMounted } from 'vue';
import { useBalanceStore } from '@/stores/balance';
import { useProjectStore } from '@/stores/project';
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();
const emit = defineEmits(['save']);
const balanceStore = useBalanceStore();
const projectStore = useProjectStore();
const dialogRef = inject('dialogRef');
const users = ref([]);
const categories = ref([]);
const model = ref(dialogRef.value.data.model);

const schema = yup.object({
    description: yup.string().required().max(50).label('Description'),
    spender: yup.number().required().label('Spender'),
    category: yup.number().required().label('Category'),
    expensedAt: yup.date().required().label('Expense date'),
});

const { defineField, handleSubmit,setErrors, setValues, resetForm, errors } = useForm({
    validationSchema: schema,
});

const [description] = defineField('description');
const [category] = defineField('category');
const [spender] = defineField('spender');
const [expensedAt] = defineField('expensedAt');

onMounted(async()=>{
    users.value = await projectStore.getProjectUsers(projectStore.currentProject.projectId);
    categories.value = await balanceStore.getProjectCategories(projectStore.currentProject.projectId);
    setValues({ 
        description: model.value.description, 
        spender: model.value.User.id, 
        expensedAt:new Date(model.value.expensedAt),
        category:model.value.ExpenseCategory.id,
    }, false);
});

const onEdit = handleSubmit(async (values) => {
    const result = await balanceStore.editExpense(model.value.projectId, model.value.id, values);
    if(result.status === "success"){
        Object.assign(model.value, result);
        emit('save');
        dialogRef.value.close();
        toastManager.show("Expense updated!");
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
    <form @submit="onEdit">
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
            <div class="grid gap-2 grid-cols-2">
                <div class="field">
                    <DatePicker v-model="expensedAt" showIcon fluid iconDisplay="input" placeholder="Expense date" dateFormat="dd.mm.yy"
                    :class="{ 'p-invalid': errors.expensedAt }" />
                    <Message v-if="errors.expensedAt"  size="small" severity="error" variant="simple">{{ errors.expensedAt }}</Message>
                </div>
                <div class="field">
                    <Select  
                    class="h-full"
                    name="spender" v-model="spender" :options="users" :highlightOnSelect="false" 
                    optionLabel="firstName" optionValue="id" fluid
                    :class="{ 'p-invalid': errors.spender }" >
                    </Select>
                    <Message v-if="errors.spender"  size="small" severity="error" variant="simple">{{ errors.spender }}</Message>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <Button label="Cancel" text severity="secondary" @click="dialogRef.close()" autofocus />
            <Button label="Save" class="ml-2" type="submit" autofocus />
        </div>
    </form>
</template>