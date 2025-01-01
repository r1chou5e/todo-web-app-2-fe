import apiClient from './config/apiClient';

export const getSubtypesByTypeCode = async (typeCode) => {
  const response = await apiClient.get(
    `/type/get-subtypes-by-type-code/${typeCode}`,
    {
      headers: {
        'Auth-Required': true,
      },
    }
  );
  return response.data;
};
