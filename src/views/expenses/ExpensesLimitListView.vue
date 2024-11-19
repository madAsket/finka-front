<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import AddExpenseCategoryModalView from "@/views/expenses/AddExpenseCategoryModalView.vue"
import {useProjectStore} from "@/stores/project"
import { useBalanceStore } from '@/stores/balance';

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();
const currentLimit = ref(1000);

const limits = ref([]);

onMounted(async () => {
    limits.value = await balanceStore.getMonthsCategories(projectStore.currentProject.Project.id);
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat('eu-EU', { style: 'currency', currency: 'EUR' }).format(value);
}

const categoryColor = (value) => {
    return `bg-${value}`
}

const isAddExpenseCategoryModalShown = ref(false);
function showAddExpenseCategoryModal(){
    isAddExpenseCategoryModalShown.value = true;
}

const addCategory = (newCategory) => {
    isAddExpenseCategoryModalShown.value = false;
    limits.value.push(newCategory);
};

</script>
<template>

<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Current month limits</h1>
        <p class="text-xs"><b>Project:</b> {{projectStore.currentProject.Project.name}}.</p>
    </div>
    <div>
        <Button  class="mr-2 mb-5" @click="showAddExpenseCategoryModal" icon="pi pi-plus" label="Add category"  size="small" />
    </div>
    <AddExpenseCategoryModalView v-model:visible="isAddExpenseCategoryModalShown" @add-category="addCategory" :currentLimit="currentLimit" />
    <div>
        <DataTable :value="limits" stripedRows  class="text-xs" tableStyle="max-width: 40rem">
            <Column field="category.label" header="Category"  >
                <template #body="{ data }">
                    <Chip :label="data.name"></Chip>
                </template>
            </Column>
            <Column field="amount" header="Spent / Limit" >
                <template #body="{ data }">
                    {{ $formatCurrency(data.spent, projectStore.currentProject.Project.currency) }} / <b>{{ $formatCurrency(data.limit.limit, projectStore.currentProject.Project.currency) }}</b>
                </template>
            </Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <div class="grid grid-cols-1">
                        <Button class="w-7 h-7 text-slate-500" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped></style>