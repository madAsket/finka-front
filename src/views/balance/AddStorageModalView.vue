<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import { ref, onUpdated } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import BalanceService from "@/services/BalanceService"
import {useProjectStore} from "@/stores/project"

const emit = defineEmits(['add-storage'])
const projectStore = useProjectStore()

const visible = defineModel('visible')
const currencies = ref([
    {label:"EUR",value:"EUR"},
    {label:"USD",value:"USD"},
    {label:"RUB",value:"RUB"},
    {label:"BTC",value:"BTC"},
    {label:"ETH",value:"ETH"},
    {label:"USDT",value:"USDT"},
])

const schema = yup.object({
  name: yup.string().required().label('Name'),
  currency: yup.object().required().label('Currency'),
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
    setValues({ currency: {label:"USD",value:"USD"}});
})

const onAddStorage = handleSubmit(async (values) => {
    const result = await BalanceService.addStorage(projectStore.currentProject.Project.id, values);
    emit('add-storage', result);
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
                    <Select name="currency" v-model="currency" :options="currencies" :highlightOnSelect="false" optionLabel="label" placeholder="Select currency" fluid
                    :class="{ 'p-invalid': errors.currency }" >
                    </Select>
                    <Message v-if="errors.currency"  size="small" severity="error" variant="simple">{{ errors.currency }}</Message>
                </div>
                <div class="field">
                    <h1 class="text-lg font-light mb-2">Set current balance</h1>
                    <InputNumber v-model="balance" name="balance" autocomplete="off" placeholder="Balance (optional)" 
                    inputId="balance" mode="currency" currency="EUR" locale="de-DE" fluid />
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