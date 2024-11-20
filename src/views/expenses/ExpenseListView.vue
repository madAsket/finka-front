<script setup>
import { ref, onMounted } from 'vue';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import {useProjectStore} from "@/stores/project"
import {useBalanceStore} from "@/stores/balance"

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();


onMounted(async () => {
    await balanceStore.loadExpenses(projectStore.currentProject.Project.id);
});

const baseCurrency = ref(projectStore.currentProject.Project.currency);

const formatDate = (dateString) =>{
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB',{year: 'numeric', month: 'numeric', day: 'numeric',}).format(date);
}

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Current month expenses</h1>
        <p class="text-xs"><b>Project:</b> {{projectStore.currentProject.Project.name}}</p>
    </div>
    <div>
        <DataTable :value="balanceStore.sortedExpenses" stripedRows  class="text-xs" tableStyle="max-width: 60rem">
            <Column field="description" header="Description" class="max-w-40"></Column>
            <Column field="category.label" header="Category"  >
                <template #body="{ data }">
                    <Chip :label="data.ExpenseCategory.name" class=" bg-orange-100"></Chip>
                </template>
            </Column>
            <Column field="expensedAt" header="Date">
                <template #body="{ data }">
                    {{ formatDate(data.expensedAt) }}
                </template>
            </Column>
            <Column field="amount" header="Amount" >
                <template #body="{ data }">
                    <b>{{ $convertCurrency(data.amount, data.Storage.currency, baseCurrency) }}</b>
                </template>
            </Column>
            <Column field="Storage.name" header="From" ></Column>
            <Column field="spender" header="Spent by">
                <template #body="{ data }">
                    <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="data.User.firstName" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                </template>
            </Column>
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