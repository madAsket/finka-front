<script setup>
import BasePageMenu from '@/components/BasePageMenu.vue';
import { ref, onMounted } from 'vue';

const tabItems = ref([
    {
        label: 'Expenses',
        icon: 'pi pi-wallet',
        routeName: 'expenses'
    },
    {
        label: 'Limits',
        icon: 'pi pi-bolt',
        routeName: 'limits'
    },
])
</script>

<template>
    <div>
        <BasePageMenu :tabItems="tabItems" />
        <RouterView class="sm:px-4 px-2"></RouterView>
    </div>
</template>
