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

export interface UpdateProductBody {
  _id?: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
  description: string;
}

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

export interface CartState {
  cartItems: ProductQty[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export interface OrderState {
  orderItems: ProductQty[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export interface UserResponse {
  email: string;
  name: string;
  _id: string;
}

export interface OrderResponse extends OrderState {
  _id: string;
  user: UserResponse;
  isPaid: Boolean;
  isDelivered: Boolean;
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date;
  deliveredAt: Date;
}
