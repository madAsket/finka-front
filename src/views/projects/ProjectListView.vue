<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import {useProjectStore} from "@/stores/project"
import {useAuthStore} from "@/stores/auth"

const router = useRouter();
const projectStore = useProjectStore();
const projects = ref([])
onMounted(async () => {
    projects.value = await projectStore.getUserProjects();
});

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Projects list</h1>
    </div>
    <div>
        <DataTable :value="projects" stripedRows  class="text-xs" tableStyle="max-width: 60rem">
            <Column field="Project.name" header="Name" class="max-w-40 font-bold"></Column>
            <Column field="Project.currency" header="Main currency" class="max-w-40 font-bold"></Column>
            <Column header="Owner">
                <template #body="{ data }">
                    <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="data.Project.ownerUser.firstName" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                </template>
            </Column>
            <Column header="Status">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button v-if="!data.isCurrent" label="Set as current" size="small" severity="success" outlined rounded />
                        <Chip v-else label="Current project" :pt="{'chip':{background:'#000000'}}" 
                        class="border font-medium bg-transparent text-red-500 border-solid border-red-500" />
                    </div>
                </template>
            </Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button class="w-7 h-7 text-slate-500" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped>
</style>