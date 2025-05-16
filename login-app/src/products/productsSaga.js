import { takeLatest, put, call } from "redux-saga/effects";
import {
  getProductCategories,
  getProductCategoriesSuccess,
  getProductCategoriesFailure,
} from "./productsSlice";
import { fetchProductCategories } from "./productsApi";

function* handleGetProductCategories() {
  try {
    const categories = yield call(fetchProductCategories);
    yield put(getProductCategoriesSuccess(categories));
  } catch (error) {
    yield put(getProductCategoriesFailure(error.message));
  }
}

export function* productsSaga() {
  try {
    yield takeLatest(getProductCategories.type, handleGetProductCategories);
  } catch (error) {
    console.error("Error in products saga:", error);
  }
}
