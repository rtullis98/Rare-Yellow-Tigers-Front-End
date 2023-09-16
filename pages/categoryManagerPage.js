import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../api/categoryData';

export default function CategoryManagerPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, []);

  console.warn('Categories: ', categories);
  return (
    <div>
      <h1 className="py-3">Categories</h1>
    </div>
  );
}
