<script setup>
    import Card from 'primevue/card';
    import Button from 'primevue/button';
    defineProps({
        buttonLabel:{
            type:String,
            default:"Create"
        },
        buttonAction:{
            type:Function,
            default:()=>{}
        }
    })
</script>
<template>
<Card class="mt-5 w-full">
    <template #title><slot name="title"></slot></template>
    <template #subtitle><slot name="subtitle"></slot></template>
    <template #content>
        <p class="m-0">
            <slot name="content"></slot>
        </p>
    </template>
    <template #footer>
        <div class="flex justify-end">
            <Button :label="buttonLabel" @click="buttonAction"  />
        </div>
    </template>
</Card>
</template>