import axios from 'axios';

export const refreshToken = async () => {
  try {
    const { data } = await axios.get('/api/auth/refresh');
    return true;
  } catch (error) {
    return false;
  }
};

// let getAccessToken = async () => {
//   try {
//     const { data } = await axios.get('/api/auth/refresh');
//     return data;
//   } catch (error) {
//     return error.message;
//   }
// };
