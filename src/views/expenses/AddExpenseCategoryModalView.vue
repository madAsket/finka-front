<script setup>
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import { ref, onMounted, computed, watch } from 'vue';
import DatePicker from 'primevue/datepicker'
import Fieldset from 'primevue/fieldset'
import Divider from 'primevue/divider';

const visible = defineModel('visible')
const currentMonthLimit = 2800;
const currentNewMonthLimit = ref(currentMonthLimit);
const amount = ref();

const formatCurrency = (value) => {
    return new Intl.NumberFormat('eu-EU', { style: 'currency', currency: 'EUR' }).format(value);
}

watch(amount, (newAmount) => {
  console.log(`x is ${newAmount}`)
  if(newAmount > 0){
    currentNewMonthLimit.value = currentMonthLimit + newAmount;
  }else{
    currentNewMonthLimit.value = currentMonthLimit; 
    }
})

</script>
<template>
    <Dialog v-model:visible="visible" modal header="Add Category" :style="{ width: '25rem' }">
        <div class="flex flex-col gap-y-5">
            <div class="mb-2">
                <InputText type="name" placeholder="Name"  fluid/>
            </div>
            <div class="">
                <h1 class="text-lg font-light mb-2">Set limit for current month</h1>
                <InputNumber v-model="amount" name="amount" autocomplete="off" placeholder="Limit (optional)" 
                inputId="amount" mode="currency" currency="EUR" locale="de-DE" fluid />
            </div>
            <h1 class="text-lg font-light uppercase">New limit: <span class="font-extrabold">{{ formatCurrency(currentNewMonthLimit) }}</span></h1>
        </div>
        <template #footer>
            <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
            <Button label="Add"  autofocus />
        </template>
    </Dialog>    
</template>