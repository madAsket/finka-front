<script setup>
import { ref, onMounted } from 'vue';
import {useProjectStore} from "@/stores/project"
import {useBalanceStore} from "@/stores/balance"
import ExpenseItem from '@/views/expenses/ExpenseItem.vue';
import BaseEmptyList from '@/components/BaseEmptyList.vue';
import AddExpenseForm from '@/views/expenses/AddExpenseForm.vue';
import { useDialogManager } from "@/composables/dialog";
import BaseListHeader from '@/components/BaseListHeader.vue';

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();
const dialogManager = useDialogManager();
const resLoaded = ref(false);

onMounted(async () => {
    await balanceStore.loadExpenses(projectStore.currentProject.Project.id);
    resLoaded.value = true;
});

const openExpenseForm = ()=>{
    dialogManager.openDialog(AddExpenseForm, {
        props:{
            header: 'Add expense',
        },
    });
}

</script>
<template>
<div>
    <BaseListHeader>
        <template #title>
            Current month expenses
        </template>
        <template #subtitle>
            <b>Project:</b> {{projectStore.currentProject.Project.name}}
        </template>
    </BaseListHeader>
    <div class="divide-indigo-100 divide-y flex flex-col content-start">
        <BaseEmptyList v-if="resLoaded && !balanceStore.sortedExpenses.length" buttonLabel="Add expense" :buttonAction="openExpenseForm">
            <template #title>You don't have any expenses yet</template>
            <template #subtitle></template>
            <template #content>You can create one here. Lets do it now!</template>
        </BaseEmptyList>
        <ExpenseItem v-for="item in balanceStore.sortedExpenses" :key="item.id"
        :expense="item" 
        :baseCurrency="projectStore.currentProject.Project.currency"/>
    </div>
</div>
</template>
<style scoped>
</style>