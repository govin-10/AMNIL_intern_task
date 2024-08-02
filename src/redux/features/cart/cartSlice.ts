import {createSlice} from '@reduxjs/toolkit';
import {filterData} from '../../../utils/cartDataFilter/cartDataFilter';

interface cartState {
  cart: any[];
  cartTotalPrice: number;
  cartLoading: boolean;
  cartError: string | null;
}

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

      //product ko sab data bata cart lai chaine data matrai filter gareko
      const cartData = filterData(product, quantity);

      //hamro cart ma selected product chha ki nai, check gareko
      const cartItem = state.cart.find(item => item?.id === cartData.id);

      //chha vane puranai data lai manipulate gareko
      if (cartItem) {
        const oldtotal = cartItem.total;
        cartItem.quantity += cartData.quantity;
        cartItem.total += cartData.total;
        cartItem.discountedTotal += cartData.discountedTotal;
        state.cartTotalPrice =
          state.cartTotalPrice - oldtotal + cartItem.discountedTotal;
      } else {
        //chhaina vane matra naya banaako
        state.cart.push(cartData);
        state.cartTotalPrice += cartData.discountedTotal;
      }
    },
    increaseCart(state, action) {
      const {id, stock, quantity} = action.payload;
      const cartItem = state.cart.find(item => item.id === id);
      if (stock <= 1) return;
      if (cartItem.quantity >= 10) return; //10 ota vandaa badi cart ma add garna napaune
      cartItem.stock -= 1;
      cartItem.quantity += 1;
    },
    decreaseCart(state, action) {
      const {id, stock, quantity} = action.payload;
      const cartItem = state.cart.find(item => item.id === id);
      if (cartItem.quantity === 1) return;
      cartItem.stock += 1;
      cartItem.quantity -= 1;
    },
    removeCart(state, action) {
      console.log(action.payload);
      const {id} = action.payload;

      state.cart = state.cart.filter(cartItem => cartItem.id !== id);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const {addToCart, increaseCart, decreaseCart, removeCart, clearCart} =
  cartSlice.actions;
