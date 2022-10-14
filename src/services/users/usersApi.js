import apiSlice from "../../redux/features/api/apiSlice";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    users: builder.query({
      query: () => "/users",
      keepUnusedDataFor: 10,
    }),
  }),
});

export const { useUsersQuery } = usersApi;
export default usersApi;
