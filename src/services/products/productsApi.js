import apiSlice from '../../redux/features/api/apiSlice';

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (slug) =>
        `/products?filters[sub_category][slug][$eq]=${slug}&populate=*`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
