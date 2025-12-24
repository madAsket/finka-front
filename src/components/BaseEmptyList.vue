<script setup>
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
    
<div class="bg-surface-0 px-6 py-20 md:px-12 lg:px-20 text-center">
    <div class="text-surface-600 font-bold text-4xl mb-4">
        <slot name="title"></slot>
    </div>
    <div class="text-surface-700 text-xl mb-5">
        <slot name="content"></slot>
    </div>
    <div class="text-surface-700 text-center">
        <Button :label="buttonLabel" @click="buttonAction"  />
    </div>
</div>

</template>