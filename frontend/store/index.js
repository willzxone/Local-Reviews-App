import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import FilterSlice from "./slices/FilterSlice";
import ReviewSlice from "./slices/ReviewSlice";
import AuthSlice from "./slices/AuthSlice";
import RegisterSlice from "./slices/RegisterSlice";
// export const store = configureStore({
//   reducer: { auth: AuthSlice.reducer, sidebar: sideBarSlice.reducer },
// });

const makeStore = () =>
  configureStore({
    reducer: {
      filter: FilterSlice.reducer,
      review: ReviewSlice.reducer,
      auth: AuthSlice.reducer,
      register: RegisterSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
