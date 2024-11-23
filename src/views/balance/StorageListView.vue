<script setup>
import { ref, onMounted } from 'vue';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Button from "primevue/button"
import {useProjectStore} from "@/stores/project"
import AddStorageModalView from "@/views/balance/AddStorageModalView.vue"
import { useBalanceStore } from '@/stores/balance';
import StorageItemView from './StorageItemView.vue';

const storages = ref([])
const projectStore = useProjectStore()
const balanceStore = useBalanceStore()

const isAddStorageModalShown = ref(false);

const addStorage = (newStorage) => {
    storages.value.push(newStorage);
};

onMounted(async () => {
    storages.value = await balanceStore.getAllStorages(projectStore.currentProject.Project.id);
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


</script>
<template>

<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Financial storage</h1>
        <p class="text-xs"><b>Project:</b> {{projectStore.currentProject.Project.name}}</p>
    </div>
    <div>
        <Button @click="isAddStorageModalShown = true"  class="mr-2 mb-5" icon="pi pi-plus" label="Add storage"  size="small" />
        <AddStorageModalView v-model:visible="isAddStorageModalShown" @add-storage="addStorage"/>
        <!-- <AddStorageModalView v-model:visible="isAddStorageModalShown"/> -->
        <!-- <Toolbar class="inline-flex justify-content-start p-1 max-w-xl" :pt="{
            center:{class:'hidden'},
            end:{class:'hidden'}}">
            <template #start>
             
            </template>
        </Toolbar> -->
    </div>
    <div>
        <!-- TODO: Currencies exchange information -->
    </div>
    <div>
        <div class="divide-indigo-100 divide-y flex flex-col content-start min-w-fit max-w-lg">
            <StorageItemView v-for="item in storages" :key="item.id"
            :storage="item"  @makeTransfer="makeTransfer" @makeDeposit="makeDeposit" />
        </div>
    </div>
</div>
</template>
<style scoped></style>