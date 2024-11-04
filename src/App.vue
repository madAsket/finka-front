<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheMenu from './components/TheMenu.vue';
import TheBalanceInfo from './components/TheBalanceInfo.vue';
</script>

<template>
  <TheMenu />
  <div class="h-full min-h-screen w-full bg-white pb-4 pl-4 pr-4">
    <TheBalanceInfo/>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>

</style>
