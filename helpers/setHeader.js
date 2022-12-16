import axios from 'axios';

export const setHeader = async () => {
  let access_token = await getAccessToken();
  localStorage.set('access_token', access_token);
  return access_token;
};

let getAccessToken = async () => {
  try {
    const { data } = await axios.get('/api/auth/refresh');
    return data;
  } catch (error) {
    return error.message;
  }
};
