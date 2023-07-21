import { api } from './api';

import { URLs } from '../../constants';

import { Product, UpdateProductBody } from '../../interfaces';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => ({
        url: URLs.PRODUCTS_URL,
      }),
      providesTags: ['Products'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: build.query<Product, string | undefined>({
      query: (productId: string = '') => ({
        url: `${URLs.PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: build.mutation<Product, string | undefined>({
      query: () => ({
        url: URLs.PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: build.mutation<Product, UpdateProductBody>({
      query: (data) => ({
        url: `${URLs.PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    uploadProductImage: build.mutation<any, FormData>({
      query: (data) => ({
        url: URLs.UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation
} = productsApi;
