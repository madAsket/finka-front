<script setup>
import { onMounted , ref } from 'vue';

const mounted = ref(false);
onMounted(() => {
    mounted.value = true;
});
</script>
<template>
    <Teleport to="#sectionHeader" v-if="mounted">
        <div class="flex w-full items-center">
            <div class="mb-0">
                <h1 class="text-surface-700 font-bold lg:text-2xl text-xl"><slot name="title"></slot></h1>
                <p class="text-xs"><slot name="subtitle"></slot></p>
            </div>
            <div class="ml-auto">
                <slot name="button"></slot>
            </div>
        </div>  
    </Teleport>
</template>