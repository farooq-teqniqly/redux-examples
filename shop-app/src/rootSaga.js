import { all } from "redux-saga/effects";
import { watchAuthSagas } from "./features/auth/authSaga";
import { watchProductSagas } from "./features/products/productsSaga";

export function* rootSaga() {
  try {
    yield all([watchAuthSagas(), watchProductSagas()]);
  } catch (error) {
    console.error("Error in root saga:", error);
  }
}
