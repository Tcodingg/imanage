import { combineReducers, configureStore } from '@reduxjs/toolkit';
import employeesSlice from './employeesSlice';
import editSlice from './editSlice';
import authSlice from './authSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};
let rootReducer = combineReducers({
  employeesSlice,
  editSlice,
  authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persisterStore = persistStore(store);
