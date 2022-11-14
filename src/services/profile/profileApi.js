import apiSlice from '../../redux/features/api/apiSlice';

const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/users/me',
      providesTags: ['Profile']
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;

export default profileApi;
