import axios from 'axios';
import { environment } from '../environments/environment.development';

const axiosInstance = axios.create({
    baseURL: environment.apiUrl,
    headers: {
        'APIKey': environment.apiKey,
    },
    timeout: 10000,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
