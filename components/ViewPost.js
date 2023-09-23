/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

const ViewPost = ({ posts }) => (
  <div className="row">
    {posts.map((post) => (
      <div key={post.id} className="col-md-4 mb-4">
        <div className="card">
          <div className="card-body">
            {post.imageUrl && <img src={post.imageUrl} alt="post" />}
            <h5 className="card-title">Post Title: {post.title}</h5>
            <p className="card-text">Name: {post.userName}</p>
            <p className="card-text">Content: {post.content}</p>
            <p className="card-text">Category: {post.category}</p>
            <p className="card-text">Tag: {post.tags}</p>
            <p className="card-text">Created on: {post.publicationDate}</p>
            <p className="card-text">Comments: {post.comments[0]?.content}</p>
            <p className="card-text">Reactions: {post.reactions[0]?.image_Url}</p>

            <Link passHref href={`/post/${post.id}`}>
              <Button variant="primary" className="mt-3 btn-sm" style={{ height: '32px' }}>
                Comment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const postShape = PropTypes.shape({
  Id: PropTypes.number,
  Title: PropTypes.string,
  UserName: PropTypes.string,
  Tags: PropTypes.string,
  imageUrl: PropTypes.string,
  Content: PropTypes.string,
});

ViewPost.propTypes = {
  posts: PropTypes.arrayOf(postShape).isRequired,
};

export default ViewPost;
