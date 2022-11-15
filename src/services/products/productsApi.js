import apiSlice from '../../redux/features/api/apiSlice';

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureProducts: builder.query({
      query: (filter) => `/products?filters[variant][$eq]=${filter}&populate=*`,
    }),
    getProducts: builder.query({
      query: ({ slug, page, filterPrice, sortOrder, searchTerm }) =>
        `/products?filters[sub_category][slug][$eq]=${slug}&filters[sellPrice][$lte]=${filterPrice}&filters[title][$containsi]=${searchTerm}&sort[0]=sellPrice:${sortOrder}&pagination[page]=${page}&pagination[pageSize]=8&populate=*`,
    }),
    getProduct: builder.query({
      query: (slug) => `/products?filters[slug][$eq]=${slug}&populate=*`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetFeatureProductsQuery,
  useGetProductsQuery,
  useGetProductQuery,
} = productsApi;
