<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import TransferModalView from './TransferModalView.vue';
import BalanceService from "@/services/BalanceService"
import {useProjectStore} from "@/stores/project"

const projectStore = useProjectStore()

const router = useRouter();

const transfers = ref([])

onMounted(async () => {
    transfers.value = await BalanceService.getAllTransfers(projectStore.currentProject.Project.id);
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('eu-EU', { style: 'currency', currency: 'EUR' }).format(value);
}

const formatDate = (dateString) =>{
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB',{year: 'numeric', month: 'numeric', day: 'numeric',}).format(date);
}

const isTransferModalShown = ref(false);
function showTransferModal(){
    isTransferModalShown.value = true;
}

const addTransfer = (transfer) => {
    isTransferModalShown.value = false;
    transfers.value.push(transfer);
};

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
    <TransferModalView v-model:visible="isTransferModalShown" @add-transfer="addTransfer" />
    <div>
        <DataTable :value="transfers" stripedRows  class="text-xs" tableStyle="max-width: 60rem">
            <Column field="transferredAt" header="Date">
                <template #body="{ data }">
                    <b>{{ formatDate(data.transferredAt) }}</b>
                </template>
            </Column>
            <Column field="fromStorage.name" header="From"></Column>
            <Column field="transferredAmount" header="Transferred" >
                <template #body="{ data }">
                    <b v-if="data.fromStorage.currency !== 'EUR'">{{ data.transferredAmount }} {{ data.fromStorage.currency }}</b>
                    <b v-else>{{ formatCurrency(data.transferredAmount) }}</b>
                </template>
            </Column>
            <Column field="toStorage.name" header="To"></Column>
            <Column field="receivedAmount" header="Recieved" >
                <template #body="{ data }">
                    <b v-if="data.toStorage.currency !== 'EUR'">{{ data.receivedAmount }} {{ data.toStorage.currency }}</b>
                    <b v-else>{{ formatCurrency(data.receivedAmount) }}</b>
                </template>
            </Column>
            <Column field="transferrer" header="Author">
                <template #body="{ data }">
                    <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="data.User.firstName" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped>
</style>