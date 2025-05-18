import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../auth/authSlice";
import {
  fetchProductCategoriesRequest,
  getProductCategories,
} from "../products/productCategoriesSlice";

export default function ProductCategories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductCategoriesRequest());
  }, [dispatch]);

  const { productCategories, loading, error } = useSelector(getProductCategories);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Product Categories</h2>
      <button onClick={() => dispatch(logout())}>Logout</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {productCategories.map((cat) => (
            <li key={cat.slug}>
              <Link to={`/categories/${cat.slug}/products`}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
