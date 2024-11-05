<script setup>
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import { ref, onMounted } from 'vue';
import DatePicker from 'primevue/datepicker'
import Chip from 'primevue/chip'

const visible = defineModel('visible')
const amount = ref();
const currency = ref({label:"EUR",value:"EUR"});
const currencies = ref([
    {label:"EUR",value:"EUR"},
    {label:"USD",value:"USD"},
    {label:"RUB",value:"RUB"},
    {label:"BTC",value:"BTC"},
    {label:"ETH",value:"ETH"},
    {label:"USDT",value:"USDT"},
])
</script>
<template>
    <Dialog v-model:visible="visible" modal header="Add Storage" :style="{ width: '25rem' }">
        <div class="mb-4 flex flex-col gap-y-5">
            <div class="">
                <InputText type="text" placeholder="Name"  fluid/>
            </div>
            <div class="">
                <Select name="currency" v-model="currency" :options="currencies" :highlightOnSelect="false" optionLabel="label" placeholder="Select currency" fluid>
                </Select>
            </div>
            <div class="">
                <h1 class="text-lg font-light mb-2">Set current balance</h1>
                <InputNumber v-model="amount" name="amount" autocomplete="off" placeholder="Balance (optional)" 
                inputId="amount" mode="currency" currency="EUR" locale="de-DE" fluid />
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
            <Button label="Add"  autofocus />
        </template>
    </Dialog>    
</template>