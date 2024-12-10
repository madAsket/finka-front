<script setup>
import { RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue';
import { useAuthStore } from '@/stores/auth';
import Button from "primevue/button"
import { computed, ref } from 'vue';
import AddExpenseForm from "@/views/expenses/AddExpenseForm.vue"
import DynamicDialog from 'primevue/dynamicdialog';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import { useDialogManager } from "@/composables/dialog";
import router from "@/router/index"

const auth = useAuthStore();
const dialogManager = useDialogManager();

const openExpenseForm = ()=>{
    dialogManager.openDialog(AddExpenseForm, {
        props:{
            header: 'Add expense',
        },
    });
}
const isPublicPage = computed(()=>{
    return router.currentRoute.value.meta.hasOwnProperty('authNotRequired');
})
</script>

<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <DynamicDialog />
  <div class="app-container flex flex-row h-full justify-center ">
    <TheMenu v-if="auth.user"/>
    <main class="h-full min-h-screen w-full bg-white main-container"
    :class="{'col-span-2':isPublicPage}">
      <RouterView></RouterView>
      <section v-if="auth.user" class="relative">
          <Button rounded @click="openExpenseForm" 
          class="bottom-10 md:right-10 !fixed overflow-visible right-5 z-30" 
          icon="pi pi-plus"  aria-label="Add expense"  />
      </section>
    </main>
  </div>
</template>

<style scoped>
  .app-container{
    display:grid;
    grid-template-columns: 100px 1fr;
    margin: 0;
    padding: 0;
    width:100%;
  }
  @media only screen and (max-width: 768px) {
      .app-container{
        grid-template-columns: 1fr;
        grid-auto-flow: row;
          /* display:none; */
      }
      .main-container{
        order:0;
        padding-bottom:60px;
      }
  }
</style>
