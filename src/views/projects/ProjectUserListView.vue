<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DataTable from "primevue/datatable"
import Column from "primevue/column"
import Chip from "primevue/chip"
import Button from "primevue/button"

const router = useRouter();

const users = ref([
    {
        id: '1000',
        username:"Денис",
        is_owner:true,
        avatar:"",
        email:"kexbit@gmail.com"
    },
    {
        id: '1000',
        username:"Дарья",
        is_owner:false,
        avatar:"",
        email:"dasha@gmail.com"
    },
])
onMounted(() => {
});

</script>
<template>
<div>
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">Users list</h1>
        <p class="text-xs"><b>Project:</b> Family budgeting.</p>
    </div>
    <div>
        <Button  class="mr-2 mb-5" icon="pi pi-plus" label="Invite user"  size="small" />
    </div>
    <div>
        <DataTable :value="users" stripedRows  class="text-xs" tableStyle="max-width: 40rem">
            <Column field="username" header="Username">
                <template #body="{ data }">
                    <Chip :pt="{image:{style:'width:20px;height:20px'}}" :label="data.username" image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png" />
                </template>
            </Column>
            <Column field="email" header="Email" class="max-w-40 font-bold"></Column>
            <Column header="Actions">
                <template #body="{ data }">
                    <div class="flex gap-2">
                        <Button v-if="!data.is_owner" class="w-7 h-7 text-red-300" size="small" icon="pi pi-trash" rounded outlined aria-label="Delete" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</div>
</template>
<style scoped>
</style>