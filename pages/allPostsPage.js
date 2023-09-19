import React, { useState, useEffect } from 'react';
import getAllPosts from '../api/postsData';
import PostGrid from '../components/PostGrid';

export default function AllPostsPage() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((data) => setAllPosts(data));
  }, []);

  console.warn('All Posts: ', allPosts);
  return (
    <div>
      <h1 className="py-3">All Posts</h1>
      {/* Render the PostGrid component with the fetched posts */}
      <PostGrid posts={allPosts} />
    </div>
  );
}
