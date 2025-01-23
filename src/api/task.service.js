import apiClient from './config/apiClient';

export const createNewTask = async (body) => {
  await apiClient.post(`/task`, body, {
    headers: {
      'Auth-Required': true,
    },
  });
};

export const getTasksByTodoListId = async (todoListId) => {
  const { data } = await apiClient.get(`/task/${todoListId}`, {
    headers: {
      'Auth-Required': true,
    },
  });
  return data;
};

export const updateTaskStatus = async (taskId, completed) => {
  await apiClient.put(
    `/task/${taskId}/status`,
    { completed },
    {
      headers: {
        'Auth-Required': true,
      },
    }
  );
};
