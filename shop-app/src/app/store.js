import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "../features/auth/authSlice";
import productCategoriesReducer from "../features/products/productCategoriesSlice";

import { rootSaga } from "../rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { auth: authReducer, productCategories: productCategoriesReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
