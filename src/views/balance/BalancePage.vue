<script setup>
import { ref, onMounted } from 'vue';

import BasePageMenu from '@/components/BasePageMenu.vue';

const tabItems = ref([
    {
        label: 'Financial storage',
        icon: 'pi pi-database',
        routeName: 'balance'
    },
    {
        label: 'Deposits',
        icon: 'pi pi-credit-card',
        routeName: 'deposits'
    },
    {
        label: 'Transfers',
        icon: 'pi pi-arrow-right-arrow-left',
        routeName: 'transfers'
    },
])

</script>

<template>
    <div>
        <BasePageMenu :tabItems="tabItems" />
        <RouterView class="sm:px-4 px-2"></RouterView>
    </div>
</template>
