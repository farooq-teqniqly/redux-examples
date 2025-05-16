import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './features/views/Login';
import ProductCategories from './features/views/ProductCategories';
import ProductsInCategory from './features/views/ProductsInCategory';
import { useSelector } from 'react-redux';

const queryClient = new QueryClient();

function RequireAuth({ children }) {
  const token = useSelector(state => state.auth.token);
  return token ? children : <Navigate to="/" replace />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/categories" element={
        <RequireAuth>
          <ProductCategories />
        </RequireAuth>
      } />
      <Route path="/categories/:categoryId/products" element={
        <RequireAuth>
          <ProductsInCategory />
        </RequireAuth>
      } />
    </Routes>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
