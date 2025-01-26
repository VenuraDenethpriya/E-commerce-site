export const getProducts = async () => {
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
    )
  }
};


// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
    getCategories: builder.query({
      query: () => `categories`,
    }),
  }),
})

export const { useGetProductsQuery, useGetCategoriesQuery} = Api;