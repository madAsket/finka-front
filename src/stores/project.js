import { defineStore } from 'pinia';
import ProjectService from '@/services/ProjectService';

export const useProjectStore = defineStore({
    id: 'project',
    state: () => ({
        currentProject: undefined,
    }),
    actions: {
        setCurrentProject(project) {
            this.currentProject = project;
        },
        async getUserProjects(){
            const response = await ProjectService.getUserProjects();
            return response;
        },
        async getProjectUsers(projectId){
            return await ProjectService.getProjectUsers(projectId);
        }
    }
});
