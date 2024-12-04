<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref, inject, onMounted } from 'vue';
import { useBalanceStore } from '@/stores/balance';
import { useToastManger } from '@/composables/toaster';
const toastManager = useToastManger();

const balanceStore = useBalanceStore();
const dialogRef = inject('dialogRef');

const storage = ref(dialogRef.value.data.storage);

const schema = yup.object({
    name: yup.string().required().max(50).label('Name')
});

const { defineField, handleSubmit,setErrors, setValues, resetForm,errors } = useForm({
    validationSchema: schema,
});

const [name] = defineField('name');

onMounted(()=>{
    setValues({ name: storage.value.name}, false);
});

const onEditStorage = handleSubmit(async (values) => {
    const result = await balanceStore.editStorage(storage.value.projectId, storage.value.id, values);
    if(result.status === "success"){
        storage.value.name = values.name;
        dialogRef.value.close();
        toastManager.show("Storage updated!");
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
    <form @submit="onEditStorage">
        <div class="mb-4 flex flex-col gap-y-5">
            <div class="field">
                <InputText id="name" v-model="name" type="text" placeholder="Name" fluid 
                :class="{ 'p-invalid': errors.name }" />
                <Message v-if="errors.name"  size="small" severity="error" variant="simple">{{ errors.name }}</Message>
            </div>
        </div>
        <div class="flex justify-end">
            <Button label="Cancel" text severity="secondary" @click="dialogRef.close()" autofocus />
            <Button label="Save" type="submit" autofocus />
        </div>
    </form>
</template>