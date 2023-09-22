import React, { useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getPostsByUser } from '../api/postsData';
import PostGrid from '../components/PostGrid';

export default function MyPostsPage() {
  const { user } = useAuth();
  const [myPosts, setMyPosts] = useState([]);

  useState(() => {
    getPostsByUser(user.id).then((data) => setMyPosts(data));
  }, []);

  console.warn('My Posts: ', myPosts);
  return (
    <div>
      <h1 className="py-3">My Posts</h1>
      <PostGrid posts={myPosts} />
    </div>
  );
}
