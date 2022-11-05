import apiSlice from '../../redux/features/api/apiSlice';

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: (productId) => `/products/${productId}`,
    }),
  }),
});

export const { useGetProductQuery } = productApi;
