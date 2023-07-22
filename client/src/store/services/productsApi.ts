import { api } from './api';

import { URLs } from '../../constants';

import {
  PaginatedProductResponse,
  Product,
  UpdateProductBody,
  UploadImageResponse,
} from '../../interfaces';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<PaginatedProductResponse, {keyword?: string,  pageNumber?: number}>({
      query: ({keyword = '', pageNumber = 1}) => ({
        url: URLs.PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
        }
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
    uploadProductImage: build.mutation<UploadImageResponse, FormData>({
      query: (data) => ({
        url: URLs.UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
    deleteProduct: build.mutation<Product, string>({
      query: (productId) => ({
        url: `${URLs.PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    createReview: build.mutation<Product, any>({
      query: (data) => ({
        url: `${URLs.PRODUCTS_URL}/${data.productId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),
    getTopProducts: build.query<Product[], void>({
      query: () => ({
        url: `${URLs.PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery
} = productsApi;
