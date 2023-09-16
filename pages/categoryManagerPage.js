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

      <div>
        <table style={{ fontSize: '16px' }}>
          {categories.map((category) => <tr style={{ border: '2px solid black', textAlign: 'center' }}><td className="p-2 w-25">{category.label}</td></tr>)}
        </table>
      </div>
    </div>
  );
}
