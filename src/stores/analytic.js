import { defineStore } from 'pinia';
import AnalyticService from '@/services/AnalyticService';

export const useAnalyticStore = defineStore({
    id: 'analytic',
    state: () => ({

    }),
    actions: {
        async getExpensesAnalytic(projectId, filters) {
            return await AnalyticService.getExpensesAnalytic(projectId, filters);
        },
    }
});