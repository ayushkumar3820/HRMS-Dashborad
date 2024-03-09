import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserByIdQuery } = adminApi;
