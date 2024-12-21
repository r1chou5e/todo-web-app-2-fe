import apiClient from './config/apiClient';

export const getUserProfileByAccessToken = async () => {
  const response = await apiClient.get(`/user/get-profile-by-access-token`, {
    headers: {
      'Auth-Required': true,
    },
  });
  return response.data;
};
