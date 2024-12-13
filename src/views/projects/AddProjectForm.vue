<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Checkbox from 'primevue/checkbox';
import Select from 'primevue/select'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref, onUpdated, } from 'vue';
import {useProjectStore} from "@/stores/project"
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();
const visible = defineModel('visible');
const submiting = ref(false);

const emit = defineEmits(['add-project'])
const projectStore = useProjectStore();

const schema = yup.object({
    name: yup.string().required().max(50).label('Name'),
    currency: yup.string().required().label('Currency'),
    isCurrent: yup.boolean().label('Current'),
});

const { defineField, handleSubmit,setErrors, setValues, resetForm,errors } = useForm({
    validationSchema: schema,
});

const [name] = defineField('name',{});
const [currency] = defineField('currency',{
    validateOnModelUpdate: false,
});
const [isCurrent] = defineField('isCurrent',{
    validateOnModelUpdate: false,
});

onUpdated(()=>{
    resetForm();
    setValues({ currency: projectStore.currentProject.Project.currency});
});


const onAddProject = handleSubmit(async (values) => {
    submiting.value = true;
    const result = await projectStore.addProject(values);
    submiting.value = false;
    if(result.status === "success"){
        emit('add-project', result.newProject);
        toastManager.show("Project created!");
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
<Dialog v-model:visible="visible" modal header="Add Project" :style="{ width: '25rem' }">
    <form @submit="onAddProject">
        <div class="mb-4 flex flex-col gap-y-5">
            <div class="field">
                <InputText id="name" v-model="name" type="text" placeholder="Name" fluid 
                :class="{ 'p-invalid': errors.name }" />
                <Message v-if="errors.name"  size="small" severity="error" variant="simple">{{ errors.name }}</Message>
            </div>
            <div class="field">
                <Select 
                class="h-full"
                name="currency" filter v-model="currency" :options="projectStore.getCurrencyList" :highlightOnSelect="false" 
                optionGroupLabel="label" optionGroupChildren="items"
                placeholder="Select currency" fluid
                :class="{ 'p-invalid': errors.currency }" >
                </Select>
                <Message v-if="errors.currency"  size="small" severity="error" variant="simple">{{ errors.currency }}</Message>
            </div>
            <div class="field flex items-center gap-2">
                <Checkbox v-model="isCurrent" inputId="isCurrent" name="isCurrent"
                :class="{ 'p-invalid': errors.isCurrent }" binary />
                <label for="isCurrent"> Set as current project</label>
                <Message v-if="errors.isCurrent"  size="small" severity="error" variant="simple">{{ errors.isCurrent }}</Message>
            </div>
        </div>
        <div class="flex justify-end">
            <Button label="Cancel" text severity="secondary" @click="visible = false" autofocus />
            <Button :loading="submiting" :disabled="submiting" label="Add" class="ml-2" type="submit" autofocus />
        </div>
    </form>
</Dialog>    
</template>