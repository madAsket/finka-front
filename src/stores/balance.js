import { defineStore } from 'pinia';
import BalanceService from '@/services/BalanceService';

export const useBalanceStore = defineStore({
    id: 'balance',
    state: () => ({
        expenses: [],
    }),
    getters: {
        sortedExpenses: (state) => {
            return [...state.expenses].sort((a,b)=>{
                return new Date(a.expensedAt) - new Date(b.expensedAt);
            })
        }
    },
    actions: {
        async loadExpenses(projectId, props) {
            this.expenses = await BalanceService.getMonthsExpenses(projectId, props);
        },
        addExpense(expense){
            this.expenses.push(expense);
        }
    }
});
