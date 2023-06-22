import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../utils/cartUtils';
import { CartState, ProductQty } from '../../interfaces';

const initialState: CartState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart') as string)
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item: ProductQty = action.payload;

      const existItem = state.cartItems.find((el) => el._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((el) =>
          el._id === existItem._id ? item : el,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
