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
import Fieldset from 'primevue/fieldset'
import Divider from 'primevue/divider';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {useProjectStore} from "@/stores/project"
import { useBalanceStore } from '@/stores/balance';

const emit = defineEmits(['add-category'])
const projectStore = useProjectStore()
const balanceStore = useBalanceStore()


const props = defineProps({
    currentLimit: {
        type: [Number, 0],
    }
});

const visible = defineModel('visible');

const schema = yup.object({
  name: yup.string().required().label('Name'),
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
});



const currentNewMonthLimit = computed(() => {
    console.log(props);
    console.log(limit.value);
    if(limit.value > 0){
        return props.currentLimit + limit.value;
    }else{
        return props.currentLimit;
    }
})

const formatCurrency = (value) => {
    return new Intl.NumberFormat('eu-EU', { style: 'currency', currency: 'EUR' }).format(value);
}

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
                    <InputNumber v-model="limit" name="limit" autocomplete="off" placeholder="Limit (optional)" 
                    inputId="balance" mode="currency" currency="EUR" locale="de-DE" fluid />
                    <Message v-if="errors.limit"  size="small" severity="error" variant="simple">{{ errors.limit }}</Message>
                </div>
                <h1 class="text-lg font-light uppercase">New limit: <span class="font-extrabold">{{ formatCurrency(currentNewMonthLimit) }}</span></h1>
            </div>
            <div class="flex justify-end">
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button label="Add" type="submit" autofocus />
            </div>
        </form>
    </Dialog>    
</template>