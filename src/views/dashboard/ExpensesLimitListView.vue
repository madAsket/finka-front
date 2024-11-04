<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"

const limits = ref([
    {
        id:1,
        amount: 300,
        spent:150,
        category: {
            color:"orange",
            id:'3',
            label:'Продукты',
        }
    },
    {
        id:2,
        amount: 300,
        spent:150,
        category: {
            color:"red",
            id:'3',
            label:'Такси/Транспорт',
        }
    },
    {
        id:2,
        amount: 300,
        spent:150,
        category: {
            color:"blue",
            id:'3',
            label:'Коммуналка/Сервисы',
        }
    },
    {
        id:2,
        amount: 300,
        spent:150,
        category: {
            color:"green",
            id:'3',
            label:'Уроки',
        }
    },
    {
        id:2,
        amount: 300,
        spent:150,
        category: {
            color:"grey",
            id:'3',
            label:'Школа',
        }
    },
    {
        id:2,
        amount: 300,
        spent:150,
        category: {
            color:"cyan",
            id:'3',
            label:'Праздники/Кафе',
        }
    },
    {
        id:2,
        amount: 300,
        spent:150,
        category: {
            color:"purple",
            id:'3',
            label:'Шоппинг',
        }
    },
    {
        id:2,
        amount: 300,
        spent:150,
        category: {
            color:"amber",
            id:'3',
            label:'Налоги/Релокация',
        }
    },
    {
        id:2,
        amount: 300,
        spent:150,
        category: {
            color:"lime",
            id:'3',
            label:'Медицина/Здоровье',
        }
    }
])

const formatCurrency = (value) => {
    return new Intl.NumberFormat('eu-EU', { style: 'currency', currency: 'EUR' }).format(value);
}

const categoryColor = (value) => {
    return `bg-${value}`
}
</script>
<template>

<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Expenses Limit</h1>
        <p class="text-xs"><b>Project:</b> Family budgeting.</p>
    </div>
    <div>
        <Button  class="mr-2 mb-5" icon="pi pi-plus" label="Add category"  size="small" />
    </div>
    <div>
        <DataTable :value="limits" stripedRows  class="text-xs" tableStyle="max-width: 40rem">
            <Column field="category.label" header="Category"  >
                <template #body="{ data }">
                    <Chip :label="data.category.label" :pt="{chip:{background:categoryColor(data.category.color)}}"></Chip>
                </template>
            </Column>
            <Column field="amount" header="Spent / Amount" >
                <template #body="{ data }">
                    {{ formatCurrency(data.spent) }} / <b>{{ formatCurrency(data.amount) }}</b>
                </template>
            </Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <div class="grid grid-cols-1">
                        <Button class="w-7 h-7 text-slate-500" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped></style>