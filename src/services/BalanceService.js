import AbstractService from './AbstractService';

class BalanceService extends AbstractService {
    async addStorage(projectId, data){
        return await this.request('post', `/${projectId}/storages`, data);
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
    async getMonthsExpenses(projectId, date){//TODO: filter by month/year
        return await this.request('get', `/${projectId}/expenses`);
    }
    async addTransfer(projectId, data){
        return await this.request('post', `/${projectId}/transfers`, data);
    }
    async getAllTransfers(projectId){
        return await this.request('get', `/${projectId}/transfers`);
    }
    async syncBalance(projectId){
        return await this.request('get', `/${projectId}/balance`);
    }
}
  
export default new BalanceService(`${import.meta.env.VITE_API_URL}/projects`);