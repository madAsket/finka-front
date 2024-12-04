<script setup>
import Menu from 'primevue/menu';
import { ref } from 'vue'
import Button from "primevue/button"
import Avatar from "primevue/avatar"
import BaseAvatar from './BaseAvatar.vue';
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
const items = ref([
    {
        separator: true
    },
    {
        label: 'Home',
        icon: 'pi pi-objects-column',
        route:"/"
    },
    {
        label: 'Balance',
        icon: 'pi pi-bitcoin',
        route:"/balance"
    },
    // {
    //     label: 'Statistic',
    //     icon: 'pi pi-chart-pie',
    //     route:"/statistic"
    // },
    {
        label: 'Settings',
        icon: 'pi pi-cog',
        route:"/projects"
    },
])
</script>

<template>
    <div class="justify-start grid">
        <div class="min-w-24 max-w-24 h-screen overscroll-y-auto relative">
            <div class="fixed p-4 min-w-24 max-w-24 h-full">
                <Menu :model="items" class="mbg-gray-300 h-full w-16 min-w-0 overflow-hidden rounded-lg relative">
                    <template #start>
                        <span class="inline-flex items-center px-1 pt-2">
                            <img src="@/assets/logo-text.png" class="pt-1">
                        </span>
                    </template>
                    <template #item="{ item, props }">
                        <RouterLink  :to="item.route" class="p-menu-item-link">
                                <span :class="item.icon" />
                        </RouterLink>
                    </template>
                    <template #end>
                        <RouterLink exactActiveClass="p-profile-exact-active" activeClass="p-profile-active"
                         to="/profile"  class="relative overflow-hidden w-full  bg-transparent flex items-start ml-3 mb-2 rounded cursor-pointer transition-colors duration-200">
                            <BaseAvatar class="hover:bg-slate-300" :avatar="auth.user.avatar" :firstName="auth.user.firstName"></BaseAvatar>
                        </RouterLink>
                    </template>
                </Menu>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .p-menu-item-link{
        height:40px;
        width:40px;
    }
    .router-link-active{
        background-color: #f1f5f9;
        border-radius:100%;
        /* height:100%; */
    }
</style> 