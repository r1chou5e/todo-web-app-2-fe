import axios from 'axios';

const baseUrl = 'http://localhost:8081';

export const registerUser = async (email, password, username) => {
  try {
    await axios.post(`${baseUrl}/api/auth/register`, {
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
    const response = await axios.post(`${baseUrl}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
