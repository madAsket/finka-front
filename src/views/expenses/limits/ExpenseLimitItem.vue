<script setup>
import Chip from "primevue/chip"
import Button from "primevue/button"
import { useBalanceStore } from "@/stores/balance";
import { ref } from "vue";
import { useDialogManager } from "@/composables/dialog";
import { useProjectStore } from "@/stores/project";
import EditExpenseCategoryModalView from "@/views/expenses/limits/EditExpenseCategoryForm.vue";

const projectStore = useProjectStore();
const props = defineProps({
    expenseLimit:Object
});
const dialogManager = useDialogManager();

const expenseLimit = ref(props.expenseLimit)

const openEditForm = ()=>{
    dialogManager.openDialog(EditExpenseCategoryModalView, {
        props:{
            header: 'Edit expense category',
        },
        data: {
            model:expenseLimit
        }
    });
}

</script>
<template>
    <div class="flex items-center justify-start py-2">
        <div class="flex flex-col w-48 mr-1 items-start justify-start">
            <h3 class="text-sm mb-1">
                <span class="mr-2 text-xs font-bold">{{ expenseLimit.name }}</span>
            </h3>
        </div>
        <div class="flex items-end mr-2 flex-col ml-auto w-32">
            <p class="font-semibold text-xs">
                <span class="text-red-800">{{ $formatCurrency(expenseLimit.spent || 0, projectStore.currentProject.Project.currency) }}</span> / <span class="text-green-800">{{ $formatCurrency(expenseLimit.limit.limit, projectStore.currentProject.Project.currency) }}</span>
            </p>
        </div>
        <div class="flex items-start ml-auto gap-2">
            <Button @click="openEditForm" class="w-7 h-7 text-slate-400" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
        </div>
    </div>
</template>