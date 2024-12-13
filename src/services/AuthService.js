import AbstractService from "@/services/AbstractService"

class AuthService extends AbstractService {
    async login(creds){
        return await this.request('post', `/login`, creds);
    }
    async signUp(creds){
        return await this.request('post', `/signup`, creds);
    }
    async syncCurrentUser(){
        return await this.request('get', `/current`);
    }
    async changePassword(creds){
        return await this.request('patch', "/changepassword", creds);
    }
    async editProfile(creds){
        return await this.request('patch', "/changeprofile", creds);
    }
}
  //TODO singletone?
  export default new AuthService(`${import.meta.env.VITE_API_URL}/auth`);