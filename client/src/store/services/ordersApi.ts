import { api } from './api';
import { URLs } from '../../constants';

export const ordersApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (order) => ({
        url: URLs.ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = ordersApi;
