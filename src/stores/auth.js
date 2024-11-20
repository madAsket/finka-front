import { defineStore } from 'pinia';

import {useProjectStore} from "./project"
import AuthService from '@/services/AuthService';


export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: undefined,
        token:localStorage.getItem('authToken')
    }),
    actions: {
        updateUserState(data){
            this.user = data.user;
            if(!data.user){
                this.token = null;
                localStorage.setItem('authToken', null);
            }else{
                if(data.token){
                    this.token = data.token;
                    localStorage.setItem('authToken', data.token);
                }
                const projectStore = useProjectStore()
                projectStore.setCurrentProject(data.currentProject);
                projectStore.setCurrencyConfig(data.currency); 
            }
        },
        async login(creds) {
            const data = await AuthService.login(creds);
            this.updateUserState(data);
            return data;
        },
        async signUp(creds) {
            const data = await AuthService.signUp(creds);
            this.updateUserState(data);
            return data;
        },
        async syncCurrentUser(){
            this.updateUserState(await AuthService.syncCurrentUser());
        },
        logout() {
            this.user = undefined;
            this.token = null;
            localStorage.removeItem('authToken');
        }
    }
});
