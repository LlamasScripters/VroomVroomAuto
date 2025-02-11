import axios from 'axios';
import { useAuthStore } from './src/stores/authStore';
import { useNavigate } from 'react-router-dom';

const axiosInstance: any = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

const errorResponseDataCode = ['token_expired', 'invalid_token', 'account_blocked', 'account_not_validated'];

axiosInstance.interceptors.request.use(
    (config: any) => {
        const token = useAuthStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
        if (error.response) {
            const authStore = useAuthStore.getState();
            if (error.response.status === 401 || errorResponseDataCode.includes(error.response.data.code)) {
                if (authStore.token) {
                    try {
                        await authStore.clearAuth();
                        const navigate = useNavigate();
                        navigate('/login');
                    } catch (err) {
                        console.error('Error while logging out:', err);
                    }
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
