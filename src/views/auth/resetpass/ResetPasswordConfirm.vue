<script setup>
import Button from 'primevue/button';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import router from "@/router/index"
import { useToastManger } from '@/composables/toaster';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZmlua2EuY29tIiwiaWF0IjoxNzM3MDMyNTY1LCJleHAiOjE3MzcxMTg5NjV9.w63ohkqNHll6820VH3JRwS9vNVeuHlr_bceiJmYpVqQ

const toastManager = useToastManger();
const auth = useAuthStore();
const submiting = ref(false);

const resetPassToken = ref(router.currentRoute.value.params.token);
const tokenValidationStatus = ref('unchecked'); //valid, invalid


const schema = yup.object({
  password: yup.string().required().min(5).label('Password'),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match').label('Password confirmation'),
});

const { defineField, handleSubmit,setErrors,setValues, resetForm,errors } = useForm({
  validationSchema: schema,
});

const [password] = defineField('password');
const [confirmPassword] = defineField('confirmPassword');

validateResetToken();

onMounted(()=>{
    resetForm();
});

async function validateResetToken(){
    const data = await auth.resetPasswordCheckToken(resetPassToken.value);
    if(data.status === "success"){
        tokenValidationStatus.value = 'valid';
    }else{
        tokenValidationStatus.value = 'invalid';
    }
}

const onSubmit = handleSubmit(async (values) => {
    submiting.value = true;
    const data = await auth.resetPasswordConfirm(resetPassToken.value, values);
    submiting.value = false;
    if(data.status === "success"){
        router.push("/");
        toastManager.show("Password successfully updated. Please, login with your new password", 10000, 'success');
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
                <div class="text-3xl font-medium mb-4">Password reset</div>
            </div>
            <div v-if="tokenValidationStatus === 'unchecked'">
                <Message severity="info">Checking your link. Please, wait.</Message>
            </div>
            <div v-if="tokenValidationStatus === 'invalid'">
                <Message severity="error">This reset link is expired or invalid.</Message>
                <RouterLink to="/" class="flex items-center font-medium no-underline mt-5 text-primary cursor-pointer">
                    <i class="pi pi-angle-left text-xs mr-1"></i><span>Back to Login</span>
                </RouterLink>
            </div>
            <div v-if="tokenValidationStatus === 'valid'">
                <form @submit="onSubmit">
                    <div class="field mb-6">
                        <InputText id="password" autocomplete="new-password" v-model="password" type="password" placeholder="New password" 
                        class="w-full"
                        :class="{ 'p-invalid': errors.password }" />
                        <Message v-if="errors.password"  size="small" severity="error" variant="simple">{{errors.password}}</Message>
                    </div>
                    <div class="field mb-4">
                        <InputText id="confirmPassword" autocomplete="new-password" v-model="confirmPassword" type="password" placeholder="New password again" 
                        class="w-full"
                        :class="{ 'p-invalid': errors.confirmPassword }" />
                        <Message v-if="errors.confirmPassword"  size="small" severity="error" variant="simple">{{errors.confirmPassword}}</Message>
                    </div>
                    <Button :loading="submiting" :disabled="submiting"  label="Update password" type="submit" class="w-full" />
                </form>
            </div>
        </div>
    </div>
</template>