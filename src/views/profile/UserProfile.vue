<script setup>
import Button from "primevue/button"
import { useAuthStore } from '@/stores/auth';
import router from "@/router/index"
import Tabs from "primevue/tabs"
import Tab from "primevue/tab"
import TabList from "primevue/tablist"
import { ref } from 'vue';


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
<div class="container">
    <div class="mb-5 text-xs flex justify-start">
        <Tabs value="/">
            <TabList>
                <Tab v-for="tab in tabItems" :key="tab.label" :value="tab.routeName"  
                :to="{name:tab.routeName}" as="router-link"
                exactActiveClass="p-tab-active">
                    <div class="flex items-center gap-2 text-inherit">
                        <i :class="tab.icon" />
                        <span>{{ tab.label }}</span>
                    </div>
                </Tab>
            </TabList>
        </Tabs>
    </div>
    <RouterView></RouterView>
    <div class="pt-12 max-w-64">

    </div>
    <!-- <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">User profile</h1>
    </div>
    <Button @click="logout" class="mr-2 mb-5" label="Logout"  size="small" /> -->
</div>
</template>
<style scoped></style>