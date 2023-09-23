import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AddPostForm from '../../components/AddPostForm';
import { singlePostByUser } from '../../api/postsData';

export default function EditPost() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  console.warn('EDITITEM: ', editItem);
  useEffect(() => {
    singlePostByUser(id).then((data) => setEditItem(data[0]));
  }, [id]);

  return (<AddPostForm obj={editItem} />);
}
