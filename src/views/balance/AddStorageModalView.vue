<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import { ref, onUpdated, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import {useProjectStore} from "@/stores/project"
import { useBalanceStore } from '@/stores/balance';

const emit = defineEmits(['add-storage'])
const projectStore = useProjectStore();
const balanceStore = useBalanceStore();

const visible = defineModel('visible')

const schema = yup.object({
  name: yup.string().required().label('Name'),
  currency: yup.string().required().label('Currency'),
  balance: yup.number().nullable().min(0).max(9999999999999999999.9999999999).label('Balance'),
});

const { defineField, handleSubmit,setErrors, setValues, resetForm,errors } = useForm({
  validationSchema: schema,
});

const [name] = defineField('name');
const [currency] = defineField('currency');
const [balance] = defineField('balance');

onUpdated(()=>{
    resetForm();
    setValues({ currency: projectStore.currentProject.Project.currency});
});

const onAddStorage = handleSubmit(async (values) => {
    const result = await balanceStore.addStorage(projectStore.currentProject.Project.id, values);
    emit('add-storage', result);
    visible.value = false;
});

</script>
<template>
    <Dialog v-model:visible="visible" modal header="Add Storage" :style="{ width: '25rem' }">
        <form @submit="onAddStorage">
            <div class="mb-4 flex flex-col gap-y-5">
                <div class="field">
                    <InputText id="name" v-model="name" type="text" placeholder="Name" fluid 
                    :class="{ 'p-invalid': errors.name }" />
                    <Message v-if="errors.name"  size="small" severity="error" variant="simple">{{ errors.name }}</Message>
                </div>
                <div class="field">
                    <Select name="currency" filter v-model="currency" :options="projectStore.getCurrencyList" :highlightOnSelect="false" 
                    optionGroupLabel="label" optionGroupChildren="items"
                    placeholder="Select currency" fluid
                    :class="{ 'p-invalid': errors.currency }" >
                    </Select>
                    <Message v-if="errors.currency"  size="small" severity="error" variant="simple">{{ errors.currency }}</Message>
                </div>
                <div class="field">
                    <h1 class="text-lg font-light mb-2">Set current balance</h1>
                    <InputNumber v-model="balance" name="balance" autocomplete="off" placeholder="Balance (optional)" 
                    inputId="balance" v-bind="$currencyFieldProps(currency)" fluid
                    :class="{ 'p-invalid': errors.balance }"  />
                    <Message v-if="errors.balance"  size="small" severity="error" variant="simple">{{ errors.balance }}</Message>
                </div>
            </div>
            <div class="flex justify-end">
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button label="Add" type="submit" autofocus />
            </div>
        </form>
    </Dialog>    
</template>