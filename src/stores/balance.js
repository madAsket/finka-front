import { defineStore } from 'pinia';
import BalanceService from '@/services/BalanceService';

export const useBalanceStore = defineStore({
    id: 'balance',
    state: () => ({
        expenses: [],
        totalBalance:null,
        spent:null,
        limit:null
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
        syncBalanceHandler(response, projectId){
            this.syncBalance(projectId);
            return response;
        },
        async syncBalance(projectId) {
            const data = await BalanceService.syncBalance(projectId);
            this.totalBalance = data.totalBalance;
            this.spent = data.spent;
            this.limit = data.limit;
        },
        async addStorage(projectId, data){
            return await BalanceService.addStorage(projectId, data).then((response)=>{
                return this.syncBalanceHandler(response, projectId);
            });
        },
        async getAllStorages(projectId, params){
            return await BalanceService.getAllStorages(projectId, params)
        },
        async getNonEmptyStorages(projectId){
            return await BalanceService.getNonEmptyStorages(projectId);
        },
        async addDeposit(projectId, data){
            return await BalanceService.addDeposit(projectId, data).then((response)=>{
                return this.syncBalanceHandler(response, projectId);
            });
        },
        async deleteDeposit(projectId, depositId){
            return await BalanceService.deleteDeposit(projectId, depositId).then((response)=>{
                return this.syncBalanceHandler(response, projectId);
            });
        },
        async getAllDeposits(projectId){
            return await BalanceService.getAllDeposits(projectId);
        },
        async addExpenseCategory(projectId, data){
            return await BalanceService.addExpenseCategory(projectId, data).then((response)=>{
                return this.syncBalanceHandler(response, projectId);
            });
        },
        async getProjectCategories(projectId){
            return await BalanceService.getProjectCategories(projectId);
        },
        async getMonthsCategories(projectId, date){//TODO: filter by month/year
            return await BalanceService.getMonthsCategories(projectId, date);
        },
        async addExpense(projectId, data){
            const result = await BalanceService.addExpense(projectId, data).then((response)=>{
                return this.syncBalanceHandler(response, projectId);
            })
            if(result.status === "success"){
                //TODO do not add expense if it's from other month;
                this.expenses.push(result);
            }
            return result;
        },
        async deleteExpense(projectId, expenseId){
            const result = await BalanceService.deleteExpense(projectId, expenseId).then((response)=>{
                return this.syncBalanceHandler(response, projectId);
            });
            if(result.status === "success"){
                //TODO do not add expense if it's from other month;
                this.expenses = this.expenses.filter((item)=>{
                    return item.id !== expenseId;
                });
            }
            return result;
        },
        async deleteTransfer(projectId, transferId){
            return await BalanceService.deleteTransfer(projectId, transferId).then((response)=>{
                return this.syncBalanceHandler(response, projectId);
            });
        },
        async getMonthsExpenses(projectId, date){//TODO: filter by month/year
            return await BalanceService.getMonthsExpenses(projectId, date);
        },
        async addTransfer(projectId, data){
            return await BalanceService.addTransfer(projectId, data).then((response)=>{
                return this.syncBalanceHandler(response, projectId);
            });
        },
        async getAllTransfers(projectId){
            return await BalanceService.getAllTransfers(projectId);
        }
    }
});
