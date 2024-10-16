import axios, { AxiosInstance }  from 'axios';
require('dotenv').config()

const axiosInstance = (baseURL: string) => {
    const instance = axios.create({
        baseURL: baseURL,
        headers:{
            'Content-Type': 'application/json'
        }
    });

    instance.interceptors.request.use(
        (config) => {
            config.params = {...config.params, api_key: `${process.env.API_TOKEN_NASA}`};
            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    )

    instance.interceptors.response.use(
        (response: any) => {
            return response;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );

    return instance;
}


export default axiosInstance;