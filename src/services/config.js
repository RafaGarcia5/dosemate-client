import axios from 'axios';
import i18n from '../config/i18n';
import { store } from '../redux/store';
import { logout } from '../redux/authSlice';

const BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Accept-Language'] = i18n.language || 'en';
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            store.dispatch(logout());
            console.error('Unauthorized: Logging out user.');
        }
        return Promise.reject(error);
    }
);

const get = async (url, params = {}) => {
    const response = await instance.get(url, { params })
    return response.data;
};

const post = async (url, data = {}) => {
    const response = await instance.post(url, data);
    return response.data;
};

const put = async (url,  data = {}) => {
    const response = await instance.put(url, data);
    return response.data;
};

const del = async (url, data = {}) => {
    const response = await instance.delete(url, { data });
    return response.data;
};

export { BASE_URL, get, post, put, del };

