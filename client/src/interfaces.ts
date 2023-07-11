export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
}

type Qty = {
  qty: number;
};

export type ProductQty = Product & Qty;

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CartState {
  cartItems: ProductQty[];
  shippingAddress: ShippingAddress,
  paymentMethod: string,
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}
