import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
  error: null,
  status: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductCategories(state) {
      state.status = "pending";
    },
    getProductCategoriesSuccess(state, action) {
      state.categories = action.payload;
      state.error = null;
      state.status = "complete";
    },
    getProductCategoriesFailure(state, action) {
      state.categories = null;
      state.error = action.payload;
      state.status = "failed";
    },
  },
  selectors: {
    getCategories: (state) => state.categories,
    getStatus: (state) => state.status,
    getError: (state) => state.error,
  },
});

export const { getProductCategories, getProductCategoriesSuccess, getProductCategoriesFailure } =
  productsSlice.actions;
export const { getCategories, getStatus, getError } = productsSlice.selectors;
export const productsReducer = productsSlice.reducer;
