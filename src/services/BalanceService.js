import AbstractService from './AbstractService';

class BalanceService extends AbstractService {
    async addStorage(projectId, data){
        return await this.request('post', `/${projectId}/storages`, data);
    }
    async editStorage(projectId, storageId, data){
        return await this.request('patch', `/${projectId}/storages/${storageId}`, data);
    }
    async getAllStorages(projectId, params){
        return await this.request('get', `/${projectId}/storages`,{params});
    }
    async getNonEmptyStorages(projectId){
        return await this.getAllStorages(projectId, {noempty:true})
    }
    async addDeposit(projectId, data){
        return await this.request('post', `/${projectId}/deposits`, data);
    }
    async editDeposit(projectId, depositId, data){
        return await this.request('patch', `/${projectId}/deposits/${depositId}`, data);
    }
    async deleteDeposit(projectId, depositId){
        return await this.request('delete', `/${projectId}/deposits/${depositId}`);
    }
    async getAllDeposits(projectId){
        return await this.request('get', `/${projectId}/deposits`);
    }
    async addExpenseCategory(projectId, data){
        return await this.request('post', `/${projectId}/expensecategories`, data);
    }
    async getProjectCategories(projectId){
        return await this.getMonthsCategories(projectId);
    }
    async getMonthsCategories(projectId, date){//TODO: filter by month/year
        return await this.request('get', `/${projectId}/expensecategories`);
    }
    async addExpense(projectId, data){
        return await this.request('post', `/${projectId}/expenses`, data);
    }
    async deleteExpense(projectId, expenseId){
        return await this.request('delete', `/${projectId}/expenses/${expenseId}`);
    }
    async getMonthsExpenses(projectId, date){//TODO: filter by month/year
        return await this.request('get', `/${projectId}/expenses`);
    }
    async addTransfer(projectId, data){
        return await this.request('post', `/${projectId}/transfers`, data);
    }
    async deleteTransfer(projectId, transferId){
        return await this.request('delete', `/${projectId}/transfers/${transferId}`);
    }
    async getAllTransfers(projectId){
        return await this.request('get', `/${projectId}/transfers`);
    }
    async syncBalance(projectId){
        return await this.request('get', `/${projectId}/balance`);
    }
}
  
export default new BalanceService(`${import.meta.env.VITE_API_URL}/projects`);