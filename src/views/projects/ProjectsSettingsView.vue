<script setup>
import { ref, onMounted } from 'vue';
import Button from "primevue/button"
import Tabs from "primevue/tabs"
import Tab from "primevue/tab"
import TabList from "primevue/tablist"


const tabItems = ref([
    {
        label: 'Projects',
        icon: 'pi pi-database',
        route: '/projects'
    },
    {
        label: "Project's users",
        icon: 'pi pi-credit-card',
        route: '/projects/1/users'
    },
    {
        label: "Project's expense types",
        icon: 'pi pi-arrow-right-arrow-left',
        route: '/projects/1/expensetypes'
    },
])

</script>

<template>
    <div class="container">
        <div class="mb-5 text-xs flex justify-start">
            <Tabs value="/">
                <TabList>
                    <Tab v-for="tab in tabItems" :key="tab.label" :value="tab.route" as="div">
                        <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
                        <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
                            <i :class="tab.icon" />
                            <span>{{ tab.label }}</span>
                        </a>
                        </router-link>
                    </Tab>
                </TabList>
            </Tabs>
        </div>
        <RouterView></RouterView>
        <Button rounded class="bottom-10 right-10 !fixed" icon="pi pi-plus"  aria-label="Add expense"  />
    </div>
</template>
