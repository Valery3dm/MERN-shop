import { api } from './api';
import { URLs } from '../../constants';
import { OrderResponse, OrderState, CreateOrderResponse } from '../../interfaces';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<CreateOrderResponse, OrderState>({
      query: (order) => ({
        url: URLs.ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails: build.query<OrderResponse, string | undefined>({
      query: (orderId: string = '') => ({
        url: `${URLs.ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: build.mutation<any, { orderId: string; details: any }>({
      query: ({ orderId, details }) => ({
        url: `${URLs.ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
    getPayPalClientId: build.query({
      query: () => ({
        url: URLs.PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders: build.query({
      query: () => ({
        url: `${URLs.ORDERS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: build.query({
      query: () => ({
        url: URLs.ORDERS_URL
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: build.mutation({
      query: (orderId) => ({
        url: `${URLs.ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useGetMyOrdersQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation,
} = ordersApi;
