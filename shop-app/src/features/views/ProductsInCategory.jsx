import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';
import { useQuery } from '@tanstack/react-query';

const fetchProductsByCategory = async (categoryId) => {
  await new Promise(res => setTimeout(res, 300));
  const products = {
    '1': ['TV', 'Laptop'],
    '2': ['Shirt', 'Shoes']
  };
  return products[categoryId] || [];
};

export default function ProductsInCategory() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const { data: products = [], isLoading } = useQuery(['products', categoryId], () => fetchProductsByCategory(categoryId));

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Products in Category {categoryId}</h2>
      <button onClick={() => dispatch(logout())}>Logout</button>
      {isLoading ? <p>Loading...</p> : (
        <ul>
          {products.map((p, i) => <li key={i}>{p}</li>)}
        </ul>
      )}
    </div>
  );
}
