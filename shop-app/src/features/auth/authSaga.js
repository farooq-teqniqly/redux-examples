import { takeLatest, put, call } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";
import { authApi } from "./authApi";

function* fetchLoginRequestSaga({ payload }) {
  try {
    const user = yield call(authApi.loginUser, payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

export function* watchAuthSagas() {
  try {
    yield takeLatest(loginRequest.type, fetchLoginRequestSaga);
  } catch (error) {
    console.error("Error in auth saga:", error);
  }
}
