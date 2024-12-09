<script setup>
import Tabs from "primevue/tabs"
import Tab from "primevue/tab"
import TabList from "primevue/tablist"
import TheBalanceInfo from "./TheBalanceInfo.vue";
import { useAuthStore } from "@/stores/auth";
defineProps({
    tabItems:[],
    noHeader:{
        default:false,
        type:Boolean
    }
});
const auth = useAuthStore();
</script>

<template>
    <TheBalanceInfo v-if="auth.user"/>
    <div class="page-menu">
        <div class="page-menu-content-wrapper shadow-sm shadow-indigo-400/40"
                :class="{'!shadow-none':noHeader}">
            <div v-if="!noHeader" class="blur-bg">
                <div class="blug-bg-inner"></div>
            </div>
            <div class="mb-3 text-xs flex w-full">
                <Tabs value="/" class="w-full">
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
            <div id="sectionHeader" class="pl-3 pb-3"></div>
        </div>
    </div>
</template>