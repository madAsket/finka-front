<script setup>
import Tabs from "primevue/tabs"
import Tab from "primevue/tab"
import TabList from "primevue/tablist"
defineProps({
    tabItems:{
        type:Array,
        default:[]
    },
    noHeader:{
        default:false,
        type:Boolean
    }
});
</script>

<template>
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
            <div id="sectionHeader"></div>
        </div>
    </div>
</template>