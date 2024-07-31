import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {ProductType} from '../../../types';

interface ProductDetailState {
  product: ProductType | null;
  stock: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  stock: 0,
  loading: false,
  error: null,
};

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

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increaseStock(state, action) {
      // state.product.
      if (action.payload == 1) return;

      state.stock += 1;
    },
    decreaseStock(state, action) {
      if (action.payload >= 10) return;
      state.stock -= 1;
    },
    resetProductState(state) {
      state.product = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      fetchProductsById.fulfilled,
      (state, action: PayloadAction<any>) => {
        const {product, stock} = action.payload;
        state.product = product;
        state.stock = stock;
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
export const {resetProductState, increaseStock, decreaseStock} =
  productSlice.actions;
