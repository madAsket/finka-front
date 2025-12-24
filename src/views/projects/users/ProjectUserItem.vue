<script setup>
import BaseAvatar from "@/components/BaseAvatar.vue";
import Tag from "primevue/tag"
import {useProjectStore} from "@/stores/project"

const projectStore = useProjectStore();

defineProps({
    user:Object
})
</script>
<template>
    <div class="flex items-center justify-start py-2">
        <div class="mr-2">
            <BaseAvatar :avatar="user.avatar" :firstName="user.firstName"/>
        </div>
        <div class="flex flex-col w-64 mr-1 items-start justify-start">
            <h3 class="text-sm mb-1">
                <span class="mr-2 text-xs font-bold">{{ user.firstName }} {{ user.lastName }}</span><span class="font-light text-xs">{{ user.email }}</span>
            </h3>
            <Tag v-if="projectStore.isOwner(user.id)" 
            class="text-xs font-medium" 
            severity="danger" 
            rounded  
            value="Owner"/>
            <Tag v-else 
            class="text-xs font-medium" 
            severity="info" 
            rounded  
            value="User"/>
      
        </div>
    </div>
</template>