<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import Button from "primevue/button"
import {useProjectStore} from "@/stores/project"
import {useAuthStore} from "@/stores/auth"
import AddProjectModalView from '@/views/projects/AddProjectForm.vue';
import ProjectItemView from '@/views/projects/ProjectItem.vue';
import BaseListHeader from '@/components/BaseListHeader.vue';

const projectStore = useProjectStore();
const authStore = useAuthStore();
const projects = ref([])
onMounted(async () => {
    projects.value = await projectStore.getUserProjects();
});

const isAddProjectModalShown = ref(false);
function showAddProjectyModal(){
    isAddProjectModalShown.value = true;
}

const addProject = (newProject) => {
    isAddProjectModalShown.value = false;
    if(newProject.isCurrent){
        projects.value.forEach((item)=>{
            item.isCurrent = false;
        })
    };
    newProject.Project.ownerUser = authStore.user; //FIXME maybe cause problem?
    projects.value.push(newProject);
};


const onSwitchProject = (projectId) => {
    projects.value.forEach((item)=>{
        if(item.Project.id !== projectId)
            item.isCurrent = false;
    });
};

</script>
<template>
<div>
    <BaseListHeader>
        <template #title>
            Projects list
        </template>
        <template #button>
            <Button  class="mr-2" @click="showAddProjectyModal" icon="pi pi-plus" label="Add project"  size="small" />
        </template>
    </BaseListHeader>
    <AddProjectModalView v-model:visible="isAddProjectModalShown" @add-project="addProject" />

    <div class="divide-indigo-100 divide-y flex flex-col content-start">
        <ProjectItemView @switchProject="onSwitchProject" :project="item" v-for="item in projects" :key="item.Project.id" />
    </div>
</div>
</template>
<style scoped>
</style>