<script setup>
import Chip from "primevue/chip"
import Button from "primevue/button"
import { useBalanceStore } from "@/stores/balance";
import EditExpenseModalView from "@/views/expenses/EditExpenseForm.vue";
import { ref } from "vue";
import { useDialogManager } from "@/composables/dialog";
import { useProjectStore } from "@/stores/project";
import BaseAvatar from "@/components/BaseAvatar.vue";
import { useToastManger } from '@/composables/toaster';
import { useConfirmManger } from "@/composables/confirmAction";

const confirmManager = useConfirmManger();
const toastManager = useToastManger();
const balanceStore = useBalanceStore();
const projectStore = useProjectStore();
const props = defineProps({
    expense:Object,
    baseCurrency:String
});
const dialogManager = useDialogManager();

const model = ref(props.expense)

const deleteExpense = confirmManager.confirmDelete(async ()=>{
    const result = await balanceStore.deleteExpense(model.value.projectId, model.value.id);
    if(result.status === "success"){
        toastManager.show('Expense deleted!');
    }
});

const openEditForm = ()=>{
    dialogManager.openDialog(EditExpenseModalView, {
        props:{
            header: 'Edit expense',
        },
        data: {
            model:model
        }
    });
}

</script>
<template>
    <div class="flex items-center justify-start py-2">
        <div class="mr-2">
            <BaseAvatar :avatar="model.User.avatar" :firstName="model.User.firstName"/>
        </div>
        <div class="flex flex-col sm:w-40 w-32 items-start justify-start">
            <span class="text-xs font-bold">
                <span class="pr-1">{{ $formatDate(model.expensedAt) }}</span> 
                <span class="max-sm:inline-block text-xs font-semibold text-slate-500">from {{ model.Storage.name }}</span>
            </span>
            <div class="text-xs max-sm:text-2xs text-slate-500 overflow-hidden">
                <span class="font-light max-sm:hidden">{{ model.description }}</span>
                <p>
                    <Chip :pt="{label:{class:'overflow-hidden max-h-4'}}" 
                    :label="model.ExpenseCategory.name"
                    class="bg-indigo-50 h-5 max-w-32 overflow-hidden"></Chip>
                </p>

            </div>
        </div>
        <div class="flex items-end ml-auto mr-2 flex-col w-28">
            <p class="font-semibold text-sm text-pink-800">-{{ $convertCurrency(model.amount, model.Storage.currency, baseCurrency) }}</p>
            <p  class="font-semibold text-xs text-gray-800" v-if="projectStore.currentProject.Project.currency !== model.Storage.currency">
                {{ $formatCurrency(model.amount, model.Storage.currency) }}
            </p>
        </div>
        <div class="flex items-start ml-auto gap-2">
            <Button @click="openEditForm" class="w-7 h-7 text-slate-400" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
            <Button @click="deleteExpense" class="w-7 h-7 text-red-300" size="small" icon="pi pi-trash" rounded outlined aria-label="Delete" />
        </div>
    </div>
</template>