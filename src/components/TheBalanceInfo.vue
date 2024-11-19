<script setup>
import {useBalanceStore} from "@/stores/balance"
import {useProjectStore} from "@/stores/project"
import { onMounted } from "vue";

const balanceStore = useBalanceStore();
const projectStore = useProjectStore();

onMounted(async ()=>{
    await balanceStore.syncBalance(projectStore.currentProject.Project.id);
});

</script>
<template>
    <div class="fixed top-2 right-2" v-if="balanceStore.totalBalance !== null">
        <div class="flex text-slate-500 divide-x divide-dashed divide-slate-300 justify-center">
            <div class="pr-5">
                <p class="text-xs text-slate-700">Monthly balance:</p>
                <p class="font-extrabold text-sm">{{$formatCurrency(balanceStore.spent, projectStore.currentProject.Project.currency)}} / <span class="text-lime-800">{{$formatCurrency(balanceStore.limit, projectStore.currentProject.Project.currency)}}</span></p>
            </div>
            <div class="pl-5 text-slate-700">
                <p class="text-xs text-slate-700">Total balance:</p>
                <p class="font-extrabold text-sm">{{$formatCurrency(balanceStore.totalBalance, projectStore.currentProject.Project.currency)}}</p>
            </div>
        </div>
    </div>
</template>