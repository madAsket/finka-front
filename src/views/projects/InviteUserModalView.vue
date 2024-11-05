<script setup>
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import { ref, onMounted } from 'vue';
import DatePicker from 'primevue/datepicker'
import Chip from 'primevue/chip'

const visible = defineModel('visible')

</script>
<template>
    <Dialog v-model:visible="visible" modal header="Invite user" :style="{ width: '25rem' }">
        <div class="mb-4 flex flex-col gap-y-5">
            <div class="">
                <InputText type="text" placeholder="Username"  fluid/>
            </div>
            <div class="">
                <InputText type="email" placeholder="Email"  fluid/>
            </div>
            <div class="">
                <InputText type="password" placeholder="Password"  fluid/>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
            <Button label="Invite"  autofocus />
        </template>
    </Dialog>    
</template>