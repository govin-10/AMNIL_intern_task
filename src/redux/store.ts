import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import searchReducer from './features/products/search/searchSlice';
import productReducer from './features/products/product/productSlice';
import categoryReducer from './features/products/category/categorySlice';
import todoReducer from './features/todo/todoSlice';
import mypostReducer, {feedpostReducer} from './features/post/postSlice';
import userReducer from './features/user/userSlice';
import cartReducer from './features/cart/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    product: productReducer,
    category: categoryReducer,
    todo: todoReducer,
    mypost: mypostReducer,
    feedpost: feedpostReducer,
    user: userReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
