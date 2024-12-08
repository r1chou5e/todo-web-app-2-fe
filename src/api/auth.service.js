import apiClient from './config/apiClient';

export const registerUser = async (email, password, username) => {
  try {
    await apiClient.post('/auth/register', {
      email,
      password,
      username,
    });
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const verifyAccount = async (token) => {
  try {
    await apiClient.post('/auth/verify?token=${token}');
  } catch (error) {
    console.error(error);
  }
};
