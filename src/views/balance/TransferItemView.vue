<script setup>
import Chip from "primevue/chip"
import Button from "primevue/button"
import { useBalanceStore } from "@/stores/balance";
import { ref } from "vue";
import { useProjectStore } from "@/stores/project";
import { useDialogManager } from "@/composables/dialog";
import EditTransferModalView from "./EditTransferModalView.vue";

const emit = defineEmits(['deleteTransfer']);
const balanceStore = useBalanceStore();
const projectStore = useProjectStore();
const props = defineProps({
    transfer:Object
});

const dialogManager = useDialogManager();
const transfer = ref(props.transfer);

const formatDate = (dateString) =>{
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU',{year: 'numeric', month: 'numeric', day: 'numeric',}).format(date);
}

const deleteTransfer = async () => {
    const result = await balanceStore.deleteTransfer(transfer.projectId, transfer.id);
    if(result.status === "success"){
        emit('deleteTransfer', transfer.value.id)
    }
};

const openEditForm = ()=>{
    dialogManager.openDialog(EditTransferModalView, {
        props:{
            header: 'Edit transfer',
        },
        data: {
            model:transfer
        }
    });
}

</script>
<template>
    <div class="flex items-center justify-start py-2">
        <div class="mr-2">
            <img src="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" width="40" height="40" 
            class="border p-0.5 rounded-full border-indigo-800">
        </div>
        <div class="flex flex-col w-48 mr-1 items-start justify-start">
            <h3 class="text-sm">
                <span class="mr-2 text-xs font-bold"> {{ formatDate(transfer.transferredAt) }}</span>
            </h3>
            <p class="text-xs text-slate-500 overflow-hidden">
                <span class="font-light">{{ transfer.fromStorage.name }} <i class="pi pi-arrow-right text-xxs text-green-900" ></i> {{ transfer.toStorage.name }}</span>
            </p>
        </div>
        <div class="flex items-center flex-col ml-auto w-32">
            <p class="font-semibold text-xs text-red-800">
                {{ $formatCurrency(transfer.transferredAmount, transfer.fromStorage.currency) }}
            </p>
            <i class="pi pi-caret-down text-xxs text-green-900 block" ></i> 
            <p  class="font-semibold text-xs text-green-800">
                {{ $formatCurrency(transfer.receivedAmount, transfer.toStorage.currency) }}
            </p>
        </div>
        <div class="flex items-start ml-auto gap-2">
            <Button @click="openEditForm" class="w-7 h-7 text-slate-400" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
            <Button @click="deleteTransfer" class="w-7 h-7 text-red-300" size="small" icon="pi pi-trash" rounded outlined aria-label="Delete" />
        </div>
    </div>
</template>