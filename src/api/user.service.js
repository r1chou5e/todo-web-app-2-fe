import apiClient from './config/apiClient';

export const getUserProfileByAccessToken = async (accessToken) => {
  try {
    const response = await apiClient.get(`/user/${accessToken}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
