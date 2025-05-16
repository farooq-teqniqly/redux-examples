import { all } from "redux-saga/effects";
import { authSaga } from "./auth/authSaga";

export function* rootSaga() {
  try {
    yield all([authSaga()]);
  } catch (error) {
    console.error("Error in root saga:", error);
  }
}
