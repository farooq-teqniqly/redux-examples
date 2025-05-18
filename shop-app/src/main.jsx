import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./features/views/Login";
import ProductCategories from "./features/views/ProductCategories";
import ProductsInCategory from "./features/views/ProductsInCategory";
import { useSelector } from "react-redux";
import { getAuth } from "./features/auth/authSlice";
import PropTypes from "prop-types";

const queryClient = new QueryClient();

function RequireAuth({ children }) {
  const { accessToken } = useSelector(getAuth);
  return accessToken ? children : <Navigate to="/" replace />;
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/categories"
        element={
          <RequireAuth>
            <ProductCategories />
          </RequireAuth>
        }
      />
      <Route
        path="/categories/:categorySlug/products"
        element={
          <RequireAuth>
            <ProductsInCategory />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
