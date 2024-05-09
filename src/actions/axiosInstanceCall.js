import axios from 'axios';
import { useSelector } from 'react-redux';

const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Get token from local storage
        const token = localStorage.getItem('token');
     
        // Set token in request header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;
