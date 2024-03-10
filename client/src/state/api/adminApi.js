import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  endpoints: (builder) => ({
    // Get User Info
    getUserById: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),

    //Get List Of Products Width Statistics
    getProducts: builder.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),

    //Get list of Customers
    getCustomers: builder.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
} = adminApi;
