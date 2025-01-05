import apiClient from './config/apiClient';

export const createNewTask = async (body) => {
  await apiClient.post(`/task`, body, {
    headers: {
      'Auth-Required': true,
    },
  });
};
