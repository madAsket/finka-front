<script setup>
import { ref, onMounted } from 'vue';
import Button from "primevue/button"
import {useProjectStore} from "@/stores/project"
import AddStorageModalView from "@/views/balance/storages/AddStorageForm.vue"
import { useBalanceStore } from '@/stores/balance';
import StorageItemView from './StorageItem.vue';
import BaseEmptyList from '@/components/BaseEmptyList.vue';
import BaseListSkeleton from '@/components/BaseListSkeleton.vue';
import BaseListHeader from '@/components/BaseListHeader.vue';

const storages = ref([])
const projectStore = useProjectStore()
const balanceStore = useBalanceStore()

const isAddStorageModalShown = ref(false);
const resLoaded = ref(false);

const addStorage = (newStorage) => {
    storages.value.push(newStorage);
};

onMounted(async () => {
    storages.value = await balanceStore.getAllStorages(projectStore.currentProject.Project.id);
    resLoaded.value = true;
});

const makeTransfer = (transfer)=>{
    storages.value.forEach((item)=>{
        if(item.id === transfer.fromStorageId){
            item.balance = Number(item.balance) - Number(transfer.transferredAmount);
        }
        if(item.id === transfer.toStorageId){
            item.balance = Number(item.balance) + Number(transfer.receivedAmount);
        }
    });
};

const makeDeposit = (deposit)=>{
    storages.value.forEach((item)=>{
        if(item.id === deposit.storageId){
            item.balance = Number(item.balance) + Number(deposit.amount);
            return;
        }
    });
};

function showAddStorageCategoryModal(){
    isAddStorageModalShown.value = true;
}

</script>
<template>

<div>
    <BaseListHeader>
        <template #title>
            Financial storage
        </template>
        <template #subtitle>
            <b>Project:</b> {{projectStore.currentProject.Project.name}}
        </template>
        <template #button>
            <Button v-if="!resLoaded || (resLoaded && storages.length)" 
            @click="showAddStorageCategoryModal"  
            class="mr-2" icon="pi pi-plus" label="Add storage"  size="small" />
        </template>
    </BaseListHeader>
    <AddStorageModalView v-model:visible="isAddStorageModalShown" @add-storage="addStorage"/>
    <div>
        <div class="divide-indigo-100 divide-y flex flex-col content-start">
            <!-- <BaseListSkeleton v-if="!resLoaded"></BaseListSkeleton> -->
            <BaseEmptyList v-if="resLoaded && !storages.length"
            buttonLabel="Add storage"
            :buttonAction="showAddStorageCategoryModal">
                <template #title>You don't have any storages yet</template>
                <template #subtitle></template>
                <template #content>You can add one here. Lets do it now!</template>
            </BaseEmptyList>
            <StorageItemView v-for="item in storages" :key="item.id"
            :storage="item"  @makeTransfer="makeTransfer" @makeDeposit="makeDeposit" />
        </div>
    </div>
</div>
</template>
<style scoped></style>