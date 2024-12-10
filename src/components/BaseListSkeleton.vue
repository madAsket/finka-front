<script setup>
import { Skeleton } from 'primevue';
</script>
<template>
    <div class="rounded border-surface-200 dark:border-surface-700">
        <ul class="m-0 p-0 list-none">
            <li class="mb-4" v-for="i in [1,2,3,4,5]" key="i">
                <div class="flex">
                    <Skeleton shape="circle" size="2.5rem" class="mr-2"></Skeleton>
                    <div class="self-center" style="flex: 1">
                        <Skeleton width="100%" class="mb-2"></Skeleton>
                        <Skeleton width="75%"></Skeleton>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>