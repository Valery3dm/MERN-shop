import { CartState } from "../interfaces";

export const addDecimals = (num: number) =>
  Number((Math.round(num * 100) / 100).toFixed(2));

export const updateCart = (state: CartState) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );
  // Calculate shipping price (if order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  // Calculate tax price (15% tax)
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));
  // Calculate total price
  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};