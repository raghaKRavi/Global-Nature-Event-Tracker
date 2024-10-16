import axios, { AxiosInstance }  from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.SERVER_URL_LOCAL || "http://ec2-3-255-39-100.eu-west-1.compute.amazonaws.com:8080/api/v1",
    headers:{
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response: any) => {
        return response;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;