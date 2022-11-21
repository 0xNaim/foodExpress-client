import apiSlice from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (data) => ({
        url: '/auth/local/register',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.data.jwt,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags: ['Profile'],
    }),
    userLogin: builder.mutation({
      query: (data) => ({
        url: '/auth/local',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          dispatch(
            userLoggedIn({
              accessToken: result.data.jwt,
              user: result.data.user,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags: ['Profile'],
    }),
  }),
  overrideExisting: true,
});

export const { useUserRegisterMutation, useUserLoginMutation } = authApi;
export default authApi;
