import axios from 'axios';
import { getAccessToken } from './tokenManager';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const isSecure = config?.headers?.['Auth-Required'];
    if (isSecure) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        window.location.href = '/login';
        return Promise.reject(new Error('No token available'));
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
