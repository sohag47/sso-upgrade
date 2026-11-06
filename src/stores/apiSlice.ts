import { baseUrl } from "@/utils/base-url";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api`,
  credentials: "include",
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    "Dashboard",
    "Users",
    "Office",
    "Department",
    "Reports",
    "SystemUsers",
  ],
  endpoints: () => ({}),
});

export default apiSlice;
