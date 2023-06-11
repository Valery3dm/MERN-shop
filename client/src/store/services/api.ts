import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { URLs } from '../../constants';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: URLs.BASE_URL }),
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: build => ({}),
});
