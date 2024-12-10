<script setup>
import { computed } from 'vue';
import { object } from 'yup';

    const props = defineProps({
        avatar:null,
        firstName:"",
        size:{
            default:{
                width:40,
                height:40
            },
            type:Object
        }
    });
    const avatarPath = computed(()=>{
        return `${import.meta.env.VITE_URL}${props.avatar}`;
    })
</script>
<template>
    <img v-if="avatar" :src="avatarPath" 
    :style="`width:${size.width}px; height:${size.height}px`"
    class="border p-0.5 rounded-full border-indigo-500">
    <p v-else  class="flex items-center justify-center border rounded-full border-indigo-500 bg-indigo-800" 
    :style="`width:${size.width}px; height:${size.height}px;font-size:${120+size.width}%`">
        <span class=" text-white font-bold">{{ firstName[0] }}</span>
    </p>
</template>