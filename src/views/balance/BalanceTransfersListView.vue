<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import TransferModalView from './TransferModalView.vue';

const router = useRouter();

const deposits = ref([
        {
            id: '1000',
            transfer_date:"11/12/2024",
            author: {
                id:22,
                username:"Денис",
                avatar:""
            },
            from_source_amount: 200,
            to_target_amount: 190,
            source_storage: {
                id:'3',
                label:"Счет Binance USDT",
                currency:"USDT"
            },
            target_storage: {
                id:'3',
                label:"Bunq",
                currency:"EUR"
            }
        },
        {
            id: '1000',
            transfer_date:"12/12/2024",
            author: {
                id:22,
                username:"Денис",
                avatar:""
            },
            from_source_amount: 200,
            to_target_amount: 0.2,
            source_storage: {
                id:'3',
                label:"Bunq",
                currency:"EUR"
            },
            target_storage: {
                id:'3',
                label:"Binance BTC",
                currency:"BTC"
            }
        },
        {
            id: '1000',
            transfer_date:"12/12/2024",
            author: {
                id:22,
                username:"Денис",
                avatar:""
            },
            from_source_amount: 200,
            to_target_amount: 200,
            source_storage: {
                id:'3',
                label:"Caixa",
                currency:"EUR"
            },
            target_storage: {
                id:'3',
                label:"Bunq",
                currency:"EUR"
            }
        },
])
onMounted(() => {
});


const formatCurrency = (value) => {
    return new Intl.NumberFormat('eu-EU', { style: 'currency', currency: 'EUR' }).format(value);
}

const isTransferModalShown = ref(false);
function showTransferModal(){
    isTransferModalShown.value = true;
}

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Transfers</h1>
        <p class="text-xs"><b>Project:</b> Family budgeting.</p>
    </div>
    <div>
        <Button @click="showTransferModal" class="mr-2 mb-5" icon="pi pi-arrow-right-arrow-left" label="Make transfer"  size="small" />
    </div>
    <TransferModalView v-model:visible="isTransferModalShown"/>
    <div>
        <DataTable :value="deposits" stripedRows  class="text-xs" tableStyle="max-width: 60rem">
            <Column field="transfer_date" header="Date"></Column>
            <Column field="source_storage.label" header="From"></Column>
            <Column field="currency_amount" header="Transferred" >
                <template #body="{ data }">
                    <b v-if="data.source_storage.currency !== 'EUR'">{{ data.from_source_amount }} {{ data.source_storage.currency }}</b>
                    <b v-else>{{ formatCurrency(data.from_source_amount) }}</b>
                </template>
            </Column>
            <Column field="target_storage.label" header="To"></Column>
            <Column field="currency_amount" header="Recieved" >
                <template #body="{ data }">
                    <b v-if="data.target_storage.currency !== 'EUR'">{{ data.to_target_amount }} {{ data.target_storage.currency }}</b>
                    <b v-else>{{ formatCurrency(data.to_target_amount) }}</b>
                </template>
            </Column>
            <Column field="author" header="Author">
                <template #body="{ data }">
                    <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="data.author.username" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped>
</style>