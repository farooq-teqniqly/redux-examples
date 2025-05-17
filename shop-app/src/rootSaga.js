import { all } from "redux-saga/effects";
import { watchAuthSagas } from "./features/auth/authSaga";

export function* rootSaga() {
  try {
    yield all([watchAuthSagas()]);
  } catch (error) {
    console.error("Error in root saga:", error);
  }
}
