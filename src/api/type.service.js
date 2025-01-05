import apiClient from './config/apiClient';

export const getSubtypesByTypeCode = async (typeCode) => {
  const response = await apiClient.get(`/type/${typeCode}`, {
    headers: {
      'Auth-Required': true,
    },
  });
  return response.data;
};

export const getSubtypeId = async (typeCode, subtypeValue) => {
  const response = await apiClient.get(
    `/type/subtype/${typeCode}/${subtypeValue}`,
    {
      headers: {
        'Auth-Required': true,
      },
    }
  );
  return response.data;
};
