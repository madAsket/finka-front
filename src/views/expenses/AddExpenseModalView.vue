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
const storage = ref({label:"Bunq", value:1, currency:"EUR"});
const category = ref();
const date = ref();

const categories = ref([
    {
        color:"orange",
        id:'3',
        label:'Продукты',
    },
    {
        color:"orange",
        id:'2',
        label:'Такси/Транспорт',
    }
])

const storages = ref([
{
        id:1,
        origin_balance: 200,
        balance: 200,
        currency:"EUR",
        label:"Bunq"
    },
    {
        id:2,
        origin_balance: 5000,
        balance: 5000,
        currency:"EUR",
        label:"Счет в банке X"
    },
    {
        id:3,
        origin_balance: 0.2,
        balance: 4000,
        currency:"BTC",
        label:"Счет BTC Binance"
    },
]);
const author = ref(
    {
        id: '1000',
        username:"Денис",
        is_owner:true,
        avatar:"https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png",
        email:"kexbit@gmail.com"
    }
);
const users = ref([
    {
        id: '1000',
        username:"Денис",
        is_owner:true,
        avatar:"https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png",
        email:"kexbit@gmail.com"
    },
    {
        id: '1005',
        username:"Дарья",
        is_owner:false,
        avatar:"https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png",
        email:"dasha@gmail.com"
    },
])


</script>
<template>
    <Dialog v-model:visible="visible" modal header="Add Expense" :style="{ width: '25rem' }">
        <div class="mb-4 flex flex-col gap-y-5">
            <div class="">
                <InputText type="text" placeholder="Description"  fluid/>
            </div>
            <div class="">
                <Select name="category" v-model="category" :options="categories" :highlightOnSelect="false" optionLabel="label" placeholder="Select a category" fluid>
                </Select>
            </div>
            <div class="">
                <Select name="storage" v-model="storage" :options="storages" :highlightOnSelect="false" optionLabel="label" placeholder="Select a Storage" fluid>
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                            <div>{{ slotProps.value.label }} (<span class="font-medium">{{ slotProps.value.currency }}</span>)</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="max-w-36">
                            <div>{{ slotProps.option.label }} (<span class="font-medium">{{ slotProps.option.currency }}</span>)</div>
                        </div>
                    </template>
                </Select>
            </div>
            <div class="">
                <InputNumber v-model="amount" autocomplete="off" placeholder="Expense amount" 
                inputId="amount" mode="currency" currency="EUR" locale="de-DE" fluid />
            </div>

            <div class="grid gap-2 grid-cols-2">
                <DatePicker v-model="date" showIcon fluid iconDisplay="input" placeholder="Expense date" dateFormat="dd.mm.yy"/>
                <Select name="author" v-model="author" :options="users" :highlightOnSelect="false" optionLabel="username" fluid>
                    <template #value="slotProps">
                        <div v-if="slotProps.value">
                            <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="slotProps.value.username" :image="slotProps.value.avatar" />
                            <!-- <div>{{ slotProps.value.username }} (<span class="font-medium">{{ slotProps.value.avatar }}</span>)</div> -->
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="max-w-36">
                            <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="slotProps.option.username" :image="slotProps.option.avatar" />
                            <!-- <div>{{ slotProps.option.username }} (<span class="font-medium">{{ slotProps.option.avatar }}</span>)</div> -->
                        </div>
                    </template>
                </Select>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
            <Button label="Add"  autofocus />
        </template>
    </Dialog>    
</template>