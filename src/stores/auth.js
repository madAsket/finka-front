import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router/index';

const baseUrl = `${import.meta.env.VITE_API_URL}/auth`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: undefined,
        token:localStorage.getItem('authToken')
    }),
    actions: {
        async login(creds) {
            try{
                const response = await axios.post(`${baseUrl}/login`, creds);
                console.log(response);
                this.user = response.data.data.user;
                localStorage.setItem('authToken', response.data.data.token);
                this.token = response.data.data.token;
                router.push('/');
            }catch(e){
                console.log(e);
            }
        },
        async syncCurrentUser(){
            try{
                const response = await axios.get(`${baseUrl}/current`);
                this.user = response.data.data.user;
                if(!response.data.data.user){
                    this.token = null;
                    localStorage.setItem('authToken', null);
                    router.push('/login');
                }
                this.user = response.data.data.user;
            }catch(e){
                console.log(e);
            }
        },
        logout() {
            this.user = undefined;
            this.token = null;
            localStorage.removeItem('authToken');
            router.push('/login');
        }
    }
});
