<script setup>
import Button from "primevue/button"
import { useAuthStore } from '@/stores/auth';
const logout = ()=>{
    const auth = useAuthStore();
    auth.logout();
}

</script>
<template>
<div class="container">
    <div class="mb-5">
        <h1 class="text-surface-700  font-bold text-2xl">User profile</h1>
    </div>
    <Button @click="logout" class="mr-2 mb-5" label="Logout"  size="small" />
</div>
</template>
<style scoped></style>