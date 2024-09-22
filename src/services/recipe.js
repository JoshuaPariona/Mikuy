import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_DATABASE } from "../../FirebaseApp";
import AuthService from "../services/AuthServices";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  keepUnusedDataFor: 600,
  tagTypes: ["recipe"],
  baseQuery: fetchBaseQuery({ baseUrl: URL_DATABASE }),
  endpoints: (builder) => ({
    getRecipeCategories: builder.query({
      query: () => "/categories.json",
      transformResponse: (response) => {
        return Object.entries(response).map(([id, value]) => ({
          id,
          ...value,
        }));
      },
    }),
    getRecipesGeneralIds: builder.query({
      query: () => "/recipes.json?shallow=true&limitToFirst=130",
      transformResponse: (response) => {
        return Object.keys(response || {});
      },
    }),
    getRecipesPopularIds: builder.query({
      query: () =>
        `/recipes.json?orderBy="rating/averageRating"&startAt=4.6&limitToFirst=10`,
      transformResponse: (response) => {
        return Object.keys(response || {});
      },
    }),
    getRecipesRecommendedIds: builder.query({
      query: () => `/recipes.json?shallow=true&limitToFirst=5`,
      transformResponse: (response) => {
        return Object.keys(response || {});
      },
    }),
    getRecipeById: builder.query({
      query: (recipeId) => `/recipes/${recipeId}.json`,
      providesTags: (_, __, recipeId) => [{ type: "recipe", id: recipeId }],
      transformResponse: (response) => {
        const procedures = response?.procedures
          ? Object.values(response.procedures)
          : [];

        procedures.forEach((procedure) => {
          procedure.children = procedure?.children
            ? Object.values(procedure.children)
            : [];
        });

        const rating = response?.rating || {};

        rating.individualRating = Object.entries(
          rating.individualRating || {}
        ).map(([id, review]) => ({
          id,
          ...review,
        }));

        let transformedRecipe = {
          ...response,
          images: response?.images ? Object.values(response.images) : [],
          ingredients: response?.ingredients
            ? Object.values(response.ingredients)
            : [],
          procedures: procedures,
          rating: rating,
        };

        return transformedRecipe;
      },
    }),
    getRecipesByCategoryId: builder.query({
      query: (categoryId) =>
        `/recipes.json?orderBy="categoryId"&equalTo="${categoryId}"`,
      transformResponse: (response) => {
        return Object.entries(response).map(([id, value]) => ({
          id,
          ...value,
        }));
      },
    }),
    putRecipe: builder.mutation({
      query: ({ recipe, id, idToken }) => {
        let duration = 0;
        recipe.procedures?.forEach((procedure) => {
          duration += procedure.duration ?? 0;
        });
        return {
          url: `/recipes/${id}.json?auth=${idToken}`,
          method: "PUT",
          body: {
            ...recipe,
            authorId: AuthService.getCurrentAuthUser().uid,
            createdAt: { ".sv": "timestamp" }, // server timestamp
            status: true,
            duration: duration,
          },
        };
      },
    }),
    postIndividualRecipeRating: builder.mutation({
      query: ({ recipeId, individualRating, idToken }) => ({
        url: `/recipes/${recipeId}/rating/individualRating.json?auth=${idToken}`,
        method: "POST",
        body: {
          ...individualRating, //rating and review
          authorId: AuthService.getCurrentAuthUser().uid,
          createdAt: { ".sv": "timestamp" },
        },
      }),
    }),
    // Esto deberia ser del lado del servidor y ejecutarse on postIndividualRecipeRating
    patchRecipeRating: builder.mutation({
      query: ({
        currentTotalRating,
        currentAveRating,
        lastRating,
        recipeId,
        idToken,
      }) => {
        const sumOfRatings = currentAveRating * currentTotalRating;
        const newSumOfRatings = sumOfRatings + lastRating;
        const newTotalRatings = currentTotalRating + 1;
        const newAverageRating = newSumOfRatings / newTotalRatings;
        return {
          url: `/recipes/${recipeId}/rating.json?auth=${idToken}`,
          method: "PATCH",
          body: {
            averageRating: newAverageRating,
            totalRating: { ".sv": { increment: 1 } },
          },
        };
      },
      invalidatesTags: (_, __, { recipeId }) => [
        { type: "recipe", id: recipeId },
      ],
    }),
  }),
});

export const {
  useGetRecipeCategoriesQuery,
  useGetRecipesByCategoryIdQuery,
  useGetRecipesGeneralIdsQuery,
  useGetRecipesRecommendedIdsQuery,
  useGetRecipesPopularIdsQuery,
  useGetRecipeByIdQuery,
  usePutRecipeMutation,
  usePostIndividualRecipeRatingMutation,
  usePatchRecipeRatingMutation,
} = recipeApi;
