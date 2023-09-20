import React, { useState, useEffect } from 'react';
import { getAllTags } from '../api/tagsData';
import ListComponent from '../components/ListComponent';
import NewLableForm from '../components/NewLabelForm';

export default function TagManagerPage() {
  const [tags, setTags] = useState([]);

  const getTags = () => {
    getAllTags().then((data) => setTags(data));
  };

  useEffect(() => {
    getTags();
  }, []);

  const type = 'tag';

  return (
    <div>
      <h1 className="py-3">Tags</h1>
      <div className="d-flex gap-5">
        <div className="w-50">
          <table className="w-75" style={{ fontSize: '16px' }}>
            <tbody>
              {tags.map((tag) => (<ListComponent key={tag.id} item={tag.label} />))}
            </tbody>
          </table>
        </div>
        <div className="w-50">
          <NewLableForm onUpdate={getTags} type={type} />
        </div>
      </div>

    </div>
  );
}
