import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchProductsByCategory} from './categoryThunk';
import {ProductType} from '../../../../types';

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
