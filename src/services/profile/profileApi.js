import apiSlice from '../../redux/features/api/apiSlice';
import { updateUserState } from '../../redux/features/auth/authSlice';

const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/users/me',
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: payload,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const updatedUser = await queryFulfilled;
          dispatch(updateUserState(updatedUser?.data));
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;

export default profileApi;
