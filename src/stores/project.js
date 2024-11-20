import { defineStore } from 'pinia';
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
            console.log(state.currency);
            let currencyTypes = Object.keys(state.currency);
            for(const currencyType of currencyTypes){
                currencyList.push({
                    label:currencyType,
                    items:Object.keys(state.currency[currencyType]).sort()
                });
            }
            console.log(currencyList);
            return currencyList;
        }
    },
    actions: {
        setCurrentProject(project) {
            this.currentProject = project;
        },
        setCurrencyConfig(config){
            this.currency = config.currency;
            this.rates = config.rates;
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
