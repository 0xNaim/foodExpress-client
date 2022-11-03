import apiSlice from '../../redux/features/api/apiSlice';

const featureProductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureProducts: builder.query({
      query: (filter) => `/products?filters[variant][$eq]=${filter}&populate=*`,
    }),
  }),
});

export const { useGetFeatureProductsQuery } = featureProductsApi;
