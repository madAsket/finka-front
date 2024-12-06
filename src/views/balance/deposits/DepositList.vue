<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import AddDepositModalView from '@/views/balance/deposits/AddDepositForm.vue';
import {useProjectStore} from "@/stores/project"
import { useBalanceStore } from '@/stores/balance';
import { useDialogManager } from '@/composables/dialog';
import DepositItemView from '@/views/balance/deposits/DepositItem.vue';
import BaseListSkeleton from '@/components/BaseListSkeleton.vue';
import BaseEmptyList from '@/components/BaseEmptyList.vue';

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();
const dialogManager = useDialogManager();

const deposits = ref([]);
const resLoaded = ref(false);


onMounted(async () => {
    deposits.value = await balanceStore.getAllDeposits(projectStore.currentProject.Project.id);
    resLoaded.value = true;
});

const sortDeposits = ()=>{
    deposits.value.sort((a,b)=>{
        return new Date(b.depositedAt) - new Date(a.depositedAt);
    })
}

const addDeposit = (newDeposit) => {
    deposits.value.push(newDeposit);
    sortDeposits();
};

const deleteDeposit = (depositId) =>{
    deposits.value = deposits.value.filter((item)=>{
        return item.id !== depositId;
    });
}

const afterDepositUpdate = ()=>{
    sortDeposits();
}


function showDepositModal(){
    dialogManager.openDialog(AddDepositModalView, {
        props:{
            header: 'Top up',
        },
        emits:{
            onSave: (deposit) => {
                addDeposit(deposit);
            }
        }
    });
}

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Deposits</h1>
        <p class="text-xs"><b>Project:</b> {{projectStore.currentProject.Project.name}}</p>
    </div>
    <div>
        <Button v-if="!resLoaded || (resLoaded && deposits.length)" @click="showDepositModal" class="mr-2 mb-5" icon="pi pi-credit-card" label="Top up"  size="small" />
    </div>
    <div>
        <div class="divide-indigo-100 divide-y flex flex-col content-start min-w-fit max-w-xl">
        <!-- <BaseListSkeleton v-if="!resLoaded"></BaseListSkeleton> -->
        <BaseEmptyList v-if="resLoaded && !deposits.length" 
        class="max-w-2xl" 
        buttonLabel="Add deposit"
        :buttonAction="showDepositModal">
            <template #title>You don't have any deposits yet</template>
            <template #subtitle></template>
            <template #content>You can add one here. Lets do it now!</template>
        </BaseEmptyList>
         <DepositItemView v-for="item in deposits" :key="item.id"
            :deposit="item" @deleteDeposit="deleteDeposit" @afterDepositUpdate="afterDepositUpdate"/>
        </div>
    </div>
</div>
</template>
<style scoped>
</style>