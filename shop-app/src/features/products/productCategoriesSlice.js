import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCategories: [],
  error: null,
  loading: false,
};

const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {
    fetchProductCategoriesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductCategoriesSuccess: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.productCategories = payload;
    },
    fetchProductCategoriesFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
  selectors: {
    getProductCategories: (state) => state,
  },
});

export const {
  fetchProductCategoriesRequest,
  fetchProductCategoriesSuccess,
  fetchProductCategoriesFailure,
} = productCategoriesSlice.actions;

export const { getProductCategories } = productCategoriesSlice.selectors;
export default productCategoriesSlice.reducer;
