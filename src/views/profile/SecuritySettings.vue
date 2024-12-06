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

const toastManager = useToastManger();
const auth = useAuthStore();

const schema = yup.object({
  password: yup.string().required().min(5).label('Password'),
  confirmPassword: yup.string().required().oneOf([yup.ref('password'), null], 'Passwords must match').label('Password confirmation'),
});

const { defineField, handleSubmit, setErrors, setValues, resetForm,errors } = useForm({
  validationSchema: schema,
});

const [password] = defineField('password');
const [confirmPassword] = defineField('confirmPassword');


onMounted(()=>{
    resetForm();
});


const logout = ()=>{
    const auth = useAuthStore();
    auth.logout();
    router.push('/login');
}

const onSave = handleSubmit(async (values) => {
  const data = await auth.changePassword(values);
  if(data.status === "success"){
      toastManager.show("Password updated!");
      resetForm();
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
    <div class="space-y-6 max-w-96">
          <h2 class="text-base/7 font-semibold text-gray-900">Change password</h2>
          <form @submit="onSave">
            <div class="grid grid-cols-1 gap-x-6 gap-y-8">
              <div class="">
                <InputText small id="password" autocomplete="new-password" v-model="password" type="password" placeholder="New password" 
                class="w-full text-sm"
                :class="{ 'p-invalid': errors.password }" />
                <Message v-if="errors.password"  size="small" severity="error" variant="simple">{{errors.password}}</Message>
              </div>
              <div class="">
                <InputText id="confirmPassword" autocomplete="new-password" v-model="confirmPassword" type="password" placeholder="Password again" 
                class="w-full text-sm"
                :class="{ 'p-invalid': errors.confirmPassword }" />
                <Message v-if="errors.confirmPassword"  size="small" severity="error" variant="simple">{{errors.confirmPassword}}</Message>
              </div>
            </div>
            <div class="pt-8 flex items-center justify-end">
                <Button label="Update password" type="submit" class="small text-sm" small />
            </div>
          </form>
          <div class="border-t mt-10">
            <Button @click="logout" class="mr-2 mb-5 mt-5" icon="pi pi-sign-out" label="Logout"  size="small" />
          </div>
      </div>

</template>