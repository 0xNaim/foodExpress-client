import apiSlice from '../../redux/features/api/apiSlice';

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreateOrderMutation } = orderApi;
export default orderApi;
