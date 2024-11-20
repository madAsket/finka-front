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

const baseCurrency = ref(projectStore.currentProject.Project.currency);

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Current month expenses</h1>
        <p class="text-xs"><b>Project:</b> {{projectStore.currentProject.Project.name}}</p>
    </div>
    <div>
        <div class="divide-indigo-100 divide-y flex flex-col content-start min-w-fit max-w-2xl">
            <div v-for="item in balanceStore.sortedExpenses" :key="item.id">
                <ExpenseItemView :expenseItem="item" :baseCurrency="baseCurrency"/>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
</style>