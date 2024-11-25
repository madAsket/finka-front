<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import {useProjectStore} from "@/stores/project"
import {useBalanceStore} from "@/stores/balance"
import ExpenseItemView from './ExpenseItemView.vue';

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();


onMounted(async () => {
    await balanceStore.loadExpenses(projectStore.currentProject.Project.id);
});

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Current month expenses</h1>
        <p class="text-xs"><b>Project:</b> {{projectStore.currentProject.Project.name}}</p>
    </div>
    <div class="divide-indigo-100 divide-y flex flex-col content-start min-w-fit max-w-2xl">
        <ExpenseItemView v-for="item in balanceStore.sortedExpenses" :key="item.id"
        :expenseItem="item" 
        :baseCurrency="projectStore.currentProject.Project.currency"/>
    </div>
</div>
</template>
<style scoped>
</style>