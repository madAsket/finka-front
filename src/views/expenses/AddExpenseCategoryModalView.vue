<script setup>
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import InputNumber from 'primevue/inputnumber'
import { onUpdated, computed } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {useProjectStore} from "@/stores/project"
import { useBalanceStore } from '@/stores/balance';
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();
const emit = defineEmits(['add-category'])
const projectStore = useProjectStore()
const balanceStore = useBalanceStore()


const visible = defineModel('visible');

const schema = yup.object({
  name: yup.string().max(30).required().label('Name'),
  limit: yup.number().nullable().min(0).max(9999999999999999999.9999999999).label('Limit'),
});

const { defineField, handleSubmit,setErrors, setValues, resetForm,errors } = useForm({
  validationSchema: schema,
});

const [name] = defineField('name');
const [limit] = defineField('limit');

onUpdated(()=>{
    resetForm();
})

const onAddCategory = handleSubmit(async (values) => {
    const result = await balanceStore.addExpenseCategory(projectStore.currentProject.Project.id, values);
    emit('add-category', result);
    toastManager.show("Category added!");
});

const currentNewMonthLimit = computed(() => {
    if(limit.value > 0){
        return balanceStore.limit + limit.value;
    }else{
        return balanceStore.limit;
    }
})

</script>
<template>
    <Dialog v-model:visible="visible" modal header="Add Category" :style="{ width: '25rem' }">
        <form @submit="onAddCategory">
            <div class="mb-4 flex flex-col gap-y-5">
                <div class="field">
                    <InputText id="name" v-model="name" type="text" placeholder="Name" fluid 
                    :class="{ 'p-invalid': errors.name }" />
                    <Message v-if="errors.name"  size="small" severity="error" variant="simple">{{ errors.name }}</Message>
                </div>
                <div class="field">
                    <h1 class="text-lg font-light mb-2">Set limit for current month</h1>
                    <InputNumber v-model="limit" autocomplete="off" placeholder="Limit" 
                    inputId="limit" v-bind="$currencyFieldProps(projectStore.currentProject.Project.currency)" fluid
                    :class="{ 'p-invalid': errors.limit }"  />
                    <Message v-if="errors.limit"  size="small" severity="error" variant="simple">{{ errors.limit }}</Message>
                </div>
                <h1 class="text-lg font-light uppercase">New limit: <span class="font-extrabold">{{ $formatCurrency(currentNewMonthLimit, projectStore.currentProject.Project.currency) }}</span></h1>
            </div>
            <div class="flex justify-end">
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button label="Add" type="submit" autofocus />
            </div>
        </form>
    </Dialog>    
</template>