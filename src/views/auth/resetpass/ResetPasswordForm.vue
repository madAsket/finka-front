<script setup>
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import { ref, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import router from "@/router/index"
import { useToastManger } from '@/composables/toaster';

const submiting = ref(false);
const auth = useAuthStore();
const toastManager = useToastManger();

const schema = yup.object({
  email: yup.string().required().email().label('Email address'),
});

const { defineField, handleSubmit,setErrors,resetForm,errors } = useForm({
  validationSchema: schema,
});

const [email] = defineField('email');


const onSubmit = handleSubmit(async (values) => {
    submiting.value = true;
    const data = await auth.resetPassword(values);
    submiting.value = false;
    if(data.status === "success"){
        router.push("/");
        toastManager.show("Please, check your email. We've sent a link to set up your new password. It's only valid for 24 hours.", 10000, 'success');
    }else{
        let errors = data.fieldErrors;
        if(errors){
            setErrors(errors);
        }else{
            toastManager.error();
        }
    }
});

</script>
<template>
    <div class="px-6 py-20 md:px-12 lg:px-20">
        <div class="p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
            <div class="text-center mb-4">
                <RouterLink to="/"><img src="@/assets/finka.png" width="300px" class="m-auto"></RouterLink>
                <div class="text-3xl font-medium mb-4">Reset Password</div>
                <RouterLink to="/signup" class="font-medium no-underline mr-2 text-primary cursor-pointer">Sign Up</RouterLink> | <RouterLink to="/login"  class="font-medium no-underline ml-2 text-primary cursor-pointer">Login</RouterLink>
            </div>

            <div>
                <form @submit="onSubmit">
                    <div class="field mb-6">
                        <InputText id="email" autocomplete="username" v-model="email" type="text" placeholder="Your email address" 
                        class="w-full"
                        :class="{ 'p-invalid': errors.email }" />
                        <Message v-if="errors.email"  size="small" severity="error" variant="simple">{{ errors.email }}</Message>
                    </div>
                    <Button label="Reset password" type="submit"  :loading="submiting" :disabled="submiting" class="w-full" />
                </form>
            </div>
        </div>
    </div>
</template>