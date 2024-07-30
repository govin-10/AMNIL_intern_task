import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {ProductType} from '../../../types';

interface productCategoryState {
  product: {[key: string]: ProductType[]};
  loading: boolean;
  error: string | null;
}

const initialState: productCategoryState = {
  product: {},
  loading: false,
  error: null,
};

export const fetchProductsByCategory = createAsyncThunk(
  '/fetchByCategory',
  async (category: string, {rejectWithValue}) => {
    try {
      const productsByCategory = await api.get(
        `/products/category/${category}`,
      );
      const products = productsByCategory.data.products;
      //   console.log('pp', products);
      console.log(`${category}, products:${JSON.stringify(products)}`);
      return {category, products};
    } catch (error) {
      console.log(error);
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProductsByCategory.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchProductsByCategory.rejected,
      (state, action: PayloadAction<any>) => {
        state.error = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(
      fetchProductsByCategory.fulfilled,
      (state, action: PayloadAction<any>) => {
        const {category, products} = action.payload;
        state.product[category] = products;
        state.loading = false;
      },
    );
  },
});

export default categorySlice.reducer;
