<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import AddDepositModalView from './AddDepositModalView.vue';
import BalanceService from "@/services/BalanceService"
import {useProjectStore} from "@/stores/project"

const projectStore = useProjectStore()

const deposits = ref([])
onMounted(async () => {
    deposits.value = await BalanceService.getAllDeposits(projectStore.currentProject.Project.id);
});


const formatDate = (dateString) =>{
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB',{year: 'numeric', month: 'numeric', day: 'numeric',}).format(date);
}

const addDeposit = (newDeposit) => {
    isAddDepositModalShown.value = false;
    deposits.value.push(newDeposit);
    //ERROR
    deposits.value.sort((a,b)=>{
        return new Date(b.depositedAt) - new Date(a.depositedAt);
    })
};

const isAddDepositModalShown = ref(false);
function showDepositModal(){
    isAddDepositModalShown.value = true;
}

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Deposits</h1>
        <p class="text-xs"><b>Project:</b> Family budgeting.</p>
    </div>
    <div>
        <Button @click="showDepositModal" class="mr-2 mb-5" icon="pi pi-credit-card" label="Top up"  size="small" />
    </div>
    <AddDepositModalView v-model:visible="isAddDepositModalShown" @add-deposit="addDeposit"/>
    <div>
        <DataTable :value="deposits" stripedRows  class="text-xs" tableStyle="max-width: 60rem">
            <Column field="amount" :header="`Amount (${projectStore.currentProject.Project.currency})`" >
                <template #body="{ data }">
                    <b> {{$convertCurrency(data.amount, data.Storage.currency, projectStore.currentProject.Project.currency)}}</b>
                </template>
            </Column>            
            <Column  header="Origin amount" class="max-w-40">
                <template #body="{ data }">
                    <b>{{ $formatCurrency(data.amount, data.Storage.currency) }}</b>
                </template>
            </Column>
            <Column field="depositedAt" header="Date">
                <template #body="{ data }">
                    <b>{{ formatDate(data.depositedAt) }}</b>
                </template>
            </Column>
            <Column field="User" header="Author">
                <template #body="{ data }">
                    <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="data.User.firstName" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                </template>
            </Column>
            <Column field="Storage.name" header="Storage"></Column>
            <Column field="Storage.currency" header="Origin currency"></Column>
            <!-- <Column field="tags" header="Tags" class="max-w-40">
                <template #body="{ data }">
                    <div class="flex flex-wrap gap-1 justify-items-start">
                        <Chip v-for="tag in data.tags" :label="tag" class="py-1" />
                    </div>
                </template>
            </Column> -->
            <Column header="Actions">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button class="w-7 h-7 text-slate-500" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
                        <Button class="w-7 h-7 text-red-300" size="small" icon="pi pi-trash" rounded outlined aria-label="Delete" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped>
</style>