<script setup>
import { ref, onMounted } from 'vue';
import Button from "primevue/button"
import AddExpenseCategoryModalView from "@/views/expenses/limits/AddExpenseCategoryForm.vue"
import {useProjectStore} from "@/stores/project"
import { useBalanceStore } from '@/stores/balance';
import ExpenseLimitItemView from '@/views/expenses/limits/ExpenseLimitItem.vue';
import BaseEmptyList from '@/components/BaseEmptyList.vue';
import BaseListHeader from '@/components/BaseListHeader.vue';

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
    <BaseListHeader>
        <template #title>
            Current month limits
        </template>
        <template #subtitle>
            <b>Project:</b> {{projectStore.currentProject.Project.name}}
        </template>
        <template #button>
            <Button v-if="resLoaded && limits.length"  
        class="mr-2"
        @click="showAddExpenseCategoryModal" 
        icon="pi pi-plus" 
        label="Add category"  
        size="small" />
        </template>
    </BaseListHeader>
    <AddExpenseCategoryModalView v-model:visible="isAddExpenseCategoryModalShown" @add-category="addCategory" />

    <div class="divide-indigo-100 divide-y flex flex-col content-start">
        <BaseEmptyList v-if="resLoaded && !limits.length"
        buttonLabel="Add category"
        :buttonAction="showAddExpenseCategoryModal">
            <template #title>You don't have any limit category yet</template>
            <template #subtitle></template>
            <template #content>You can add one here. Lets do it now!</template>
        </BaseEmptyList>
        <ExpenseLimitItemView v-for="item in limits" :key="item.id"
        :expenseLimit="item" />
    </div>
</div>
</template>
<style scoped></style>