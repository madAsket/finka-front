<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import Toolbar from "primevue/toolbar"
import {useProjectStore} from "@/stores/project"
import BalanceService from "@/services/BalanceService"
import AddStorageModalView from "@/views/balance/AddStorageModalView.vue"

const storages = ref([])
const projectStore = useProjectStore()

const isAddStorageModalShown = ref(false);
function showAddStorageModal(){
    isAddStorageModalShown.value = true;
}

const addStorage = (newStorage) => {
    console.log(newStorage);
    isAddStorageModalShown.value = false;
    storages.value.push(newStorage);
};

const formatCurrency = (value, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(value);
}

onMounted(async () => {
    storages.value = await BalanceService.getAllStorages(projectStore.currentProject.Project.id);
});

</script>
<template>

<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Financial storage</h1>
        <p class="text-xs"><b>Project:</b> {{projectStore.currentProject.Project.name}}</p>
    </div>
    <div>
        <Button @click="showAddStorageModal"  class="mr-2 mb-5" icon="pi pi-plus" label="Add storage"  size="small" />
        <AddStorageModalView v-model:visible="isAddStorageModalShown" @add-storage="addStorage"/>
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
        <DataTable v-if="storages.length" :value="storages" stripedRows  class="text-xs" tableStyle="max-width: 50rem">
            <Column field="name" header="Storage" class="max-w-40"></Column>
            <Column field="currency" header="Currency" class="max-w-40"></Column>
            <Column field="balance" header="Balance (EUR)" >
                <template #body="{ data }">
                    <b> TODO: {{data.balance}} EUR</b>
                    <!-- {{ formatCurrency(data.balance, data.currency) }} -->
                </template>
            </Column>            
            <Column field="origin_balance" header="Origin balance" class="max-w-40">
                <template #body="{ data }">
                    <b v-if="data.currency !== projectStore.currentProject.Project.currency">{{ formatCurrency(data.balance, data.currency) }}</b>
                </template>
            </Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button class="w-7 h-7 text-slate-500" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
                        <Button class="w-7 h-7 text-green-600" size="small" icon="pi pi-plus" rounded outlined aria-label="Top up" />
                        <Button class="w-7 h-7 text-slate-400" size="small" icon="pi pi-arrow-right-arrow-left" rounded outlined aria-label="Transfer" />
                        <Button class="w-7 h-7 text-red-300" size="small" icon="pi pi-trash" rounded outlined aria-label="Delete" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped></style>