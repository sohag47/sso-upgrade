/* eslint-disable @typescript-eslint/no-explicit-any */
import apiSlice from "../apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboard: builder.query<TDashboard, void>({
      query: () => "/data/GetDashboard",
      providesTags: ["Dashboard"],
      // keepUnusedDataFor: REVALIDATE.THIRTY_SECONDS,
    }),
    getUsers: builder.query<TPagination<TUserList>, TQueryParams>({
      query: (params) => ({
        url: "/data/GetUsers",
        params,
      }),
      providesTags: ["Users"],
      // keepUnusedDataFor: REVALIDATE.THIRTY_SECONDS,
    }),

    getDepartments: builder.query<{ label: string; value: string }[], void>({
      query: () => ({
        url: "/department/GetAll",
      }),
      transformResponse: (response: TResponse<any[]>) => {
        const data = Array.isArray(response) ? response : response?.data || [];
        return data.map((item: any) => ({
          label: item.department,
          value: `${item.id}`,
        }));
      },
      providesTags: ["Department"],
      // keepUnusedDataFor: REVALIDATE.TWO_MINUTES,
    }),
    getOffices: builder.query<{ label: string; value: string }[], void>({
      query: () => ({
        url: "/office/GetAll",
      }),
      transformResponse: (response: TResponse<any[]>) => {
        const data = Array.isArray(response) ? response : response?.data || [];
        return data.map((item: any) => ({
          label: item.office,
          value: `${item.id}`,
        }));
      },
      providesTags: ["Office"],
      // keepUnusedDataFor: REVALIDATE.TWO_MINUTES,
    }),
    getReport: builder.query<TPagination<TReport>, any>({
      query: (data) => ({
        url: "/data/GetData",
        params: data,
      }),
      providesTags: ["Reports"],
      // keepUnusedDataFor: REVALIDATE.THIRTY_SECONDS,
    }),
    syncData: builder.mutation<any, void>({
      query: () => ({
        url: "/usersync/SyncData",
      }),
      invalidatesTags: ["Users", "Dashboard", "Reports"],
    }),

    // system user
    getSystemUsers: builder.query<TSystemUser[], void>({
      query: () => ({
        url: "/user/GetAll",
      }),
      providesTags: ["SystemUsers"],
      // keepUnusedDataFor: REVALIDATE.THIRTY_SECONDS,
    }),
    getSystemUsersById: builder.query<any, { id: number }>({
      query: (id) => ({
        url: "/user/GetById",
        params: {
          id,
        },
      }),
      providesTags: ["SystemUsers"],
      // keepUnusedDataFor: REVALIDATE.THIRTY_SECONDS,
    }),
    createSystemUsers: builder.mutation<any, TSystemUserSchema>({
      query: (data) => ({
        url: "/user/Create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SystemUsers"],
    }),
    updateSystemUsers: builder.mutation<any, TSystemUserUpdateSchema>({
      query: (data) => ({
        url: "/user/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SystemUsers"],
    }),
    deleteSystemUsers: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: "/user/Delete",
        method: "DELETE",
        params: {
          id,
        },
      }),
      invalidatesTags: ["SystemUsers"],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetUsersQuery,
  useGetDepartmentsQuery,
  useGetOfficesQuery,
  useGetReportQuery,
  useLazyGetReportQuery,
  useSyncDataMutation,
  // system users
  useGetSystemUsersQuery,
  useGetSystemUsersByIdQuery,
  useCreateSystemUsersMutation,
  useUpdateSystemUsersMutation,
  useDeleteSystemUsersMutation,
} = usersApi;
