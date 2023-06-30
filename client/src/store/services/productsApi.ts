import { URLs } from '../../constants';
import { api } from './api';

import { Product } from '../../interfaces';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => ({
        url: URLs.PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: build.query<Product, string | undefined>({
      query: (productId: string = '') => ({
        url: `${URLs.PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApi;
