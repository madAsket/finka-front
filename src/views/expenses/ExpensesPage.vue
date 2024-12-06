<script setup>
import { ref, onMounted } from 'vue';
import Tabs from "primevue/tabs"
import Tab from "primevue/tab"
import TabList from "primevue/tablist"

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
    </div>
</template>
