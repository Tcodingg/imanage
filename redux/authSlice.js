import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {
    id: '',
    name: '',
    email: '',
  },
  error: null,
};

export const login = createAsyncThunk('auth/login', async (body) => {
  try {
    const { data } = await axios.post('/api/auth/login', body);
    return data;
  } catch (error) {
    return error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    //LOGIN
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
