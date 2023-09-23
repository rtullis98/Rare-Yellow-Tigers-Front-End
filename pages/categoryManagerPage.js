import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../api/categoryData';
import ListComponent from '../components/ListComponent';
import NewLableForm from '../components/NewLabelForm';

export default function CategoryManagerPage() {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    getAllCategories().then((data) => setCategories(data));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const type = 'Category';

  return (
    <div>
      <h1 className="py-3">Categories</h1>

      <div className="d-flex gap-5 pt-3">
        <div className="w-50">
          <table className="w-75" style={{ fontSize: '16px' }}>
            <tbody>
              {categories.map((category) => (<ListComponent key={category.id} item={category.label} />))}
            </tbody>
          </table>
        </div>
        <div className="w-50">

          {/* <LabelForm type="category"/> */}
          <NewLableForm onUpdate={getCategories} type={type} />
        </div>
      </div>
    </div>
  );
}
