<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue';
import TheBalanceInfo from './components/TheBalanceInfo.vue';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const auth = useAuthStore();


onMounted(()=>{
    console.log("mounted");
})
</script>

<template>
  <TheMenu v-if="auth.user"/>
  <div class="h-full min-h-screen w-full bg-white pb-4 pl-4 pr-4">
    <TheBalanceInfo v-if="auth.user"/>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>

</style>
