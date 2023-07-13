import { api } from './api';
import { URLs } from '../../constants';
import { OrderResponse, OrderState } from '../../interfaces';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation<OrderResponse , OrderState>({
      query: (order) => ({
        url: URLs.ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails: build.query<OrderResponse , string | undefined>({
      query: (orderId: string = '') => ({
        url: `${URLs.ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery } = ordersApi;
