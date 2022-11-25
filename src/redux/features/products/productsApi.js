import apiSlice from '../api/apiSlice';

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVariantProducts: builder.query({
      query: (variant) =>
        `/products?filters[variant][$eq]=${variant}&populate=*`,
    }),

    getFeatureProducts: builder.query({
      query: ({ variant, page, filterPrice, sortOrder, searchTerm }) =>
        `/products?filters[variant][$eq]=${variant}&filters[sellPrice][$lte]=${filterPrice}&filters[title][$containsi]=${searchTerm}&sort[0]=sellPrice:${sortOrder}&pagination[page]=${page}&pagination[pageSize]=8&populate=*`,
    }),

    getProductsByCategory: builder.query({
      query: ({ slug, page, filterPrice, sortOrder, searchTerm }) =>
        `/products?filters[sub_category][slug][$eq]=${slug}&filters[sellPrice][$lte]=${filterPrice}&filters[title][$containsi]=${searchTerm}&sort[0]=sellPrice:${sortOrder}&pagination[page]=${page}&pagination[pageSize]=8&populate=*`,
    }),

    getProducts: builder.query({
      query: ({ page, filterPrice, sortOrder, searchTerm }) =>
        `/products?filters[sellPrice][$lte]=${filterPrice}&filters[title][$containsi]=${searchTerm}&sort[0]=sellPrice:${sortOrder}&pagination[page]=${page}&pagination[pageSize]=8&populate=*`,
    }),

    getProduct: builder.query({
      query: (slug) => `/products?filters[slug][$eq]=${slug}&populate=*`,
    }),

    getDiscountProducts: builder.query({
      query: ({ page, filterPrice, sortOrder, searchTerm }) =>
        `/products?filters[discountPrice][$gt]=0&filters[discountPrice][$lte]=${filterPrice}&filters[title][$containsi]=${searchTerm}&sort[0]=discountPrice:${sortOrder}&pagination[page]=${page}&pagination[pageSize]=8&populate=*`,
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetVariantProductsQuery,
  useGetFeatureProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetDiscountProductsQuery,
} = productsApi;
