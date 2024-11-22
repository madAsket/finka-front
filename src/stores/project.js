import { defineStore } from 'pinia';
import {useBalanceStore} from "./balance"
import ProjectService from '@/services/ProjectService';

export const useProjectStore = defineStore({
    id: 'project',
    state: () => ({
        currentProject: undefined,
        currency:{},
        rates:{}
    }),
    getters:{
        getCurrentProjectOwnerId: (state)=>{
            return state.currentProject.Project.owner;
        },
        isOwner(state){
            return (userId) => state.getCurrentProjectOwnerId === userId;
        },
        getCurrencyList:(state)=>{
            let currencyList = [];
            let currencyTypes = Object.keys(state.currency);
            for(const currencyType of currencyTypes){
                currencyList.push({
                    label:currencyType,
                    items:Object.keys(state.currency[currencyType]).sort()
                });
            }
            return currencyList;
        }
    },
    actions: {
        setCurrentProject(project, config) {
            this.currentProject = project;
            if(config){
                this.setCurrencyConfig(config);
            }
        },
        setCurrencyConfig(config){
            this.currency = config.currency;
            this.rates = config.rates;
        },
        async refreshProjectState(project, currencyConfig){
            const balanceStorage = useBalanceStore();
            await balanceStorage.syncBalance(project.projectId);
            this.setCurrentProject(project, currencyConfig);
        },
        async addProject(data){
            const responseData = await ProjectService.addProject(data);
            if(responseData?.newProject?.isCurrent){
                await this.refreshProjectState(responseData.newProject, responseData.currency);
            };
            return responseData;
        },
        async switchCurrentProject(projectId, data){
            const responseData = await ProjectService.switchCurrentProject(projectId, data);
            await this.refreshProjectState(responseData.project, responseData.currency);
        },
        async getUserProjects(){
            const response = await ProjectService.getUserProjects();
            return response;
        },
        async getProjectUsers(projectId){
            return await ProjectService.getProjectUsers(projectId);
        },
        async inviteUserToProject(projectId, data){
            return await ProjectService.inviteUserToProject(projectId, data);
        }
    }
});
