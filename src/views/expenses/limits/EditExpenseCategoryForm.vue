<script setup>
import Button from 'primevue/button';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { ref, inject, onMounted, computed } from 'vue';
import { useBalanceStore } from '@/stores/balance';
import { useProjectStore } from '@/stores/project';
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();
const emit = defineEmits(['save']);
const balanceStore = useBalanceStore();
const projectStore = useProjectStore();
const dialogRef = inject('dialogRef');
const model = ref(dialogRef.value.data.model);
const submiting = ref(false);

const schema = yup.object({
    name: yup.string().max(30).required().label('Name'),
    limit: yup.number().nullable().min(0).max(9999999999999999999.9999999999).label('Limit'),
});

const { defineField, handleSubmit,setErrors, setValues, resetForm, errors } = useForm({
    validationSchema: schema,
});

const [name] = defineField('name');
const [limit] = defineField('limit');

onMounted(async()=>{
    setValues({ 
        name: model.value.name, 
        limit: model.value.limit.limit, 
    }, false);
});

const currentNewMonthLimit = computed(() => {
    if(limit.value >= 0)
        return balanceStore.limit + (limit.value - model.value.limit.limit);
    return balanceStore.limit;
})

const onEdit = handleSubmit(async (values) => {
    submiting.value = true;
    const result = await balanceStore.editExpenseCategory(model.value.projectId, model.value.id, values);
    submiting.value = false;
    if(result.status === "success"){
        Object.assign(model.value, result);
        dialogRef.value.close();
        toastManager.show("Category updated!");
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
                <div class="field">
                    <InputText id="name" v-model="name" type="text" placeholder="Name" fluid 
                    :class="{ 'p-invalid': errors.name }" />
                    <Message v-if="errors.name"  size="small" severity="error" variant="simple">{{ errors.name }}</Message>
                </div>
                <div class="field">
                    <h1 class="text-lg font-light mb-2">Update limit for current month</h1>
                    <InputNumber v-model="limit" autocomplete="off" placeholder="Limit" 
                    inputId="limit" v-bind="$currencyFieldProps(projectStore.currentProject.Project.currency)" fluid
                    :class="{ 'p-invalid': errors.limit }"  />
                    <Message v-if="errors.limit"  size="small" severity="error" variant="simple">{{ errors.limit }}</Message>
                </div>
                <h1 class="text-lg font-light uppercase">New limit: <span class="font-extrabold">{{ $formatCurrency(currentNewMonthLimit, projectStore.currentProject.Project.currency) }}</span></h1>
            </div>
        <div class="flex justify-end">
            <Button label="Cancel" text severity="secondary" @click="dialogRef.close()" autofocus />
            <Button :loading="submiting" :disabled="submiting"  label="Save" class="ml-2" type="submit" autofocus />
        </div>
    </form>
</template>