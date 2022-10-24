import apiSlice from '../redux/features/api/apiSlice';

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories?populate=sub_categories',
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;

export default categoriesApi;
