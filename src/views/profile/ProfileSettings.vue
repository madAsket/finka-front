<script setup>
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import BaseAvatar from '@/components/BaseAvatar.vue';
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();

const auth = useAuthStore();

const schema = yup.object({
  firstName: yup.string().required().min(3).max(50).label('First name'),
  lastName: yup.string().nullable().min(2).max(50).label('Last name'),
});

const { defineField, handleSubmit, setErrors, setValues, resetForm,errors } = useForm({
  validationSchema: schema,
});

const [firstName] = defineField('firstName');
const [lastName] = defineField('lastName');


onMounted(()=>{
  setValues({
    firstName:auth.user.firstName,
    lastName:auth.user.lastName
  }, false);
});


const onSave = handleSubmit(async (values) => {
  const data = await auth.editProfile(values);
  if(data.status === "success"){
      toastManager.show("Profile updated!");
  }else{
      let errors = data.fieldErrors;
      if(errors){
          setErrors(errors);
      }else{
        toastManager.error();
      }
  }
});

const onFileSelect = async (data)=>{
    const result = await auth.uploadAvatar(data.files[0]);
    if(result.status === "success"){
        toastManager.show("Avatar updated!");
        auth.user.avatar = result.avatar;
    }else{
        toastManager.error();
    }
}

</script>
<template>
      <div class="space-y-6 max-w-96">
        <h2 class="text-base/7 font-semibold text-gray-900">Contacts</h2>
        <div class="grid grid-cols-2">
          <dt class="text-sm/6 font-medium text-gray-900">Email</dt>
          <dd class="text-sm/6 text-gray-700 mt-0">{{ auth.user.email }}</dd>
        </div>
        <form @submit="onSave" class=" border-t pt-5">
            <h2 class="text-base/7 font-semibold text-gray-900 mb-5">Personal information</h2>
            <div class="grid grid-cols-1 gap-x-6 gap-y-8">
              <div class="">
                <InputText small id="firstName"  v-model="firstName"  placeholder="Firts name" 
                class="w-full text-sm"
                :class="{ 'p-invalid': errors.firstName }" />
                <Message v-if="errors.firstName"  size="small" severity="error" variant="simple">{{errors.firstName}}</Message>
              </div>
              <div class="">
                <InputText id="lastName" v-model="lastName" placeholder="Last name" 
                class="w-full text-sm"
                :class="{ 'p-invalid': errors.lastName }" />
                <Message v-if="errors.lastName"  size="small" severity="error" variant="simple">{{errors.lastName}}</Message>
              </div>
            </div>
            <div class="pt-8 flex items-center justify-end">
                <Button label="Save profile" type="submit" class="small text-sm" small />
            </div>
          </form>
        <div class="border-t pt-5">
          <h2 class="text-base/7 font-semibold text-gray-900">Change Avatar</h2>
          <div class="flex items-center gap-x-3 mt-5">
            <BaseAvatar :size="{width:60,height:60}" :avatar="auth.user.avatar" :firstName="auth.user.firstName"></BaseAvatar>
            <FileUpload accept="image/png,image/jpeg,image/jpg" :maxFileSize="1240000" mode="basic" @select="onFileSelect" 
            invalidFileSizeMessage="Invalid file size, file size should be smaller than 1MB."
            customUpload auto severity="secondary" class="p-button-outlined" />
            <small class="text-xs italic max-w-36">Choose PNG,JPG image with maximum 1MB.</small>
          </div>

        </div>
      </div>
  </template>