import React from 'react';
import Head from 'next/head';
import AddPostForm from '../components/AddPostForm';

const CreatePostPage = () => (
  <div>
    <Head>
      <title>Create Post</title>
    </Head>
    <h1 className="py-3">Create Post</h1>
    <AddPostForm />
  </div>
);

export default CreatePostPage;
