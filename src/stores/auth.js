import { defineStore } from 'pinia';

import {useProjectStore} from "./project"
import AuthService from '@/services/AuthService';
import UploadService from '@/services/UploadService';


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
                // console.log("HERE");
                this.token = null;
                localStorage.setItem('authToken', null);
            }else{
                if(data.token){
                    this.token = data.token;
                    localStorage.setItem('authToken', data.token);
                }
                const projectStore = useProjectStore();
                projectStore.setCurrentProject(data.currentProject, data.currency);
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
            const result = await AuthService.syncCurrentUser();
            this.updateUserState(result);
        },
        async changePassword(creds){
            return await AuthService.changePassword(creds);
        },
        async editProfile(creds){
            const data = await AuthService.editProfile(creds);
            this.user = data;
            return data;
        },
        async uploadAvatar(image){
            const data = await UploadService.uploadAvatar(image);
            return data;
        },
        logout() {
            this.user = undefined;
            this.token = null;
            localStorage.removeItem('authToken');
        }
    }
});
