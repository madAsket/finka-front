<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Checkbox from 'primevue/checkbox';
import Select from 'primevue/select'
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref, onUpdated, onMounted, watch } from 'vue';
import {useProjectStore} from "@/stores/project"
import { useBalanceStore } from '@/stores/balance';

const visible = defineModel('visible');

const emit = defineEmits(['add-project'])
const projectStore = useProjectStore();
const balanceStore = useBalanceStore();

const schema = yup.object({
    name: yup.string().required().max(50).label('Name'),
    currency: yup.string().required().label('Currency'),
    isCurrent: yup.boolean().label('Current'),
});

const { defineField, handleSubmit,setErrors, setValues, resetForm,errors } = useForm({
    validationSchema: schema,
});

const [name] = defineField('name');
const [currency] = defineField('currency');
const [isCurrent] = defineField('isCurrent');

onUpdated(()=>{
    resetForm();
    setValues({ currency: projectStore.currentProject.Project.currency});
});


const onAddProject = handleSubmit(async (values) => {
    const result = await projectStore.addProject(values);
    if(result.status === "success"){
        emit('add-project', result.newProject);
    }else{
        let errors = result.fieldErrors;
        if(errors){
            setErrors(errors);
        }else{
            //TODO show something went wrong?
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
                    <Select name="currency" filter v-model="currency" :options="projectStore.getCurrencyList" :highlightOnSelect="false" 
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
                <Button label="Add" type="submit" autofocus />
            </div>
        </form>
    </Dialog>    
</template>