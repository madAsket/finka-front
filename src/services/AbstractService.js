import axios from 'axios';

class AbstractService {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    async request(method, url, credentials, options={}){
        try{
            const response = await axios[method](`${this.baseUrl}${url}`, credentials);
            let data = response.data.data || {};
            data.status = response.data.status;
            return data;
        }catch(e){
            return e.response?.data ? e.response.data : e;
        }
    }
}

export default AbstractService;