<script setup>
import { ref, onMounted } from 'vue';
import Button from "primevue/button"
import InviteUserModalView from './InviteUserForm.vue';
import {useProjectStore} from "@/stores/project"
import ProjectUserItem from "@/views/projects/users/ProjectUserItem.vue"
import BaseListHeader from '@/components/BaseListHeader.vue';

const projectStore = useProjectStore();

const users = ref([]);
onMounted(async () => {
    users.value = await projectStore.getProjectUsers(projectStore.currentProject.projectId);
});

const isInviteModalShown = ref(false);
function showInviteModal(){
    isInviteModalShown.value = true;
}

const addUser = (newUser) => {
    isInviteModalShown.value = false;
    users.value.push(newUser);
};


</script>
<template>
<div>
    <BaseListHeader>
        <template #title>
            Users list
        </template>
        <template #subtitle>
            <b>Project:</b> {{projectStore.currentProject.Project.name}}
        </template>
        <template #button>
            <Button @click="showInviteModal" class="mr-2" icon="pi pi-plus" label="Invite user"  size="small" />
        </template>
    </BaseListHeader>
    <InviteUserModalView v-model:visible="isInviteModalShown" @add-user="addUser"/>
    <div class="divide-indigo-100 divide-y flex flex-col content-start">
        <ProjectUserItem :user="item" v-for="item in users" :key="item.id" />
    </div>
</div>
</template>