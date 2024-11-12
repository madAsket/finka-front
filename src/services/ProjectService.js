import AbstractService from './AbstractService';

class ProjectService extends AbstractService {
    async getUserProjects(){
        return await this.request('get', "/");
    }
    async getProjectUsers(projectId){
        return await this.request('get', `/${projectId}/users`);
    }
}
  
export default new ProjectService(`${import.meta.env.VITE_API_URL}/projects`);