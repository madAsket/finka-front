<script setup>
import Button from 'primevue/button';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import router from "@/router/index"
import GoogleAuth from './GoogleAuth.vue';
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();
const auth = useAuthStore();
const submiting = ref(false);

const schema = yup.object({
  username: yup.string().required().label('Username'),
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(5).label('Password'),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match').label('Password confirmation'),
  accept: yup.bool().required().oneOf([true], 'Please, accept the rules').label('Agreements'),
});

const { defineField, handleSubmit,setErrors,setValues, resetForm,errors } = useForm({
  validationSchema: schema,
});

const [username] = defineField('username');
const [email] = defineField('email');
const [password] = defineField('password');
const [confirmPassword] = defineField('confirmPassword');
const [accept] = defineField('accept');

onMounted(()=>{
    resetForm();
    setValues({ 
        username: "", 
    }, false);
})

const onSignUp = handleSubmit(async (values) => {
    submiting.value = true;
    const data = await auth.signUp(values);
    submiting.value = false;
    if(data.status === "success"){
        router.push("/projects");
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
                <img src="@/assets/finka.png" width="300px" class="m-auto">
                <div class="text-3xl font-medium mb-4">Sing Up</div>
                <GoogleAuth class="mb-3" :isSignUp="true" />
                <span class="font-medium leading-normal">Already have the account?</span>
                <RouterLink to="/login" class="font-medium no-underline ml-2 text-primary cursor-pointer">Sign In</RouterLink>
            </div>

            <div>
                <form @submit="onSignUp">
                    <div class="field mb-6">
                        <InputText id="username" autocomplete="off" v-model="username" type="text" placeholder="Your name" 
                        class="w-full"
                        :class="{ 'p-invalid': errors.username }" />
                        <Message v-if="errors.username"  size="small" severity="error" variant="simple">{{ errors.username }}</Message>
                    </div>
                    <div class="field mb-6">
                        <InputText id="email1" v-model="email" type="text" placeholder="Email" 
                        class="w-full"
                        :class="{ 'p-invalid': errors.email }" />
                        <Message v-if="errors.email"  size="small" severity="error" variant="simple">{{ errors.email }}</Message>
                    </div>
                    <div class="field mb-6">
                        <InputText id="password" autocomplete="new-password" v-model="password" type="password" placeholder="Password" 
                        class="w-full"
                        :class="{ 'p-invalid': errors.password }" />
                        <Message v-if="errors.password"  size="small" severity="error" variant="simple">{{errors.password}}</Message>
                    </div>
                    <div class="field mb-4">
                        <InputText id="confirmPassword" autocomplete="new-password" v-model="confirmPassword" type="password" placeholder="Password again" 
                        class="w-full"
                        :class="{ 'p-invalid': errors.confirmPassword }" />
                        <Message v-if="errors.confirmPassword"  size="small" severity="error" variant="simple">{{errors.confirmPassword}}</Message>
                    </div>
                    <div class="field mb-6">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <Checkbox inputId="accept" v-model="accept" :binary="true" class="mr-2" />
                                <label for="accept">
                                    Agreed to <a class="font-medium no-underline text-primary" href="https://finka.cloud/terms-of-service" target="_blank">terms of service</a> 
                                    & <a class="font-medium no-underline text-primary" href="https://finka.cloud/privacy-policy" target="_blank">privacy policy</a>
                                </label>
                            </div>
                        </div>
                        <Message v-if="errors.accept"  size="small" severity="error" variant="simple">{{ errors.accept }}</Message>
                    </div>
                    <Button :loading="submiting" :disabled="submiting"  label="Sign Up" type="submit" icon="pi pi-user" class="w-full" />
                </form>
            </div>
        </div>
    </div>
</template>