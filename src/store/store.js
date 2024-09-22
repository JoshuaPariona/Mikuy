import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/authSlice";
import { recipeApi } from "../services/recipe";
import { userApi } from "../services/user";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [recipeApi.reducerPath]: recipeApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware, userApi.middleware),
});

setupListeners(store.dispatch);

export default store;