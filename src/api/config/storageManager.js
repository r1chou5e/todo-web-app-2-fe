const TOKEN_KEY = 'access_token';
const EMAIL = 'email';

export const getAccessToken = () => localStorage.getItem(TOKEN_KEY);

export const getRawAccessToken = () => {
  const token = getAccessToken();
  return token ? token.split(' ')[1] : '';
};

export const setAccessToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getEmail = () => localStorage.getItem(EMAIL);

export const setEmail = (email) => {
  localStorage.setItem(EMAIL, email);
};

export const removeEmail = () => {
  localStorage.removeItem(EMAIL);
};
