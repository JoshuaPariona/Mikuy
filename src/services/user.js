import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_DATABASE } from "../../FirebaseApp";
import AuthService from "../services/AuthServices";

const transformUser = (response) => {
  let transformedResponse = { ...response };
  transformedResponse.following = response.following
    ? Object.keys(response.following)
    : [];
  transformedResponse.createdRecipes = response.createdRecipes
    ? Object.keys(response.createdRecipes)
    : [];
  transformedResponse.markedRecipes = response.markedRecipes
    ? Object.keys(response.markedRecipes)
    : [];
  return transformedResponse;
};

export const userApi = createApi({
  reducerPath: "userApi",
  keepUnusedDataFor: 600,
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({ baseUrl: URL_DATABASE }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `/users/${userId}.json`,
      transformResponse: transformUser,
    }),
    getCurrentUser: builder.query({
      query: () => `/users/${AuthService.getCurrentAuthUser().uid}.json`,
      providesTags: ["user"],
      transformResponse: transformUser,
    }),
    // uid por parametro debido a la indisposicion de AuthService
    // en registro de usuario
    putUser: builder.mutation({
      query: ({ uid, idToken, user }) => ({
        url: `/users/${uid}.json?auth=${idToken}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    // se usa la llave para gaurdar el id, el valor es cualquiera,
    // true por convencion, facilita la convercion a array y evita duplicados
    putCreatedUserRecipe: builder.mutation({
      query: ({ id, idToken }) => ({
        url: `/users/${
          AuthService.getCurrentAuthUser().uid
        }/createdRecipes/${id}.json?auth=${idToken}`,
        method: "PUT",
        body: "true",
      }),
      invalidatesTags: ["user"],
    }),
    putMarkedUserRecipe: builder.mutation({
      query: ({ id, idToken }) => ({
        url: `/users/${
          AuthService.getCurrentAuthUser().uid
        }/markedRecipes/${id}.json?auth=${idToken}`,
        method: "PUT",
        body: "true",
      }),
      invalidatesTags: ["user"],
    }),
    deleteMarkedUserRecipe: builder.mutation({
      query: ({ id, idToken }) => ({
        url: `/users/${
          AuthService.getCurrentAuthUser().uid
        }/markedRecipes/${id}.json?auth=${idToken}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    patchUser: builder.mutation({
      query: ({ idToken, user }) => ({
        url: `/users/${
          AuthService.getCurrentAuthUser().uid
        }.json?auth=${idToken}`,
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  usePutUserMutation,
  usePutCreatedUserRecipeMutation,
  usePutMarkedUserRecipeMutation,
  useDeleteMarkedUserRecipeMutation,
  usePatchUserMutation
} = userApi;
