import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import searchReducer from './features/products/searchSlice';
import productReducer from './features/products/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
