const axios = require('axios');
require('dotenv').config()

const axiosInstance = (baseURL) => {
    const instance = axios.create({
        baseURL: baseURL,
        headers:{
            'Content-Type': 'application/json'
        },
        timeout: 5000
    });

    instance.interceptors.request.use(
        (config) => {
            
            config.params = {...config.params, api_key: `${process.env.API_TOKEN_NASA}`};
            console.log("params ", config.params);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
}


module.exports = axiosInstance;