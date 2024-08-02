import {createAsyncThunk} from '@reduxjs/toolkit';
import {api} from '../../../../utils';

export const fetchProductsById = createAsyncThunk(
  '/fetchProducts/id',
  async (id: number, {rejectWithValue}) => {
    try {
      const products = await api.get(`/products/${id}`);

      return {product: products.data, stock: products.data.stock};
    } catch (error) {
      console.log(error);
      //   return rejectWithValue(error)
    }
  },
);
