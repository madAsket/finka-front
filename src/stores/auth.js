import { defineStore } from 'pinia';

import {useProjectStore} from "./project"
import AuthService from '@/services/AuthService';


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: undefined,
        token:localStorage.getItem('authToken')
    }),
    actions: {
        async login(creds) {
            const data = await AuthService.login(creds);
            if(data.user){
                this.user = data.user;
                localStorage.setItem('authToken', data.token);
                this.token = data.token;
                const projectStore = useProjectStore()
                projectStore.setCurrentProject(data.currentProject);    
                projectStore.setCurrencyConfig(data.currency);    
            }
            return data;
        },
        async syncCurrentUser(){
            const data = await AuthService.syncCurrentUser();
            this.user = data.user;
            if(!data.user){
                this.token = null;
                localStorage.setItem('authToken', null);
            }
            const projectStore = useProjectStore()
            projectStore.setCurrentProject(data.currentProject);
            projectStore.setCurrencyConfig(data.currency); 
        },
        logout() {
            this.user = undefined;
            this.token = null;
            localStorage.removeItem('authToken');
        }
    }
});
