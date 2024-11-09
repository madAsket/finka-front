import AbstractService from './AbstractService';

class BalanceService extends AbstractService {
    async addStorage(projectId, data){
        return await this.request('post', `/${projectId}/storages`, data);
    }
    async getAllStorages(projectId){
        console.log(projectId);
        return await this.request('get', `/${projectId}/storages`);
    }
}
  
export default new BalanceService(`${import.meta.env.VITE_API_URL}/projects`);