import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {ProductType} from '../../../types';

interface ProductDetailState {
  product: ProductType[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
};

export const fetchProductsById = createAsyncThunk(
  '/fetchProducts/id',
  async (id: number, {rejectWithValue}) => {
    try {
      console.log('api hit...');
      const products = await api.get(`/products/${id}`);
      console.log(products.data);
      return products.data;
    } catch (error) {
      console.log(error);
      //   return rejectWithValue(error)
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateQuantity(state, action) {
      // state.product.
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchProductsById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.product = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(
      fetchProductsById.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(
      fetchProductsById.pending,
      (state, action: PayloadAction<any>) => {
        state.loading = true;
      },
    );
  },
});

export default productSlice.reducer;
