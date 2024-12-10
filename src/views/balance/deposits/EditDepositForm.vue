<script setup>
import Button from 'primevue/button';
import Message from 'primevue/message';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref, inject, onMounted } from 'vue';
import { useBalanceStore } from '@/stores/balance';
import { useProjectStore } from '@/stores/project';
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();
const emit = defineEmits(['save']);
const balanceStore = useBalanceStore();
const projectStore = useProjectStore();
const dialogRef = inject('dialogRef');
const users = ref([]);
const model = ref(dialogRef.value.data.model);
const submiting = ref(false);

const schema = yup.object({
    depositedAt: yup.date().required().label('Desposit date'),
    author: yup.number().required().label('Author'),
});

const { defineField, handleSubmit,setErrors, setValues, resetForm, errors } = useForm({
    validationSchema: schema,
});

const [depositedAt] = defineField('depositedAt');
const [author] = defineField('author');

onMounted(async()=>{
    users.value = await projectStore.getProjectUsers(projectStore.currentProject.projectId);
    setValues({ 
        author: model.value.User.id, 
        depositedAt:new Date(model.value.depositedAt)
    }, false);
});

const onEdit = handleSubmit(async (values) => {
    submiting.value = true;
    const result = await balanceStore.editDeposit(model.value.projectId, model.value.id, values);
    submiting.value = false;
    if(result.status === "success"){
        Object.assign(model.value, result);
        emit('save');
        dialogRef.value.close();
        toastManager.show("Deposit updated!");
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
    <form @submit="onEdit">
        <div class="mb-4 flex flex-col gap-y-5">
            <div class="grid gap-2 grid-cols-2">
                <div class="field">
                    <DatePicker v-model="depositedAt" showIcon fluid iconDisplay="input" placeholder="Deposit date" dateFormat="dd.mm.yy"
                    :class="{ 'p-invalid': errors.depositedAt }" />
                    <Message v-if="errors.depositedAt"  size="small" severity="error" variant="simple">{{ errors.depositedAt }}</Message>
                </div>
                <div class="field">
                    <Select  
                    class="h-full"
                    name="author" v-model="author" :options="users" :highlightOnSelect="false" 
                    optionLabel="firstName" optionValue="id" fluid
                    :class="{ 'p-invalid': errors.author }" >
                        <!-- <template #value="slotProps">
                            <div v-if="slotProps.value">
                                <Chip size="small" small :pt="{image:{width:'20px',heigth:'20px;'}}" :label="slotProps.value.firstName" :image="slotProps.value.avatar" />
                            </div>
                            <span v-else>
                                {{ slotProps.placeholder }}
                            </span>
                        </template>
                        <template #option="slotProps">
                            <div class="max-w-36">
                                <Chip size="small" :pt="{image:{style:'width:20px;height:20px'}}" :label="slotProps.option.firstName" :image="slotProps.option.avatar" />
                            </div>
                        </template> -->
                    </Select>
                    <Message v-if="errors.author"  size="small" severity="error" variant="simple">{{ errors.author }}</Message>
                </div>
            </div>
        </div>
        <div class="flex justify-end">
            <Button label="Cancel" text severity="secondary" @click="dialogRef.close()" autofocus />
            <Button :loading="submiting" :disabled="submiting"  label="Save" class="ml-2" type="submit" autofocus />
        </div>
    </form>
</template>