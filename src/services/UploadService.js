

import AbstractService from "@/services/AbstractService"

class UploadService extends AbstractService {
    async uploadAvatar(image){
        const formData = new FormData();
        formData.append('avatar', image);
        try{
            const response = await this.request('post', "/avatar", formData);
            return response;
        }catch(e){
            console.log(e);
        }
    }
}
  //TODO singletone?
  export default new UploadService(`${import.meta.env.VITE_API_URL}/upload`);