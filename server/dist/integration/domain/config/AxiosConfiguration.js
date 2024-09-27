"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const axiosInstance = (baseURL) => {
    const instance = axios_1.default.create({
        baseURL: baseURL,
        headers: {
            'Content-Type': 'application/json'
        },
        timeout: 5000
    });
    instance.interceptors.request.use((config) => {
        config.params = Object.assign(Object.assign({}, config.params), { api_key: `${process.env.API_TOKEN_NASA}` });
        console.log("params ", config.params);
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    instance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    });
    return instance;
};
exports.default = axiosInstance;
