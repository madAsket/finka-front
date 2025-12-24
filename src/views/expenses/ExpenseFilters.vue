<script setup>
import { useBalanceStore } from '@/stores/balance';
import { useProjectStore } from '@/stores/project';
import moment from 'moment';
import { DatePicker, FloatLabel } from 'primevue';
import { onMounted,ref,watch } from 'vue';

const balanceStore = useBalanceStore();
const projectStore = useProjectStore();
const filterDates = ref([]);
const maxDate = ref();

onMounted(()=>{
    const firstDay = moment().startOf('month').toDate();
    const lastDay = moment().endOf('month').toDate();
    filterDates.value = [firstDay, lastDay];
    maxDate.value = lastDay;
});


watch(filterDates, async ()=>{
    if(filterDates.value[1] && filterDates.value[0]){
        balanceStore.updateExpenseFilters(
            {
                startDate:filterDates.value[0],
                endDate:moment(filterDates.value[1]).endOf('day') //TODO fix wrong date format
            });
        await balanceStore.loadExpenses(projectStore.currentProject.Project.id);
    }
})

</script>
<template>
    <div>
        <FloatLabel variant="on">
            <DatePicker class="text-xs" 
            inputId="on_label"
            dateFormat="dd.mm.yy"
            showIcon fluid iconDisplay="input" 
            :manualInput="false" :maxDate="maxDate" v-model="filterDates" selectionMode="range" 
            :showOtherMonths="false"
            size="small" />
            <label for="on_label">Filter by dates</label>
        </FloatLabel>
    </div>
</template>