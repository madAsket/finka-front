<script setup>
import Chip from "primevue/chip"
import Button from "primevue/button"
import { useBalanceStore } from "@/stores/balance";

const balanceStore = useBalanceStore();
const props = defineProps({
    expenseItem:Object,
    baseCurrency:String
})

const formatDate = (dateString) =>{
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU',{year: 'numeric', month: 'numeric', day: 'numeric',}).format(date);
}
const deleteExpense = async ()=>{
    await balanceStore.deleteExpense(props.expenseItem.projectId, props.expenseItem.id);
}
</script>
<template>
    <div class="flex items-center justify-start py-2">
        <div class="mr-2">
            <img src="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" width="40" height="40" 
            class="border p-0.5 rounded-full border-indigo-800">
        </div>
        <div class="flex flex-col w-80 mr-1 items-start justify-start">
            <h3 class="text-sm  mb-1">
                <span class="mr-2 text-xs font-bold">{{ formatDate(expenseItem.expensedAt) }} <span class="text-xs font-semibold text-slate-500">from {{ expenseItem.Storage.name }}</span></span>
            </h3>
            <p class="text-xs text-slate-500 overflow-hidden">
                <Chip :pt="{label:{class:'overflow-hidden max-h-4'}}" :label="expenseItem.ExpenseCategory.name" class="bg-indigo-50 h-5 text-xs max-w-32 overflow-hidden"></Chip>
                <span class="font-light ml-1">{{ expenseItem.description }}</span>
            </p>
        </div>
        <div class="flex items-start flex-col ml-auto w-32">
            <p class="font-semibold text-sm text-pink-800">-{{ $convertCurrency(expenseItem.amount, expenseItem.Storage.currency, baseCurrency) }}</p>
        </div>
        <div class="flex items-start ml-auto gap-2">
            <Button class="w-7 h-7 text-slate-400" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
            <Button @click="deleteExpense" class="w-7 h-7 text-red-300" size="small" icon="pi pi-trash" rounded outlined aria-label="Delete" />
        </div>
    </div>
</template>