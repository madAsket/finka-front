import AbstractService from './AbstractService';

class BalanceService extends AbstractService {
    async addStorage(projectId, data){
        return await this.request('post', `/${projectId}/storages`, data);
    }
    async getAllStorages(projectId){
        return await this.request('get', `/${projectId}/storages`);
    }
    async addDeposit(projectId, data){
        return await this.request('post', `/${projectId}/deposits`, data);
    }
    async getAllDeposits(projectId){
        return await this.request('get', `/${projectId}/deposits`);
    }
}
  
export default new BalanceService(`${import.meta.env.VITE_API_URL}/projects`);