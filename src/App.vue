<script setup>
import { RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue';
import TheBalanceInfo from './components/TheBalanceInfo.vue';
import { useAuthStore } from '@/stores/auth';
import Button from "primevue/button"
import { ref } from 'vue';
import AddExpenseForm from "@/views/expenses/AddExpenseForm.vue"
import DynamicDialog from 'primevue/dynamicdialog';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import { useDialogManager } from "@/composables/dialog";

const auth = useAuthStore();
const dialogManager = useDialogManager();

const openExpenseForm = ()=>{
    dialogManager.openDialog(AddExpenseForm, {
        props:{
            header: 'Add expense',
        },
    });
}

</script>

<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <TheMenu v-if="auth.user"/>
  <main class="h-full min-h-screen w-full bg-white pb-4 pl-4 pr-4">
    <TheBalanceInfo v-if="auth.user"/>
    <RouterView></RouterView>
    <section v-if="auth.user">
        <Button rounded @click="openExpenseForm" class="bottom-10 right-10 !fixed overflow-visible" icon="pi pi-plus"  aria-label="Add expense"  />
    </section>
    <DynamicDialog />
  </main>
</template>

<style scoped>

</style>
