import { all } from "redux-saga/effects";
import { authSaga } from "./auth/authSaga";
import { productsSaga } from "./products/productsSaga";

export function* rootSaga() {
  try {
    yield all([authSaga(), productsSaga()]);
  } catch (error) {
    console.error("Error in root saga:", error);
  }
}
