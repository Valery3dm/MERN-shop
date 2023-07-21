import { api } from './api';
import { URLs } from '../../constants';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${URLs.USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: build.mutation({
      query: (data) => ({
        url: `${URLs.USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `${URLs.USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: build.mutation({
      query: (data) => ({
        url: `${URLs.USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: build.query({
      query: () => ({
        url: URLs.USERS_URL,
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
} = usersApi;
