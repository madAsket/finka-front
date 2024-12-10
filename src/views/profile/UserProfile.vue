<script setup>
import { ref } from 'vue';
import BasePageMenu from "@/components/BasePageMenu.vue";


const tabItems = ref([
    {
        label: 'Profile',
        icon: 'pi pi-user',
        routeName: 'profile'
    },
    {
        label: 'Security',
        icon: 'pi pi-lock',
        routeName: 'security'
    },
])

</script>
<template>
<div>
    <BasePageMenu :tabItems="tabItems" :noHeader="true" />
    <RouterView class="sm:px-4 px-2"></RouterView>
</div>
</template>
<style scoped></style>