<script setup>
import { RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue';
import TheBalanceInfo from './components/TheBalanceInfo.vue';
import { useAuthStore } from '@/stores/auth';
import Button from "primevue/button"
import { ref } from 'vue';
import AddExpenseModalView from "@/views/expenses/AddExpenseModalView.vue"
import DynamicDialog from 'primevue/dynamicdialog';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';

const auth = useAuthStore();

const isAddExpenseModalShown = ref(false);
function showAddExpenseModal(){
    isAddExpenseModalShown.value = true;
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
        <Button rounded @click="showAddExpenseModal" class="bottom-10 right-10 !fixed overflow-visible" icon="pi pi-plus"  aria-label="Add expense"  />
        <AddExpenseModalView v-model:visible="isAddExpenseModalShown"/>
    </section>
    <DynamicDialog />
  </main>
</template>

<style scoped>

</style>
