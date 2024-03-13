import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  endpoints: (builder) => ({
    // Get user information by ID
    getUserById: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),

    // Get list of products with statistics
    getProducts: builder.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),

    // Get list of customers
    getCustomers: builder.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),

    // Get list of transactions
    getTransactions: builder.query({
      query: ({ sort, search }) => ({
        url: `client/transactions`,
        method: "GET",
        params: { sort, search },
      }),
      providesTags: ["Transactions"],
    }),

    // Get Geography Data
    getGeography: builder.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
} = adminApi;
