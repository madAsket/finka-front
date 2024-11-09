import AbstractService from './AbstractService';

class ProjectService extends AbstractService {
    async getUserProjects(){
        return await this.request('get', "/");
    }
}
  
export default new ProjectService(`${import.meta.env.VITE_API_URL}/projects`);