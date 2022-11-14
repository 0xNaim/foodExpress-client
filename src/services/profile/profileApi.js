import apiSlice from '../../redux/features/api/apiSlice';

const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/users/me',
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;

export default profileApi;
