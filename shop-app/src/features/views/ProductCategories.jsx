import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';
import { useQuery } from '@tanstack/react-query';

const fetchCategories = async () => {
  await new Promise(res => setTimeout(res, 300));
  return [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' }
  ];
};

export default function ProductCategories() {
  const dispatch = useDispatch();
  const { data: categories = [], isLoading } = useQuery(['categories'], fetchCategories);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Product Categories</h2>
      <button onClick={() => dispatch(logout())}>Logout</button>
      {isLoading ? <p>Loading...</p> : (
        <ul>
          {categories.map(cat => (
            <li key={cat.id}>
              <Link to={`/categories/${cat.id}/products`}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
