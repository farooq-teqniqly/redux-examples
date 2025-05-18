import { takeLatest, put, call } from "redux-saga/effects";
import {
  fetchProductCategoriesRequest,
  fetchProductCategoriesSuccess,
  fetchProductCategoriesFailure,
} from "./productCategoriesSlice";
import { productApi } from "./productApi";

function* fetchProductCategoriesSaga({ payload }) {
  try {
    const productCategories = yield call(productApi.fetchProductCategories, payload);
    yield put(fetchProductCategoriesSuccess(productCategories));
  } catch (error) {
    yield put(fetchProductCategoriesFailure(error.message()));
  }
}

export function* watchProductSagas() {
  try {
    yield takeLatest(fetchProductCategoriesRequest.type, fetchProductCategoriesSaga);
  } catch (error) {
    console.error("Error in product saga:", error);
  }
}
