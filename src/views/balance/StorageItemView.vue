<script setup>
import Button from "primevue/button"
import { useProjectStore } from "@/stores/project";
import { useDialogManager } from "@/composables/dialog";
import TransferModalView from "./TransferModalView.vue";
import AddDepositModalView from "./AddDepositModalView.vue";

const emit = defineEmits(['makeTransfer', 'makeDeposit']);

const projectStore = useProjectStore();
const props = defineProps({
    storage:Object
})
const dialogManager = useDialogManager();

const openTransferForm = ()=>{
    dialogManager.openDialog(TransferModalView, {
        props:{
            header: 'Make transfer',
        },
        data: {
            currentStorage:props.storage
        },
        emits:{
            onSave: (transfer) => {
                emit('makeTransfer', transfer);
            }
        }
    });
}

const openDepositForm = ()=>{
    dialogManager.openDialog(AddDepositModalView, {
        props:{
            header: 'Top up',
        },
        data: {
            currentStorage:props.storage
        },
        emits:{
            onSave: (deposit) => {
                emit('makeDeposit', deposit);
            }
        }
    });
}

</script>
<template>
    <div class="flex items-center justify-start py-2">
        <div class="flex flex-col w-32 mr-1 items-start justify-start">
            <h3 class="text-sm  mb-1">
                <span class="mr-2 text-xs font-bold"> {{ storage.name }}</span>
            </h3>
            <p class="text-xs text-slate-500 overflow-hidden">
                <span class="font-light">{{ storage.currency }}</span>
            </p>
        </div>
        <div class="flex items-start justify-center flex-col ml-auto w-32">
            <p class="font-semibold text-sm text-green-800" :class="{'!text-pink-800': Number(storage.balance) === 0}">
                {{$convertCurrency(storage.balance, storage.currency, projectStore.currentProject.Project.currency)}}
            </p>
            <p  class="font-semibold text-xs text-gray-800" v-if="projectStore.currentProject.Project.currency !== storage.currency">
                {{ $formatCurrency(storage.balance, storage.currency) }}
            </p>
        </div>
        <div class="flex items-start ml-auto gap-2">
            <Button class="w-7 h-7 text-slate-500" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
            <Button @click="openDepositForm" class="w-7 h-7 text-green-600" size="small" icon="pi pi-plus" rounded outlined aria-label="Top up" />
            <Button @click="openTransferForm" class="w-7 h-7 text-slate-400" size="small" icon="pi pi-arrow-right-arrow-left" rounded outlined aria-label="Transfer" />
        </div>
    </div>
</template>