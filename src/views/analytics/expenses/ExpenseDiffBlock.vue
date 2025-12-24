<script setup>
    defineProps({
        diff:{
            default:null
        }
    })
</script>
<template>
    <span v-if="diff !== null">
        <span v-if="diff < 0">
            <span class="text-green-500 font-medium text-sm">
                <i class="pi pi-arrow-down-right text-xs"></i>
                {{diff}}% 
            </span>
        </span>
        <span v-if="diff > 0">
            <span class="text-red-500 font-medium text-sm">
                <i class="pi pi-arrow-up-right text-xs"></i>
                {{diff}}% 
            </span>
        </span>
        <span v-if="diff === 0">
            <span class="text-green-500 font-medium text-sm">
                {{diff}}% 
            </span>
        </span>
        <span class="text-surface-500 text-sm ">from last month</span>
    </span>
    <span v-else>
        <span class="text-surface-500 text-sm ">No data available to compare</span>
    </span>
</template>