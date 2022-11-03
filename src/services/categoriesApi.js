import apiSlice from '../redux/features/api/apiSlice';

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories?populate=sub_categories',
    }),
  }),
});

const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (slug) => `/products?filters[sub_category][slug][$eq]=${slug}&populate=*`
    }),
  }),
});

const featureProductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureProducts: builder.query({
      query: (filter) => `/products?filters[variant][$eq]=${filter}&populate=*`
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
export const { useGetProductsQuery } = productsApi;
export const { useGetFeatureProductsQuery } = featureProductsApi;

export default categoriesApi;
