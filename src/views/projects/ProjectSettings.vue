<script setup>
import { ref, onMounted } from 'vue';
import BasePageMenu from '@/components/BasePageMenu.vue';


const tabItems = ref([
    {
        label: 'Projects',
        icon: 'pi pi-database',
        routeName: 'projects'
    },
    {
        label: "Project's users",
        icon: 'pi pi-credit-card',
        routeName: 'projectUsers'
    },
])

</script>

<template>
    <div>
        <BasePageMenu :tabItems="tabItems" />
        <RouterView class="sm:px-4 px-2"></RouterView>
    </div>
</template>
