import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../../../utils';

export const fetchProductsByCategory = createAsyncThunk(
  '/fetchByCategory',
  async (category: string, {rejectWithValue}) => {
    try {
      const productsByCategory = await api.get(
        `/products/category/${category}?limit=10`,
      );
      const products = productsByCategory.data.products;

      return {category, products};
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   return rejectWithValue({
      //     message: error.message,
      //     status: error.response?.status || 'Unknown status',
      //   });
      // }
      return rejectWithValue({message: 'An unknown error occurred'});
    }
  },
);
