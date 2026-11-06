/* eslint-disable @typescript-eslint/no-explicit-any */
import apiSlice from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitLogin: builder.mutation<TLoginResponse, TLoginSchema>({
      query: (form_data) => ({
        url: "/auth/login",
        method: "POST",
        body: form_data,
      }),
    }),
    submitForgotPassword: builder.mutation<
      TResponse<null>,
      TForgotPasswordFormValues
    >({
      query: (form_data) => ({
        url: "/auth/forgotPassword",
        method: "POST",
        body: form_data,
      }),
    }),
    resetPassword: builder.mutation<TResponse<null>, TResetPasswordSchema>({
      query: (form_data) => ({
        url: "/auth/resetPassword",
        method: "POST",
        body: form_data,
      }),
    }),
    changePassword: builder.mutation<TResponse<any>, TChangePasswordFormValues>(
      {
        query: (form_data) => ({
          url: "/auth/changePassword",
          method: "POST",
          body: form_data,
        }),
      },
    ),
  }),
});

export const {
  useSubmitLoginMutation,
  useSubmitForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
