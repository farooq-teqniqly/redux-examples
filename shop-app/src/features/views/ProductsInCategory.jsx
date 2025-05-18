import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../auth/authSlice";
import { fetchProductsRequest, getProducts } from "../products/productsSlice";

export default function ProductsInCategory() {
  const { categorySlug } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(getProducts);

  useEffect(() => {
    dispatch(fetchProductsRequest({ category: categorySlug }));
  }, [dispatch, categorySlug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!products) return <p>No products found</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Products in Category {categorySlug}</h2>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <ul>
        {products?.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
