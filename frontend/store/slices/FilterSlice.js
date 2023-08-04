import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  price: "",
  numReviews: "",
  avgReviews: "",
  stars: "",
};

const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setPrice(state, action) {
      state.price = action.payload;
    },
    setNumReviews(state, action) {
      state.numReviews = action.payload;
    },
    setAvgReviews(state, action) {
      state.avgReviews = action.payload;
    },
    setStars(state, action) {
      state.stars = action.payload;
    },

    setInitialState(state, action) {
      state.price = action.payload;
      state.numReviews = action.payload;
      state.avgReviews = action.payload;
    },
  },
});

export const filterActions = FilterSlice.actions;

export default FilterSlice;
