import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {ProductType} from '../../../types';
import axios from 'axios';

interface productCategoryState {
  product: {[key: string]: ProductType[]};
  categoryLoading: boolean;
  categoryError: string | null;
}

const initialState: productCategoryState = {
  product: {},
  categoryLoading: false,
  categoryError: null,
};

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
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.message,
          status: error.response?.status || 'Unknown status',
        });
      }
      return rejectWithValue({message: 'An unknown error occurred'});
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProductsByCategory.pending, state => {
      state.categoryLoading = true;
    });
    builder.addCase(
      fetchProductsByCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.categoryError = action.payload;
        state.categoryLoading = false;
      },
    );
    builder.addCase(
      fetchProductsByCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        const {category, products} = action.payload;
        state.product[category] = products;
        state.categoryLoading = false;
      },
    );
  },
});

export default categorySlice.reducer;
