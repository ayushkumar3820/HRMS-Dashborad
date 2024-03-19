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

    // Get Sales Data
    getSales: builder.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),

    // Get Daily Sales Data
    getDailySales: builder.query({
      query: ({ startDate, endDate }) => ({
        url: "sales/sales/daily",
        method: "GET",
        params: { startDate, endDate },
      }),
      providesTags: ["dailySales"],
    }),

    // Get Monthly Sales Data
    getMonthlySales: builder.query({
      query: () => "sales/sales/monthly",
      providesTags: ["monthlySales"],
    }),

    // Get List of Admins
    getAdmins: builder.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),

    // Get List of Affiliate Sales
    getUserPerformance: builder.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),

    // Get Dashboard Data
    getDashboard: builder.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetDailySalesQuery,
  useGetMonthlySalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = adminApi;
