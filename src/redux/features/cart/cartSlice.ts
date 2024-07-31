import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {api} from '../../../utils';
import {filterData} from '../../../utils/cartDataFilter/cartDataFilter';

interface cartState {
  cart: any[];
  cartTotalPrice: number;
  loading: boolean;
  error: string | null;
}

export const fetchCartById = createAsyncThunk(
  '/fetchCartById',
  async (id: number, {rejectWithValue}) => {
    try {
      const cartsData = await api.get(`/carts/users/${id}`);
      return {
        cartProducts: cartsData.data.carts.products,
        cartTotal: cartsData.data.carts.total,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// export const addtoCart = createAsyncThunk(
//   '/addtoCart',
//   async ({userId, products}: cartItems, {rejectWithValue}) => {
//     try {
//       const cartsData = await api.post(`/carts/add`, {userId, products});
//       console.log(cartsData.data);

//       return {
//         cartProducts: cartsData.data.products,
//         cartTotal: cartsData.data.total,
//       };
//       // return cartsData.data.carts;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   },
// );

const initialState: cartState = {
  cart: [],
  cartTotalPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log(action.payload);
      const {product, quantity} = action.payload;
      // const {id, title, price, }
      const cartData = filterData(product, quantity);

      console.log(cartData);

      const cartItem = state.cart.find(item => item?.id === cartData.id);

      if (cartItem) {
        const oldtotal = cartItem.total;
        cartItem.quantity += cartData.quantity;
        cartItem.total += cartData.total;
        cartItem.discountedTotal += cartData.discountedTotal;
        state.cartTotalPrice = state.cartTotalPrice - oldtotal + cartItem.total;
      } else {
        state.cart = [...state.cart, cartData];
        state.cartTotalPrice += cartData.total;
      }

      console.log('cartItems', state.cart);
      console.log('cartTotalPrice', state.cartTotalPrice);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCartById.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCartById.fulfilled, (state, action) => {
      const {cartProducts, cartTotal} = action.payload;
      state.cart = cartProducts;
      state.cartTotalPrice = cartTotal;
      state.loading = false;
    });
    builder.addCase(fetchCartById.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = false;
    });
    // builder.addCase(addtoCart.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(addtoCart.fulfilled, (state, action) => {
    //   const {cartProducts, cartTotal} = action.payload;
    //   state.cart = cartProducts;
    //   state.cartTotalPrice = cartTotal;
    //   state.loading = false;
    // });
    // builder.addCase(addtoCart.rejected, (state, action) => {
    //   state.error = action.payload as string;
    //   state.loading = false;
    // });
  },
});

export default cartSlice.reducer;
export const {addToCart} = cartSlice.actions;
