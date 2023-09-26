import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddPostForm from '../../components/AddPostForm';
import { singlePostByUser } from '../../api/postsData';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  console.warn('ID: ', id);
  useEffect(() => {
    singlePostByUser(id).then((data) => setEditItem(data));
  }, []);

  return (<AddPostForm obj={editItem} />);
}
