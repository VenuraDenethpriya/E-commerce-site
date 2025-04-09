/*export const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      "Something went wrong with fetching products, refresh the page"
    );
  }
};

export const getCategory = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(
      "Something went wrong with fetching categories, refresh the page"
    );
  }
};
*/

// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    credentials: "include",
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      console.log("Token:", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCategories: builder.query({
      query: () => `categories`,
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`,
    }),
    getOrdersByUser: builder.query({
      query: (userId) => `orders/user/${userId}`,
    }),
    getOrders: builder.query({
      query: () => `orders`,
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: `products`,
        method: "POST",
        body,
      }),
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: `orders`,
        method: "POST",
        body,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "users",
        credentials: "include",
      }),
    }),
    updateOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `orders/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    getCheckoutSessionStatus: builder.query({
      query: (sessionId) => `payments/session-status?session_id=${sessionId}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetProductQuery,
  useGetOrdersByUserQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetUsersQuery,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useGetCheckoutSessionStatusQuery,
} = Api;
