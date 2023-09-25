import React, { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getPostsByUser } from '../api/postsData';
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

  if (user.uid != null) {
    isAuthenticated = true;
  }

  return (
    <div>
      <Head>
        <title>My Posts</title>
      </Head>
      <h1 className="py-3">My Posts</h1>
      <PostGrid posts={myPosts} isAuthenticated={isAuthenticated} onUpdate={getMyPosts} />
    </div>
  );
}
