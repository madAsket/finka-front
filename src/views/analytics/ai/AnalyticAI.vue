<script setup>
import BaseListHeader from '@/components/BaseListHeader.vue';
import Button from "primevue/button"
</script>
<template>
<div>
    <BaseListHeader>
        <template #button>
            <Button class="mr-2" icon="pi pi-comment" label="Start chat"  size="small" disabled />
        </template>
    </BaseListHeader>
    <div class="bg-surface-0  px-6 py-20 md:px-12 lg:px-20">
        <div class="text-surface-700 text-center">
            <div class="text-primary font-bold mb-4"><i class="pi pi-microchip-ai" />&nbsp;FINKA AI</div>
            <div class="text-surface-900  font-bold text-5xl mb-4">AI tools are coming!</div>
            <div class="text-surface-700  text-xl mb-8">
                Will be available in II/2025.
            </div>
        </div>
    </div>
</div>
</template>