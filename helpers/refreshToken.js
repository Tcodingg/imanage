import axios from 'axios';

export const refreshToken = async () => {
  try {
    const { data } = await axios.get('/api/auth/refresh');
    localStorage.setItem('isAuth', true);
    return true;
  } catch (error) {
    localStorage.setItem('isAuth', false);
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
