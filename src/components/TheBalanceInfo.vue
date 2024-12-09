<script setup>
import {useBalanceStore} from "@/stores/balance"
import {useProjectStore} from "@/stores/project"

const balanceStore = useBalanceStore();
const projectStore = useProjectStore();
balanceStore.syncBalance(projectStore.currentProject.Project.id);

</script>
<template>
    <div class="border-b bg-slate-50" v-if="balanceStore.totalBalance !== null">
        <div class="flex text-slate-500 divide-x divide-dashed divide-slate-300 justify-start ml-3   py-1">
            <div class="pr-3 grid justify-start items-center">
                <p class="text-2xs text-slate-700 mr-1">Monthly balance:</p>
                <p class="font-extrabold text-2xs">{{$formatCurrency(balanceStore.spent, projectStore.currentProject.Project.currency)}} / <span class="text-lime-800">{{$formatCurrency(balanceStore.limit, projectStore.currentProject.Project.currency)}}</span></p>
            </div>
            <div class="pl-3 text-slate-700 grid justify-center items-center">
                <p class="text-2xs text-slate-700">Total balance:</p>
                <p class="font-extrabold text-2xs">{{$formatCurrency(balanceStore.totalBalance, projectStore.currentProject.Project.currency)}}</p>
            </div>
        </div>
    </div>
</template>