<script setup>
import { ref, onMounted } from 'vue';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import InviteUserModalView from './InviteUserModalView.vue';
import {useProjectStore} from "@/stores/project"

const projectStore = useProjectStore();

const users = ref([]);
onMounted(async () => {
    users.value = await projectStore.getProjectUsers(projectStore.currentProject.projectId);
});

const isInviteModalShown = ref(false);
function showInviteModal(){
    isInviteModalShown.value = true;
}

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Users list</h1>
        <p class="text-xs"><b>Project:</b> {{ projectStore.currentProject.Project.name }}.</p>
    </div>
    <div>
        <Button @click="showInviteModal" class="mr-2 mb-5" icon="pi pi-plus" label="Invite user"  size="small" />
    </div>
    <InviteUserModalView v-model:visible="isInviteModalShown"/>
    <div>
        <DataTable :value="users" stripedRows  class="text-xs" tableStyle="max-width: 40rem">
            <Column field="firstName" header="Username">
                <template #body="{ data }">
                    <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="data.firstName" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                </template>
            </Column>
            <Column field="is_owner" header="Project owner" class="max-w-40 font-bold">
                <template #body="{ data }">
                    <span v-if="projectStore.isOwner(data.id)">Yes</span>
                    <span v-else>No</span>
                </template>
            </Column>
            <Column field="email" header="Email" class="max-w-40 font-bold"></Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button v-if="!projectStore.isOwner(data.id)" class="w-7 h-7 text-red-300" size="small" icon="pi pi-trash" rounded outlined aria-label="Delete" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped>
</style>