<script setup>
import BasePageMenu from '@/components/BasePageMenu.vue';
import { ref, onMounted } from 'vue';

const tabItems = ref([
    {
        label: 'Expenses analytics',
        icon: 'pi pi-lightbulb',
        routeName: 'analyticexpenses'
    },
    {
        label: 'AI analytics',
        icon: 'pi pi-microchip-ai',
        routeName: 'analyticai'
    }
])
</script>

<template>
    <div>
        <BasePageMenu :tabItems="tabItems" />
        <RouterView class="sm:px-4 px-2"></RouterView>
    </div>
</template>
