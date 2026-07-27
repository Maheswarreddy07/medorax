import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/modules/authentication/Login/store";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: import.meta.env.DEV,
});