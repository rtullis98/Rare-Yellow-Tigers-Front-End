import React, { useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPostsByUser, deletePost } from '../api/postsData';
import PostGrid from '../components/PostGrid';

export default function MyPostsPage() {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState([]);
  let isAuthenticated = false;

  const getMyPosts = () => {
    getPostsByUser(user.id).then((data) => setMyPosts(data));
  };
  useState(() => {
    getMyPosts();
  }, []);

  const deleteMyPost = (id) => {
    deletePost(id).then(getMyPosts());
  };

  console.warn('User: ', user);

  if (user.uid != null) {
    isAuthenticated = true;
  }

  return (
    <div>
      <h1 className="py-3">My Posts</h1>
      <PostGrid posts={myPosts} isAuthenticated={isAuthenticated} deletePost={deleteMyPost} />
    </div>
  );
}
