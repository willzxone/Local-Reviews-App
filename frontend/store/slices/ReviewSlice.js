import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stars: "",
  title: "",
  comment: "",
};

const ReviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setStars(state, action) {
      state.stars = action.payload;
    },
    setTitle(state, action) {
      state.title = action.payload;
    },
    setComment(state, action) {
      state.comment = action.payload;
    },

    setInitialState(state, action) {
      state.stars = action.payload;
      state.title = action.payload;
      state.comment = action.payload;
    },
  },
});

export const reviewActions = ReviewSlice.actions;

export default ReviewSlice;
