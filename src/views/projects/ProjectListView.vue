<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"
import {useProjectStore} from "@/stores/project"
import {useAuthStore} from "@/stores/auth"
import AddProjectModalView from './AddProjectModalView.vue';
import ProjectItemView from './ProjectItemView.vue';

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


const onSwitchProject = (project) => {
    projects.value.forEach((item)=>{
        if(item.Project.id !== project.Project.id)
            item.isCurrent = false;
    });
};

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Projects list</h1>
    </div>
    <div>
        <Button  class="mr-2 mb-5" @click="showAddProjectyModal" icon="pi pi-plus" label="Add project"  size="small" />
    </div>
    <AddProjectModalView v-model:visible="isAddProjectModalShown" @add-project="addProject" />

    <div class="divide-indigo-100 divide-y flex flex-col content-start min-w-fit max-w-96">
        <ProjectItemView @switchProject="onSwitchProject" :project="item" v-for="item in projects" :key="item.Project.id" />
    </div>
</div>
</template>
<style scoped>
</style>