<script setup>
import Button from "primevue/button"
import {useProjectStore} from "@/stores/project"

const emit = defineEmits(['switchProject'])

const projectStore = useProjectStore();
const props = defineProps({
    project:Object
})

const switchCurrentProject = async ()=>{
    await projectStore.switchCurrentProject(props.project.Project.id);
    props.project.isCurrent = true;
    emit('switchProject', props.project);
};

</script>
<template>
    <div class="flex items-center justify-start py-2">
        <div class="mr-2">
            <img src="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" width="40" height="40" 
            class="border p-0.5 rounded-full border-indigo-800">
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
            <Button class="w-7 h-7 text-slate-400" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
        </div>
    </div>
</template>