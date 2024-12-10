<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import { ref, onUpdated } from 'vue';
import {useProjectStore} from "@/stores/project"
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();
const visible = defineModel('visible')
const projectStore = useProjectStore();
const emit = defineEmits(['add-user'])
const submiting = ref(false);

const schema = yup.object({
    email: yup.string().email().required().max(50).label('Email'),
});

const { defineField, handleSubmit,setErrors, setValues, resetForm,errors } = useForm({
    validationSchema: schema,
});

const [email] = defineField('email');

onUpdated(()=>{
    resetForm();
});


const onAddUser = handleSubmit(async (values) => {
    submiting.value = true;
    const result = await projectStore.inviteUserToProject(projectStore.currentProject.projectId, values);
    submiting.value = false;
    if(result.status === "success"){
        emit('add-user', result);
        toastManager.show("User added!");
    }else{
        let errors = result.fieldErrors;
        if(errors){
            setErrors(errors);
        }else{
            toastManager.error();
        }
    }
});

</script>
<template>

    <Dialog v-model:visible="visible" modal header="Invite user" :style="{ width: '25rem' }">
        <form @submit="onAddUser">
            <div class="mb-4 flex flex-col gap-y-5">
                <div class="field">
                    <InputText id="email" v-model="email" type="email" placeholder="Email" fluid 
                    :class="{ 'p-invalid': errors.email }" />
                    <Message v-if="errors.email"  size="small" severity="error" variant="simple">{{ errors.email }}</Message>
                </div>
            </div>
            <div class="flex justify-end">
                <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
                <Button :loading="submiting" :disabled="submiting" label="Invite" class="ml-2" type="submit"  autofocus />
            </div>
        </form>
    </Dialog>    

</template>