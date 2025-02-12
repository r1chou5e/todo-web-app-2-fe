import apiClient from './config/apiClient';
import { getEmail } from './config/storageManager';

export const registerUser = async (email, password, username) => {
  await apiClient.post('/auth/register', {
    email,
    password,
    username,
  });
};

export const loginUser = async (email, password) => {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const verifyAccount = async (token) => {
  await apiClient.post(`/auth/verify?token=${token}`);
};

export const logoutUser = async () => {
  const email = getEmail();
  await apiClient.put(
    '/auth/logout',
    {
      email,
    },
    {
      headers: {
        'Auth-Required': true,
      },
    }
  );
};
