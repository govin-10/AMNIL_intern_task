import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {filterData} from '../../../utils/cartDataFilter/cartDataFilter';
import axios from 'axios';

interface cartState {
  cart: any[];
  cartTotalPrice: number;
  cartLoading: boolean;
  cartError: string | null;
}

// export const fetchCartById = createAsyncThunk(
//   '/fetchCartById',
//   async (id: number, {rejectWithValue}) => {
//     try {
//       const cartsData = await api.get(`/carts/user/${id}`);
//       if (cartsData.data.carts.products) {
//         return {
//           cartProducts: cartsData.data.carts.products,
//           cartTotal: cartsData.data.carts.total,
//         };
//       } else return;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         return rejectWithValue({
//           message: error.message,
//           status: error.response?.status || 'Unknown status',
//         });
//       }
//       return rejectWithValue({message: 'An unknown error occurred'});
//     }
//   },
// );

const initialState: cartState = {
  cart: [],
  cartTotalPrice: 0,
  cartLoading: false,
  cartError: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const {product, quantity} = action.payload;

      const cartData = filterData(product, quantity);

      const cartItem = state.cart.find(item => item?.id === cartData.id);

      if (cartItem) {
        const oldtotal = cartItem.total;
        cartItem.quantity += cartData.quantity;
        cartItem.total += cartData.total;
        cartItem.discountedTotal += cartData.discountedTotal;
        state.cartTotalPrice =
          state.cartTotalPrice - oldtotal + cartItem.discountedTotal;
      } else {
        state.cart.push(cartData);
        state.cartTotalPrice += cartData.discountedTotal;
      }
    },
    increaseCart(state, action) {
      // console.log(action.payload);
      const {id, stock, quantity} = action.payload;
      const cartItem = state.cart.find(item => item.id === id);
      if (cartItem.quantity >= 10) return;
      cartItem.stock -= 1;
      cartItem.quantity += 1;
    },
    decreaseCart(state, action) {
      // console.log(action.payload);
      const {id, stock, quantity} = action.payload;
      const cartItem = state.cart.find(item => item.id === id);
      if (cartItem.quantity === 1) return;
      cartItem.stock += 1;
      cartItem.quantity -= 1;
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(fetchCartById.pending, (state, action) => {
  //     state.cartLoading = true;
  //   });
  //   builder.addCase(fetchCartById.fulfilled, (state, action) => {
  //     if (action.payload) {
  //       const {cartProducts, cartTotal} = action.payload;
  //       state.cart = cartProducts;
  //       state.cartTotalPrice = cartTotal;
  //       state.cartLoading = false;
  //     }
  //   });
  //   builder.addCase(fetchCartById.rejected, (state, action) => {
  //     state.cartError = action.payload as string;
  //     state.cartLoading = false;
  //   });
  //   // builder.addCase(addtoCart.pending, (state, action) => {
  //   //   state.loading = true;
  //   // });
  //   // builder.addCase(addtoCart.fulfilled, (state, action) => {
  //   //   const {cartProducts, cartTotal} = action.payload;
  //   //   state.cart = cartProducts;
  //   //   state.cartTotalPrice = cartTotal;
  //   //   state.loading = false;
  //   // });
  //   // builder.addCase(addtoCart.rejected, (state, action) => {
  //   //   state.error = action.payload as string;
  //   //   state.loading = false;
  //   // });
  // },
});

export default cartSlice.reducer;
export const {addToCart, increaseCart, decreaseCart} = cartSlice.actions;
