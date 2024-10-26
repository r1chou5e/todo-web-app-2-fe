import axios from 'axios';

const baseUrl = 'http://localhost:8081';

export const registerUser = async (email, password, username) => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/register`, {
      email,
      password,
      username,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
