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
      query: (slug) => `/sub-categories?filters[slug]=${slug}&populate=*`
    }),
  }),
});

const featureProductsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureProducts: builder.query({
      query: () => `/products?populate=*`
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
export const { useGetProductsQuery } = productsApi;
export const { useGetFeatureProductsQuery } = featureProductsApi;

export default categoriesApi;
