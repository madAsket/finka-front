<script setup>
import { ref, onMounted } from 'vue';
import Button from "primevue/button"
import DatePicker from "primevue/datepicker"
import { useProjectStore } from "@/stores/project"
import { useBalanceStore } from "@/stores/balance"
import BaseEmptyList from '@/components/BaseEmptyList.vue';
import BaseListHeader from '@/components/BaseListHeader.vue';
import VueApexCharts from "vue3-apexcharts";

const projectStore = useProjectStore();
const balanceStore = useBalanceStore();
const resLoaded = ref(false);

const dates = ref([new Date(), new Date()]);

const chartOptions = ref({
    chart: {
        // height: '100px',
        type: 'heatmap',
        toolbar: {
            show: false,
        }
    },
    stroke: {
        width: 2
    },
    markers: {
        size: 2,
    },
    plotOptions: {
        heatmap: {
            radius: 5,
            enableShades: true,
            colorScale: {
                ranges: [{
                    from: 0,
                    to: 1,
                    color: '#d0f7e0'
                },
                {
                    from: 2,
                    to: 3,
                    color: '#eff7d0'
                },
                {
                    from: 3,
                    to: 5,
                    color: '#f7d3d0'
                },
                ],
            },
        }
    },
    dataLabels: {
        enabled: true,
        style: {
            colors: ['#000'],
            fontSize: '10px',
        },
        background: {
            padding: 0,
        }
    },
    xaxis: {
        type: 'category',
    },
    title: {
        text: ''
    },
});


function generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = (i + 1).toString();
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
        series.push({
            x: x,
            y: y
        });
        i++;
    }
    return series;
}

const chartSeries = ref([{
    name: 'Metric1 123123 123',
    data: generateData(31, {
        min: 0,
        max: 5
    })
},
{
    name: 'Metric2',
    data: generateData(31, {
        min: 0,
        max: 5
    })
},
{
    name: 'Metric3',
    data: generateData(31, {
        min: 0,
        max: 5
    })
},
{
    name: 'Metric4',
    data: generateData(31, {
        min: 0,
        max: 5
    })
},
{
    name: 'Metric5',
    data: generateData(31, {
        min: 0,
        max: 5
    })
},
{
    name: 'Metric6',
    data: generateData(31, {
        min: 0,
        max: 5
    })
},
{
    name: 'Metric7',
    data: generateData(31, {
        min: 0,
        max: 5
    })
},
{
    name: 'Metric8',
    data: generateData(31, {
        min: 0,
        max: 5
    })
},
{
    name: 'Metric9',
    data: generateData(31, {
        min: 0,
        max: 5
    })
}
]);


onMounted(async () => {
    resLoaded.value = true;
});

const resetFilters = () => {

}

</script>
<template>
    <div>
        <BaseListHeader>
            <template #filters>
                <DatePicker class="text-xs" dateFormat="dd.mm.yy" placeholder="Filter by dates" showIcon fluid
                    iconDisplay="input" :manualInput="false" :maxDate="new Date()" v-model="dates" selectionMode="range"
                    :showOtherMonths="false" size="small" />
            </template>
        </BaseListHeader>
        <VueApexCharts 
        class="mt-5"
        width="100%"
        height="300px" 
        type="heatmap" 
        :options="chartOptions" 
        :series="chartSeries" />
    </div>
</template>
<style scoped></style>