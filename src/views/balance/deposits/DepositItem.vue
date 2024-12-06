<script setup>
import Chip from "primevue/chip"
import Button from "primevue/button"
import { useBalanceStore } from "@/stores/balance";
import { ref } from "vue";
import { useProjectStore } from "@/stores/project";
import EditDepositModalView from "@/views/balance/deposits/EditDepositForm.vue";
import { useDialogManager } from "@/composables/dialog";
import BaseAvatar from "@/components/BaseAvatar.vue";
import { useToastManger } from '@/composables/toaster';
import { useConfirmManger } from "@/composables/confirmAction";

const confirmManager = useConfirmManger();
const toastManager = useToastManger();
const emit = defineEmits(['deleteDeposit', 'afterDepositUpdate']);
const balanceStore = useBalanceStore();
const projectStore = useProjectStore();
const props = defineProps({
    deposit:Object
});
const dialogManager = useDialogManager();
const deposit = ref(props.deposit);


const deleteDeposit = confirmManager.confirmDelete(async () => {
    const result = await balanceStore.deleteDeposit(deposit.value.projectId, deposit.value.id);
    if(result.status === "success"){
        emit('deleteDeposit', deposit.value.id);
        toastManager.show("Deposit deleted!");
    }
});

const openEditForm = ()=>{
    dialogManager.openDialog(EditDepositModalView, {
        props:{
            header: 'Edit deposit',
        },
        data: {
            model:deposit
        },
        emits:{
            onSave: () => {
                emit('afterDepositUpdate')
            }
        }
    });
}

</script>
<template>
    <div class="flex items-center justify-start py-2">
        <div class="mr-2">
            <BaseAvatar :avatar="deposit.User.avatar" :firstName="deposit.User.firstName"/>
        </div>
        <div class="flex flex-col w-32 mr-1 items-start justify-start">
            <h3 class="text-sm mb-0.5">
                <span class="mr-2 text-xs font-bold"> {{ $formatDate(deposit.depositedAt) }}</span>
            </h3>
            <p class="text-xs text-slate-500 overflow-hidden">
                <span class="font-light">{{ deposit.Storage.name }}</span>
            </p>
        </div>
        <div class="flex items-start flex-col ml-auto w-32">
            <p class="font-semibold text-sm text-green-800">
                {{$convertCurrency(deposit.amount, deposit.Storage.currency, projectStore.currentProject.Project.currency)}}
            </p>
            <p  class="font-semibold text-xs text-gray-800" v-if="projectStore.currentProject.Project.currency !== deposit.Storage.currency">
                {{ $formatCurrency(deposit.amount, deposit.Storage.currency) }}
            </p>
        </div>
        <div class="flex items-start ml-auto gap-2">
            <Button @click="openEditForm" class="w-7 h-7 text-slate-400" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
            <Button @click="deleteDeposit" class="w-7 h-7 text-red-300" size="small" icon="pi pi-trash" rounded outlined aria-label="Delete" />
        </div>
    </div>
</template>