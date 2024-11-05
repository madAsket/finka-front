<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"

const router = useRouter();

const expenses = ref([
        {
            id: '1000',
            description: 'Континент пошел купил еды и всяких вкусняшек',
            expense_date:"11/12/2024",
            author: {
                id:22,
                username:"Денис",
                avatar:""
            },
            target_storage: {
                id:'3',
                label:"Bunq",
                currency:"EUR"
            },
            amount: 65,
            category: {
                id:'3',
                label:'Продукты',
            }
        },
        {
            id: '1000',
            description: 'Континент',
            expense_date:"11/12/2024",
            author: {
                id:22,
                username:"Денис",
                avatar:""
            },
            target_storage: {
                id:'3',
                label:"Bunq",
                currency:"EUR"
            },
            amount: 65,
            category: {
                id:'3',
                label:'Такси/Транспорт',
            }
        },
        {
            id: '1000',
            description: 'Континент',
            expense_date:"11/12/2024",
            target_storage: {
                id:'3',
                label:"Bunq",
                currency:"EUR"
            },
            author: {
                id:22,
                username:"Денис",
                avatar:""
            },
            amount: 65,
            category: {
                id:'3',
                label:'Коммуналка/Услуги',
            }
        },
])
onMounted(() => {
});


const formatCurrency = (value) => {
    return new Intl.NumberFormat('eu-EU', { style: 'currency', currency: 'EUR' }).format(value);
}

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Current month expenses</h1>
        <p class="text-xs"><b>Project:</b> Family budgeting.</p>
    </div>
    <div>
        <DataTable :value="expenses" stripedRows  class="text-xs" tableStyle="max-width: 60rem">
            <Column field="description" header="Description" class="max-w-40"></Column>
            <Column field="category.label" header="Category"  >
                <template #body="{ data }">
                    <Chip :label="data.category.label" class=" bg-orange-100"></Chip>
                </template>
            </Column>
            <Column field="expense_date" header="Date" ></Column>
            <Column field="amount" header="Amount" >
                <template #body="{ data }">
                    <b>{{ formatCurrency(data.amount) }}</b>
                </template>
            </Column>
            <Column field="target_storage.label" header="From" ></Column>
            <Column field="author" header="Author">
                <template #body="{ data }">
                    <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="data.author.username" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                </template>
            </Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button class="w-7 h-7 text-slate-500" size="small" icon="pi pi-pencil" rounded outlined aria-label="Edit" />
                        <Button class="w-7 h-7 text-red-300" size="small" icon="pi pi-trash" rounded outlined aria-label="Delete" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped>
</style>