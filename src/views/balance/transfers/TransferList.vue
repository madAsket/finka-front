<script setup>
import { ref, onMounted } from 'vue';
import Button from "primevue/button"
import TransferModalView from '@/views/balance/transfers/AddTransferForm.vue';
import {useProjectStore} from "@/stores/project"
import { useBalanceStore } from '@/stores/balance';
import { useDialogManager } from '@/composables/dialog';
import TransferItemView from '@/views/balance/transfers/TransferItem.vue';
import BaseEmptyList from '@/components/BaseEmptyList.vue';
import BaseListHeader from '@/components/BaseListHeader.vue';

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();
const dialogManager = useDialogManager();
const transfers = ref([])
const resLoaded = ref(false);

onMounted(async () => {
    transfers.value = await balanceStore.getAllTransfers(projectStore.currentProject.Project.id);
    resLoaded.value = true;
});

function showTransferModal(){
    dialogManager.openDialog(TransferModalView, {
        props:{
            header: 'Make transfer',
        },
        emits:{
            onSave: (transfer) => {
                addTransfer(transfer);
            }
        }
    });
}

const addTransfer = (transfer) => {
    transfers.value.push(transfer);
};

const deleteTransfer = async (transferId) => {
    transfers.value = transfers.value.filter((item)=>{
        return item.id !== transferId;
    });
};

</script>
<template>
<div>
    <BaseListHeader>
        <template #title>
            Transfers
        </template>
        <template #subtitle>
            <b>Project:</b> {{projectStore.currentProject.Project.name}}
        </template>
        <template #button>
            <Button v-if="!resLoaded || (resLoaded && transfers.length)" 
            @click="showTransferModal" class="mr-2" icon="pi pi-arrow-right-arrow-left" label="Make transfer"  size="small" />
        </template>
    </BaseListHeader>
    <div class="divide-indigo-100 divide-y flex flex-col content-start">
        <!-- <BaseListSkeleton v-if="!resLoaded"></BaseListSkeleton> -->
        <BaseEmptyList v-if="resLoaded && !transfers.length" 
        buttonLabel="Add transfer"
        :buttonAction="showTransferModal">
            <template #title>You don't have any transfers yet</template>
            <template #subtitle></template>
            <template #content>You can add one here. Lets do it now!</template>
        </BaseEmptyList>
         <TransferItemView v-for="item in transfers" :key="item.id"
            :transfer="item" @deleteTransfer="deleteTransfer"/>
    </div>
</div>
</template>
<style scoped>
</style>