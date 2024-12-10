<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref, inject, onMounted } from 'vue';
import {useProjectStore} from "@/stores/project"
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();
const projectStore = useProjectStore();
const dialogRef = inject('dialogRef');
const submiting = ref(false);

const project = ref(dialogRef.value.data.project);

const schema = yup.object({
    name: yup.string().required().max(50).label('Name')
});

const { defineField, handleSubmit,setErrors, setValues, resetForm,errors } = useForm({
    validationSchema: schema,
});

const [name] = defineField('name');

onMounted(()=>{
    setValues({ name: project.value.Project.name}, false);
});


const onEditProject = handleSubmit(async (values) => {
    submiting.value = true;
    const result = await projectStore.editProject(project.value.Project.id, values);
    submiting.value = false;
    if(result.status === "success"){
        project.value.Project.name = values.name;
        dialogRef.value.close();
        toastManager.show("Project updated!");
    }else{
        let errors = result.fieldErrors;
        if(errors){
            setErrors(errors);
        }else{
            toastManager.error();
            //TODO show something went wrong?
        }
    }
});
</script>
<template>
    <form @submit="onEditProject">
        <div class="mb-4 flex flex-col gap-y-5">
            <div class="field">
                <InputText id="name" v-model="name" type="text" placeholder="Name" fluid 
                :class="{ 'p-invalid': errors.name }" />
                <Message v-if="errors.name"  size="small" severity="error" variant="simple">{{ errors.name }}</Message>
            </div>
        </div>
        <div class="flex justify-end">
            <Button label="Cancel" text severity="secondary" @click="dialogRef.close()" autofocus />
            <Button :loading="submiting" :disabled="submiting" label="Save" class="ml-2" type="submit" autofocus />
        </div>
    </form>
</template>