<script setup>
import { ref, onMounted } from 'vue';
import Button from "primevue/button"
import AddExpenseCategoryModalView from "@/views/expenses/limits/AddExpenseCategoryForm.vue"
import {useProjectStore} from "@/stores/project"
import { useBalanceStore } from '@/stores/balance';
import ExpenseLimitItemView from '@/views/expenses/limits/ExpenseLimitItem.vue';
import BaseEmptyList from '@/components/BaseEmptyList.vue';

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();

const limits = ref([]);
const resLoaded = ref(false);

onMounted(async () => {
    limits.value = await balanceStore.getMonthsCategories(projectStore.currentProject.Project.id);
    resLoaded.value = true;
});

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
        <Button v-if="resLoaded && limits.length"  
        class="mr-2 mb-5"
        @click="showAddExpenseCategoryModal" 
        icon="pi pi-plus" 
        label="Add category"  
        size="small" />
    </div>
    <AddExpenseCategoryModalView v-model:visible="isAddExpenseCategoryModalShown" @add-category="addCategory" />

    <div class="divide-indigo-100 divide-y flex flex-col content-start min-w-fit max-w-2xl">
        <BaseEmptyList v-if="resLoaded && !limits.length" 
        class="max-w-2xl" 
        buttonLabel="Add category"
        :buttonAction="showAddExpenseCategoryModal">
            <template #title>You don't have any limit category yet</template>
            <template #subtitle></template>
            <template #content>You can add one here. Lets do it now!</template>
        </BaseEmptyList>
        <ExpenseLimitItemView v-for="item in limits" :key="item.id"
        :expenseLimit="item" />
    </div>
    <div>
        <!-- <DataTable :value="limits" stripedRows  class="text-xs" tableStyle="max-width: 40rem">
            <Column field="category.label" header="Category"  >
                <template #body="{ data }">
                    <Chip :label="data.name"></Chip>
                </template>
            </Column>
            <Column field="amount" header="Spent / Limit" >
                <template #body="{ data }">
                    {{ $formatCurrency(data.spent || 0, projectStore.currentProject.Project.currency) }} / <b>{{ $formatCurrency(data.limit.limit, projectStore.currentProject.Project.currency) }}</b>
                </template>
            </Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <div class="grid grid-cols-1">
                        <Button class="w-7 h-7 text-slate-500" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
                    </div>
                </template>
            </Column>
        </DataTable> -->
    </div>
</div>
</template>
<style scoped></style>