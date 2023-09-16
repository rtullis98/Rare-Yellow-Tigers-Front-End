import React, { useState, useEffect } from 'react';
import { getAllTags } from '../api/tagsData';

export default function TagManagerPage() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllTags().then((data) => setTags(data));
  }, []);

  console.warn('TAGS: ', tags);
  return (
    <div>
      <h1 className="py-3">Tags</h1>
    </div>
  );
}
