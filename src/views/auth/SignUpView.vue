<script setup>
import Button from 'primevue/button';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import router from "@/router/index"

const auth = useAuthStore();
const submiting = ref(false);

const schema = yup.object({
  username: yup.string().required().label('Username'),
  email: yup.string().required().email().label('Email'),
  password: yup.string().required().min(5).label('Password'),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match').label('Password confirmation'),
});

const { defineField, handleSubmit,setErrors,setValues, resetForm,errors } = useForm({
  validationSchema: schema,
});

const [username] = defineField('username');
const [email] = defineField('email');
const [password] = defineField('password');
const [confirmPassword] = defineField('confirmPassword');

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
        router.push("/");
    }else{
        let errors = data.fieldErrors;
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
                <img src="@/assets/logo-2.png" width="100" class="m-auto mb-2">
                <!-- <svg class="mx-auto fill-surface-900  h-16" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20.7207 6.18211L14.9944 3.11148L3.46855 9.28678L0.579749 7.73444L14.9944 0L23.6242 4.62977L20.7207 6.18211ZM14.9996 12.3574L26.5182 6.1821L29.4216 7.73443L14.9996 15.4621L6.37724 10.8391L9.27337 9.28677L14.9996 12.3574ZM2.89613 16.572L0 15.0196V24.2656L14.4147 32V28.8953L2.89613 22.7132V16.572ZM11.5185 18.09L0 11.9147V8.81001L14.4147 16.5376V25.7904L11.5185 24.2312V18.09ZM24.2086 15.0194V11.9147L15.5788 16.5377V31.9998L18.475 30.4474V18.09L24.2086 15.0194ZM27.0969 22.7129V10.3623L30.0004 8.81V24.2653L21.3706 28.895V25.7904L27.0969 22.7129Z"
                    />
                </svg> -->
                <!-- <h1 class="mb-4 text-base font-medium">Finka</h1> -->
                <div class="text-3xl font-medium mb-4">Sing Up</div>
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
                    <div class="field mb-6">
                        <InputText id="confirmPassword" autocomplete="new-password" v-model="confirmPassword" type="password" placeholder="Password again" 
                        class="w-full"
                        :class="{ 'p-invalid': errors.confirmPassword }" />
                        <Message v-if="errors.confirmPassword"  size="small" severity="error" variant="simple">{{errors.confirmPassword}}</Message>
                    </div>
                    <Button :loading="submiting" :disabled="submiting"  label="Sign Up" type="submit" icon="pi pi-user" class="w-full" />
                </form>
            </div>
        </div>
    </div>
</template>