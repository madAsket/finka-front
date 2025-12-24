import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

function setAuthHeader() {
    // return auth header with jwt if user is logged in and request is to the api url
    const { token } = useAuthStore();
    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}

export default function setInterceptors(){
    console.log("INTERCEPTORS SETUP");
    
    axios.interceptors.request.use(function (config) {
        // Do something before request is sent
        const headers = setAuthHeader();
        config.headers = headers;
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });
}