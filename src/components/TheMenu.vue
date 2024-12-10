<script setup>
import Menu from 'primevue/menu';
import { ref } from 'vue'
import BaseAvatar from './BaseAvatar.vue';
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
const items = ref([
    {
        separator: true
    },
    {
        label: 'Expenses',
        icon: 'pi pi-objects-column',
        route:"/"
    },
    {
        label: 'Assets',
        icon: 'pi pi-bitcoin',
        route:"/balance"
    },
    // {
    //     label: 'Statistic',
    //     icon: 'pi pi-chart-pie',
    //     route:"/statistic"
    // },
    {
        label: 'Projects',
        icon: 'pi pi-cog',
        route:"/projects"
    },
])
</script>

<template>
    <div class="min-w-24 max-w-24 h-screen overscroll-y-auto relative menu-container">
        <div class="fixed p-4 min-w-24 max-w-24 h-full menu-fix-wrapper">
            <Menu
            :model="items" 
            class="mbg-gray-300 h-full w-16 min-w-0 overflow-hidden rounded-lg relative menu-block">
                <template #start>
                    <RouterLink to="/" exactActiveClass="logo-link-exact-active" activeClass="logo-link-active">
                        <span class="inline-flex items-center px-1 pt-2">
                            <img src="@/assets/logo-text.png" class="pt-1">
                        </span>
                    </RouterLink>
                </template>
                <template #item="{ item, props }">
                    <RouterLink  :to="item.route" class="p-menu-item-link">
                            <span :class="item.icon"></span>
                            <p class="md:hidden text-xs text-gray-500">{{item.label}}</p>
                    </RouterLink>
                </template>
                <template #end>
                    <RouterLink 
                    exactActiveClass="p-profile-exact-active" 
                    activeClass="p-profile-active"
                    to="/profile"  
                    class="relative overflow-hidden w-full bg-transparent flex items-start md:ml-3 ml-2 mb-2 rounded cursor-pointer transition-colors duration-200">
                        <BaseAvatar class="hover:bg-slate-300" :avatar="auth.user.avatar" :firstName="auth.user.firstName"></BaseAvatar>
                    </RouterLink>
                </template>
            </Menu>
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
    }
  
</style> 