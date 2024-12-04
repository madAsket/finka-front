<script setup>
import Button from "primevue/button"
import {useProjectStore} from "@/stores/project"
import { ref} from 'vue';
import EditProjectModalView from "./EditProjectModalView.vue";
import { useDialogManager } from "@/composables/dialog";
import BaseAvatar from "@/components/BaseAvatar.vue";

const emit = defineEmits(['switchProject'])

const dialogManager = useDialogManager();

const projectStore = useProjectStore();
const props = defineProps({
    project:Object
})

const project = ref(props.project);
const switchCurrentProject = async ()=>{
    await projectStore.switchCurrentProject(project.value.Project.id);
    project.value.isCurrent = true;
    emit('switchProject', project.value.Project.id);
};

function showEditModal(){
    dialogManager.openDialog(EditProjectModalView, {
        props:{
            header: 'Edit project',
        },
        data:{
            project:project
        }
    });
}

</script>
<template>
    <div class="flex items-center justify-start py-2">
        <div class="mr-2">
            <BaseAvatar :avatar="project.Project.ownerUser.avatar" :firstName="project.Project.ownerUser.firstName"/>
        </div>
        <div class="flex flex-col w-64 mr-1 items-start justify-start">
            <h3 class="text-sm  mb-1">
                <span class="mr-2 text-xs font-bold"><i class="pi pi-circle-fill text-xs mr-1 text-red-500" :class="{'!text-green-500':project.isCurrent}"></i> {{ project.Project.name }}</span>
            </h3>
            <p class="text-xs text-slate-500 overflow-hidden">
                <span class="font-light ml-1">{{ project.Project.currency }}</span>
            </p>
        </div>
        <div class="flex items-start ml-auto gap-2">
            <Button @click="switchCurrentProject" v-if="!project.isCurrent" class="w-7 h-7 text-green-500" size="small" icon="pi pi-power-off" rounded outlined aria-label="Set as current" />
            <Button @click="showEditModal" class="w-7 h-7 text-slate-400" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
        </div>
    </div>
</template>