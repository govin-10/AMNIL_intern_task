import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import searchReducer from './features/products/searchSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
