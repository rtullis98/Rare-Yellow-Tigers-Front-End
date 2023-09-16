import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../api/categoryData';
import ListComponent from '../components/ListComponent';
import LabelForm from '../components/LabelForm';

export default function CategoryManagerPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => setCategories(data));
  }, []);

  console.warn('Categories: ', categories);
  return (
    <div>
      <h1 className="py-3">Categories</h1>

      <div className="d-flex gap-5">
        <div className="w-50">
          <ListComponent arr={categories} />
        </div>
        <div className="w-50">

          <LabelForm />
        </div>
      </div>
    </div>
  );
}
