import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { getAllPosts } from '../api/postsData';
import PostGrid from '../components/PostGrid';

export default function AllPostsPage() {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then((data) => setAllPosts(data));
  }, []);

  return (
    <div>
      <Head>
        <title>All Posts</title>
      </Head>
      <div className="d-flex justify-content-between">
        <h1 className="py-3">All Posts</h1>
        <Link passHref href="/createPostPage">
          <Button variant="primary" className="mt-3 btn-sm" style={{ height: '32px' }}>
            Create Post
          </Button>
        </Link>
      </div>

      {/* Render the PostGrid component with the fetched posts */}
      <PostGrid posts={allPosts} />
    </div>
  );
}
