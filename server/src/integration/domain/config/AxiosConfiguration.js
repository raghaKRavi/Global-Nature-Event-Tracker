const axios = require('axios');

const axiosInstance = ({baseURL, params}) => {
    const instance = axios.create({
        baseURL,
        headers:{
            'Content-Type': 'application/json'
        },
        timeout: 5000
    });

    instance.interceptors.request.use(
        (config) => {
            console.log("Request Config => ", config)
            config.params = {...config.params, api_key: `${API_TOKEN_NASA}`};
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    instance.interceptors.response.use(
        (response) => {
            console.log("Response => ", response);
            return response;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
}


export default axiosInstance;