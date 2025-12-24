<script setup>
import { ref, onMounted } from 'vue';
import Button from "primevue/button"
import {useProjectStore} from "@/stores/project"
import {useBalanceStore} from "@/stores/balance"
import ExpenseItem from '@/views/expenses/ExpenseItem.vue';
import BaseEmptyList from '@/components/BaseEmptyList.vue';
import AddExpenseForm from '@/views/expenses/AddExpenseForm.vue';
import { useDialogManager } from "@/composables/dialog";
import BaseListHeader from '@/components/BaseListHeader.vue';
import ExpenseFilters from './ExpenseFilters.vue';

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();
const dialogManager = useDialogManager();
const resLoaded = ref(false);

onMounted(async () => {
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
        <template #filters>
            <ExpenseFilters/>
        </template>
        <template #button>
            <Button 
            class="mr-2"
            @click="openExpenseForm" 
            icon="pi pi-plus" 
            label="Add expense"  
            size="small" />
        </template>
    </BaseListHeader>
    <div class="divide-indigo-100 divide-y flex flex-col content-start">
        <BaseEmptyList v-if="resLoaded && !balanceStore.sortedExpenses.length" buttonLabel="Add expense" :buttonAction="openExpenseForm">
            <template #title>No expenses for selected dates</template>
        </BaseEmptyList>
        <ExpenseItem v-for="item in balanceStore.sortedExpenses" :key="item.id"
        :expense="item" 
        :baseCurrency="projectStore.currentProject.Project.currency"/>
    </div>
</div>
</template>
<style scoped>
</style>