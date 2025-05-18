import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchProductCategoriesRequest,
  fetchProductCategoriesSuccess,
  fetchProductCategoriesFailure,
} from "./productCategoriesSlice";

import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } from "./productsSlice";

import { productApi } from "./productApi";

function* fetchProductCategoriesSaga({ payload }) {
  try {
    const productCategories = yield call(productApi.fetchProductCategories, payload);
    yield put(fetchProductCategoriesSuccess(productCategories));
  } catch (error) {
    yield put(fetchProductCategoriesFailure(error.message()));
  }
}

function* fetchProductsSaga({ payload }) {
  try {
    const products = yield call(productApi.fetchProducts, payload);
    yield put(fetchProductsSuccess(products));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* watchProductSagas() {
  try {
    yield takeLatest(fetchProductCategoriesRequest.type, fetchProductCategoriesSaga);
    yield takeLatest(fetchProductsRequest.type, fetchProductsSaga);
  } catch (error) {
    console.error("Error in product saga:", error);
  }
}
