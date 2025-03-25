import axios from 'axios';

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';
const baseURL = isProduction
    ? process.env.NEXT_PUBLIC_PRODUCTION_BASE_URL
    : process.env.NEXT_PUBLIC_DEVELOPMENT_BASE_URL;

const api = axios.create({
    baseURL: baseURL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;