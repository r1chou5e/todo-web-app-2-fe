import axios from 'axios';
import { getAccessToken } from './tokenManager';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const isSecure = config?.headers?.['Auth-Required'];
    if (isSecure) {
      const accessToken = getAccessToken();
      if (accessToken) {
        config.headers.Authorization = accessToken;
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

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response) {
      const { status, data } = response;

      const customError = {
        status,
        message: data?.message || 'An error occurred.',
      };

      switch (status) {
        case 400:
          throw new Error(
            JSON.stringify({ ...customError, type: 'Bad Request' })
          );
        case 401:
          window.location.href = '/login';
          throw new Error(
            JSON.stringify({ ...customError, type: 'Unauthorized' })
          );
        case 403:
          throw new Error(
            JSON.stringify({ ...customError, type: 'Forbidden' })
          );
        case 404:
          throw new Error(
            JSON.stringify({ ...customError, type: 'Not Found' })
          );
        case 500:
          throw new Error(
            JSON.stringify({ ...customError, type: 'Internal Server Error' })
          );
        case 503:
          throw new Error(
            JSON.stringify({ ...customError, type: 'Service Unavailable' })
          );
        default:
          throw new Error(
            JSON.stringify({ ...customError, type: 'Unexpected Error' })
          );
      }
    } else {
      throw new Error(
        JSON.stringify({
          message: error.message || 'Network error occurred.',
          type: 'Network Error',
        })
      );
    }
  }
);

export default apiClient;
