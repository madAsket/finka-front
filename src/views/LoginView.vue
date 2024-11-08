<script setup>
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import router from "@/router/index"
const rememberMe = ref(true);

const schema = yup.object({
  email: yup.string().required().email().label('Email address'),
  password: yup.string().required().min(4).label('Password'),
});

const { defineField, handleSubmit,setErrors,resetForm,errors } = useForm({
  validationSchema: schema,
});

const [email] = defineField('email');
const [password] = defineField('password');

const onLogin = handleSubmit(async (values) => {
    const auth = useAuthStore();
    const response = await auth.login(values);
    if(response?.data?.status === "success"){
        router.push("/");
    }else{
        let errors = response.data.fieldErrors;
        if(errors){
            setErrors(errors);
        }else{
            //TODO show something went wrong?
        }
    }
 
});

</script>
<template>
    <div class="px-6 py-20 md:px-12 lg:px-20">
        <div class="p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
            <div class="text-center mb-4">
                <svg class="mx-auto fill-surface-900  h-16" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20.7207 6.18211L14.9944 3.11148L3.46855 9.28678L0.579749 7.73444L14.9944 0L23.6242 4.62977L20.7207 6.18211ZM14.9996 12.3574L26.5182 6.1821L29.4216 7.73443L14.9996 15.4621L6.37724 10.8391L9.27337 9.28677L14.9996 12.3574ZM2.89613 16.572L0 15.0196V24.2656L14.4147 32V28.8953L2.89613 22.7132V16.572ZM11.5185 18.09L0 11.9147V8.81001L14.4147 16.5376V25.7904L11.5185 24.2312V18.09ZM24.2086 15.0194V11.9147L15.5788 16.5377V31.9998L18.475 30.4474V18.09L24.2086 15.0194ZM27.0969 22.7129V10.3623L30.0004 8.81V24.2653L21.3706 28.895V25.7904L27.0969 22.7129Z"
                    />
                </svg>
                <h1 class="mb-4 text-base font-medium">Finka</h1>
                <div class="text-3xl font-medium mb-4">Sing In</div>
                <span class="font-medium leading-normal">Don't have an account?</span>
                <a class="font-medium no-underline ml-2 text-primary cursor-pointer">Create today!</a>
            </div>

            <div>
                <form @submit="onLogin">
                    <div class="field">
                        <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Email</label>
                        <InputText id="email1" v-model="email" type="text" placeholder="Email address" 
                        class="w-full"
                        :class="{ 'p-invalid': errors.email }" />
                        <Message v-if="errors.email"  size="small" severity="error" variant="simple">{{ errors.email }}</Message>
                    </div>
                    <div class="field mb-4">
                        <label for="password" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
                        <InputText id="password" v-model="password" type="password" placeholder="Password" 
                        class="w-full"
                        :class="{ 'p-invalid': errors.password }" />
                        <Message v-if="errors.password"  size="small" severity="error" variant="simple">{{errors.password}}</Message>
                    </div>
                    <div class="flex items-center justify-between mb-12">
                        <div class="flex items-center">
                            <Checkbox id="rememberme1" v-model="rememberMe" :binary="true" class="mr-2" />
                            <label for="rememberme1">Remember me</label>
                        </div>
                        <a class="font-medium no-underline ml-2 text-primary text-right cursor-pointer">Forgot password?</a>
                    </div>
                    <Button label="Sign In" type="submit" icon="pi pi-user" class="w-full" />
                </form>
            </div>
        </div>
    </div>
</template>