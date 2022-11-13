import apiSlice from '../../redux/features/api/apiSlice';

const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Order'],
    }),
    getOrders: builder.query({
      query: () => '/users/me?populate=orders',
      providesTags: ['Order'],
    }),
    getOrderByOrderId: builder.query({
      query: (orderId) =>
        `/orders?filters[order_id][$eq]=${orderId}&populate=*`,
    }),
  }),

  overrideExisting: true,
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByOrderIdQuery,
} = orderApi;
export default orderApi;
