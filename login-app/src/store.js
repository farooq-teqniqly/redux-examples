import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";
import { authReducer } from "./auth/authSlice";
import { productsReducer } from "./products/productsSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { auth: authReducer, products: productsReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
