import AbstractService from './AbstractService';

class ProjectService extends AbstractService {
    async getUserProjects(){
        return await this.request('get', "/");
    }
    async getProjectUsers(projectId){
        return await this.request('get', `/${projectId}/users`);
    }
    async inviteUserToProject(projectId, data){
        return await this.request('post', `/${projectId}/users`, data);
    }
    async addProject(data){
        return await this.request('post', "/", data);
    }
    async editProject(projectId, data){
        return await this.request('patch', `/${projectId}/`, data);
    }
    async switchCurrentProject(projectId){
        return await this.request('post', `/${projectId}/switch`);
    }
}
  
export default new ProjectService(`${import.meta.env.VITE_API_URL}/projects`);