import React, { useState, useEffect } from 'react';
import { getAllTags } from '../api/tagsData';
import ListComponent from '../components/ListComponent';
import LabelForm from '../components/LabelForm';

export default function TagManagerPage() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags().then((data) => setTags(data));
  }, []);

  console.warn('TAGS: ', tags);
  return (
    <div>
      <h1 className="py-3">Tags</h1>
      <div className="d-flex gap-5">
        <div className="w-50">
          <ListComponent arr={tags} />
        </div>
        <div className="w-50">
          <LabelForm type="tag" />
        </div>
      </div>

    </div>
  );
}
