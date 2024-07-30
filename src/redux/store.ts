import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import searchReducer from './features/products/searchSlice';
import productReducer from './features/products/productSlice';
import categoryReducer from './features/products/categorySlice';
import todoReducer from './features/todo/todoSlice';
import mypostReducer, {feedpostReducer} from './features/post/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    product: productReducer,
    category: categoryReducer,
    todo: todoReducer,
    mypost: mypostReducer,
    feedpost: feedpostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
