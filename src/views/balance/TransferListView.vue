<script setup>
import { ref, onMounted } from 'vue';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import TransferModalView from './TransferModalView.vue';
import {useProjectStore} from "@/stores/project"
import { useBalanceStore } from '@/stores/balance';
import { useDialogManager } from '@/composables/dialog';

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();
const dialogManager = useDialogManager();
const transfers = ref([])

onMounted(async () => {
    transfers.value = await balanceStore.getAllTransfers(projectStore.currentProject.Project.id);
});

const formatDate = (dateString) =>{
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB',{year: 'numeric', month: 'numeric', day: 'numeric',}).format(date);
}

function showTransferModal(){
    dialogManager.openDialog(TransferModalView, {
        props:{
            header: 'Make transfer',
        },
        emits:{
            onSave: (transfer) => {
                addTransfer(transfer);
            }
        }
    });
}

const addTransfer = (transfer) => {
    transfers.value.push(transfer);
};

const deleteTransfer = async (transfer) => {
    const result = await balanceStore.deleteTransfer(transfer.projectId, transfer.id);
    if(result.status === "success"){
        transfers.value = transfers.value.filter((item)=>{
            return item.id !== transfer.id;
        });
    }
};

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Transfers</h1>
        <p class="text-xs"><b>Project:</b> {{projectStore.currentProject.Project.name}}</p>
    </div>
    <div>
        <Button @click="showTransferModal" class="mr-2 mb-5" icon="pi pi-arrow-right-arrow-left" label="Make transfer"  size="small" />
    </div>
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
                    <b>{{ $formatCurrency(data.transferredAmount, data.fromStorage.currency) }}</b>
                </template>
            </Column>
            <Column field="toStorage.name" header="To"></Column>
            <Column field="receivedAmount" header="Recieved" >
                <template #body="{ data }">
                    <b>{{ $formatCurrency(data.receivedAmount, data.toStorage.currency) }}</b>
                </template>
            </Column>
            <Column field="transferrer" header="Author">
                <template #body="{ data }">
                    <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="data.User.firstName" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                </template>
            </Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <Button @click="deleteTransfer(data)" class="w-7 h-7 text-red-300" size="small" icon="pi pi-trash" rounded outlined aria-label="Delete" />
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped>
</style>