export interface Review {
  _id?: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

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
  reviews: Review[];
}

export interface PaginatedProductResponse {
  products: Product[];
  page: number;
  pages: number;
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

export interface OrderItemsResponse {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
  _id: string;
}

export interface CreateOrderResponse {
  brand: string;
  category: string;
  countInStock: number;
  createdAt: string;
  description: string;
  image: string;
  name: string;
  numReviews: number;
  price: number;
  rating: number;
  reviews: Review[];
  updatedAt: string;
  user: string;
  _id: string;
}

export interface OrderResponse {
  _id: string;
  user: UserResponse;
  orderItems: OrderItemsResponse[];
  isPaid: Boolean;
  isDelivered: Boolean;
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date;
  deliveredAt: Date;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number; 
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}  

export interface UploadImageResponse {
  image: string;
  message: string;
}
