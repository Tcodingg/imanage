import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from './employeesSlice';
import editSlice from './editSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    employeesSlice,
    editSlice,
    authSlice,
  },
});

export default store;
