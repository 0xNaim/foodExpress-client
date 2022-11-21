import apiSlice from '../api/apiSlice';

const categoriesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories?populate=sub_categories',
    }),
  }),
  overrideExisting: true,
});

export const { useGetCategoriesQuery } = categoriesApi;
