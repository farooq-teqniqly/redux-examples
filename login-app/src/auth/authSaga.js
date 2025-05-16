import { takeLatest, put, call } from "redux-saga/effects";
import { loginUser, loginUserSuccess, loginUserFailure } from "./authSlice";
import { authenticateUser } from "./authApi";

function* handleLogin(action) {
  try {
    const user = yield call(authenticateUser, action.payload);
    yield put(loginUserSuccess(user));
  } catch (error) {
    yield put(loginUserFailure(error.message));
  }
}

export function* authSaga() {
  try {
    yield takeLatest(loginUser.type, handleLogin);
  } catch (error) {
    console.error("Error in root saga:", error);
  }
}
