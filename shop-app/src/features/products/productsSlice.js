import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: null,
  error: null,
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, { payload: { products } }) => {
      state.loading = false;
      state.error = null;
      state.products = products;
    },
    fetchProductsFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
  selectors: {
    getProducts: (state) => state,
  },
});

export const { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } =
  productsSlice.actions;

export const { getProducts } = productsSlice.selectors;
export default productsSlice.reducer;
