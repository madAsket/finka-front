<script setup>
import Button from 'primevue/button';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useToastManger } from '@/composables/toaster';

const toastManager = useToastManger();

const auth = useAuthStore();

const subscription = ref({
    type:"Early Adopter Premium",
    price:"Free",
    period:"Month",
    status:"Active"
})


onMounted(()=>{

});


</script>
<template>
       <div class="bg-surface-0">
        <div class="bg-surface-0 ">
            <div class="font-semibold text-base/7 text-surface-900 mb-4">Subscription Information</div>
            <!-- <div class="text-surface-500  mb-8">Morbi tristique blandit turpis. In viverra ligula id nulla hendrerit rutrum.</div> -->
            <ul class="list-none p-0 m-0">
                <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap  text-sm">
                    <div class="w-4/12 font-medium text-sm">Subscription</div>
                    <div class="text-surface-900 w-4/12">{{subscription.type}}</div>
                    <!-- <div class="w-4/12  flex justify-end">
                      <Button label="Manage" icon="pi pi-wrench"  variant="outlined" />
                    </div> -->
                </li>
                <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap  text-sm">
                    <div class="w-4/12 font-medium  text-sm">Periodicity</div>
                    <div class="text-surface-900 w-4/12">{{subscription.period}}</div>
                </li>
                <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap  text-sm">
                    <div class="w-4/12 font-medium  text-sm">Price</div>
                    <div class="text-surface-900 w-4/12">{{subscription.price}}</div>
                </li>
                <!-- <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap  text-sm">
                    <div class="w-4/12 font-medium  text-sm">Start date</div>
                    <div class="text-surface-900 w-4/12">20 april 2025</div>
                </li>
                <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap  text-sm">
                    <div class="w-4/12 font-medium  text-sm">Expiration date</div>
                    <div class="text-surface-900 w-4/12">20 may 2025</div>
                    <div class="w-4/12 flex justify-end">
                    </div>
                </li> -->
                <!-- <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap  text-sm">
                    <div class="w-4/12 font-medium  text-sm">Next payment</div>
                    <div class="text-surface-900 w-4/12">20 may 2025 / $1.99 / $20</div>
                    <div class="w-4/12 flex justify-end">
                    </div>
                </li> -->
                <li class="flex items-center py-4 px-2 border-t border-surface flex-wrap text-sm">
                    <div class="w-4/12 font-medium  text-sm">Status</div>
                    <div class="text-surface-900 w-4/12">{{ subscription.status }}</div>
                    <!-- <div class="w-4/12 flex justify-end">
                      <Button label="Get back" icon="pi pi-crown" />
                    </div> -->
                </li>
            </ul>
        </div>
    </div>
</template>