<script setup>
import { ref, onMounted, computed, inject, watch } from 'vue';
import Button from "primevue/button"
import DatePicker from "primevue/datepicker"
import FloatLabel from "primevue/floatlabel"
import { useProjectStore } from "@/stores/project"
import { useBalanceStore } from "@/stores/balance"
import { useAnalyticStore } from "@/stores/analytic"
import BaseEmptyList from '@/components/BaseEmptyList.vue';
import BaseListHeader from '@/components/BaseListHeader.vue';
import ExpenseDiffBlock from './ExpenseDiffBlock.vue';
import VueApexCharts from "vue3-apexcharts";
import moment from 'moment';

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();
const analyticStore = useAnalyticStore();
const resLoaded = ref(false);

const dates = ref([new Date(), new Date()]);
const selectedMonthState = ref({});
const prevMonthState = ref({});
const expenseCategories = ref([]);
const filterDate = ref();

const currencyFormatter = inject('currencyFormatter');

const chartOptions = ref({
    chart: {
        type: 'bar',
        fontFamily: 'inherit',
        stacked: true,
        toolbar:{
            show:false
        }
    },
    stroke: {
        width: 0.5,
        colors: ['#fff']
    },
    dataLabels: {
        enabled: false,
    },
    plotOptions: {
        bar: {
            horizontal: true
        }
    },
    xaxis:{
        categories: [],
        labels: {
            formatter: (val) => {
                return currencyFormatter.formatCurrency(val, "EUR")
            }
        },
    },

    fill: {
        opacity: 1,
    },
    colors: ['#ad7b7b', '#807bad', '#7bad92'],
    legend: {
        position: 'bottom',
        horizontalAlign: 'left',
        inverseOrder: true,
        width:'100%',
        markers: {
          size: 10,
          shape: "rounded",
      },
    },
    tooltip: {
      y: {
        formatter: (val) => {
            return currencyFormatter.formatCurrency(val, "EUR")
        }
      },
    }
});


const chartSeries = ref([]);

const buildChartSeries = (spentInCategories, limitInCategories, remainInCategories)=>{
    chartSeries.value = [
        {
            name: 'Spent',
            group: 'expenses',
            data: spentInCategories
        },
        {
            name: 'Limits',
            group: 'limits',
            data: limitInCategories
        },
        {
            name: 'Remains',
            group: 'expenses',
            data: remainInCategories
        }
    ];
}

function updateChartOptions(){
    let categories = [];
    let spentInCategories = [];
    let limitInCategories = [];
    let remainInCategories = [];
    expenseCategories.value.forEach((item)=>{
        categories.push(item.name);
        spentInCategories.push(item.spent);
        limitInCategories.push(item.limit.limit);
        let remain = item.limit.limit - item.spent;
        if(remain < 0){
            remain = 0;
        }
        remainInCategories.push(remain);
    });
    chartOptions.value = {
    ...chartOptions.value,
    ...{
            xaxis: {
                categories: categories
            },
        },
    };
    buildChartSeries(spentInCategories, limitInCategories, remainInCategories);
}

onMounted(async () => {
    const monthDate = moment().startOf('month').toDate();
    filterDate.value = monthDate;
});

watch(filterDate, async ()=>{
    const month = filterDate.value.getMonth() + 1;
    const year = filterDate.value.getFullYear();
    loadData({month, year});
});

async function loadData(filters){
    resLoaded.value = false;
    const response = await analyticStore.getExpensesAnalytic(projectStore.currentProject.projectId, filters);
    if(response.status === "success"){
        selectedMonthState.value = response.summarize.selected;
        prevMonthState.value = response.summarize.previous;
        response.categories.sort((itemA, itemB)=>{
            return itemB.spent - itemA.spent;
        });
        expenseCategories.value = response.categories;
    }
    updateChartOptions();
    resLoaded.value = true;
}

function getDiff(firstVal, secondVal){
    if(secondVal === 0 || firstVal === 0){
        return null;
    }
    return Math.floor(((firstVal / secondVal) * 100) - 100);
}

const totalSpentDiff = computed(()=>{
    return getDiff(selectedMonthState.value.totalSpent, prevMonthState.value.totalSpent);
});

const medianDiff = computed(()=>{
    return getDiff(selectedMonthState.value.medianExpense, prevMonthState.value.medianExpense);
});

const maxDiff = computed(()=>{
    return getDiff(selectedMonthState.value.maxExpense, prevMonthState.value.maxExpense);
});

const chartHeight = computed(()=>{
    if(expenseCategories.value.length <= 4){
        return `${110 + (50 * expenseCategories.value.length)}px`;
    }
    return `${50 * expenseCategories.value.length}px`;
})

</script>
<template>
    <div>
        <BaseListHeader>
            <template #filters>
                <FloatLabel variant="on">
                    <DatePicker class="text-xs" 
                    inputId="on_label"
                    showIcon fluid iconDisplay="input" 
                    :manualInput="false" v-model="filterDate"
                    view="month" dateFormat="MM yy"
                    size="small" />
                    <label for="on_label">Filter by month</label>
                </FloatLabel>
            </template>
        </BaseListHeader>
        <div class="mt-5">
            <div>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-6  md:col-span-4">
                        <div class="bg-surface-0 shadow p-4 rounded-border">
                            <div class="flex justify-between mb-4">
                                <div>
                                    <span class="block text-surface-500 font-medium mb-4">TOTAL</span>
                                    <div class="text-surface-900 font-medium text-sm">
                                        {{$formatCurrency(selectedMonthState.totalSpent, projectStore.currentProject.Project.currency) }} / 
                                        {{$formatCurrency(selectedMonthState.totalLimit, projectStore.currentProject.Project.currency) }}
                                    </div>
                                </div>
                                <div class="flex items-center justify-center bg-blue-100 rounded-border w-8 h-8">
                                    <i class="pi pi-wallet text-blue-500 text-sm" />
                                </div>
                            </div>
                            <ExpenseDiffBlock :diff="totalSpentDiff"/>
                        </div>
                    </div>
                    <div class="col-span-6 sm:col-span-6 md:col-span-4">
                        <div class="bg-surface-0 shadow p-4 rounded-border">
                            <div class="flex justify-between mb-4">
                                <div>
                                    <span class="block text-surface-500 font-medium mb-4">AVG / MEDIAN</span>
                                    <div class="text-surface-900 font-medium text-sm">
                                        {{$formatCurrency(selectedMonthState.avgExpense, projectStore.currentProject.Project.currency) }} / 
                                        {{$formatCurrency(selectedMonthState.medianExpense, projectStore.currentProject.Project.currency) }}
                                    </div>
                                </div>
                                <div class="flex items-center justify-center bg-orange-100 rounded-border w-8 h-8">
                                    <i class="pi pi-gauge text-orange-500 text-sm" />
                                </div>
                            </div>
                            <ExpenseDiffBlock :diff="medianDiff"/>   
                        </div>
                    </div>
                    <div class="col-span-6 sm:col-span-6 md:col-span-4">
                        <div class="bg-surface-0 shadow p-4 rounded-border">
                            <div class="flex justify-between mb-4">
                                <div>
                                    <span class="block text-surface-500 font-medium mb-4">MAX</span>
                                    <div class="text-surface-900 font-medium text-sm">{{$formatCurrency(selectedMonthState.maxExpense, projectStore.currentProject.Project.currency) }}</div>
                                </div>
                                <div class="flex items-center justify-center bg-red-100 rounded-border w-8 h-8">
                                    <i class="pi pi-exclamation-circle text-red-500 text-sm" />
                                </div>
                            </div>
                            <ExpenseDiffBlock :diff="maxDiff"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <VueApexCharts v-if="resLoaded && selectedMonthState.totalSpent > 0" 
            class="mt-2"
            width="100%"
            :height="chartHeight"
            :options="chartOptions" 
            :series="chartSeries" />
        <div v-if="selectedMonthState.totalSpent === 0" class="bg-surface-0  px-6 py-20 md:px-12 lg:px-20">
            <div class="text-surface-700 text-center">
                <div class="text-surface-600  font-bold text-4xl mb-4">No data available for selected month.</div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>