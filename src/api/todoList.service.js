import apiClient from './config/apiClient';

export const sortTodoList = async (todoListId, body) => {
  await apiClient.put(`/todo-list/${todoListId}/sort`, body, {
    headers: {
      'Auth-Required': true,
    },
  });
};
