import { URLs } from '../../constants';
import { api } from './api';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${URLs.USERS_URL}/auth`,
        method: 'POST',
        body: data
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApi;
