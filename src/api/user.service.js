import apiClient from './config/apiClient';

export const getUserProfileByAccessToken = async (accessToken) => {
  const response = await apiClient.get(`/user/${accessToken}`);
  return response.data;
};
