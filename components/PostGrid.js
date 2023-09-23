/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

const PostGrid = ({ posts, isAuthenticated, deletePost }) => (
  <div className="row">
    {posts.map((post) => (
      <div key={post.id} className="col-md-4 mb-4">
        <div className="card">
          <div className="card-body">
            {post.imageUrl && <img src={post.imageUrl} alt="post" />}
            <h5 className="card-title">Post Title: {post.title}</h5>
            <p className="card-text">Name: {post.userName}</p>
            <p className="card-text">Category: {post.category}</p>
            <p className="card-text">Tag: {post.tags}</p>
            <p className="card-text">Created on: {post.publicationDate}</p>

            <Link passHref href={`/post/${post.id}`}>
              <Button variant="primary" className="mt-3 btn-sm" style={{ height: '32px' }}>
                View
              </Button>
            </Link>
            {isAuthenticated && (
              <Link passHref href={`/post/${post.id}`}>
                <Button variant="secondary" className="mt-3 btn-sm ms-3" style={{ height: '32px' }} onClick={() => deletePost(post.Id)}>
                  Delete
                </Button>
              </Link>
            ) }
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
});

PostGrid.propTypes = {
  posts: PropTypes.arrayOf(postShape).isRequired,
  isAuthenticated: PropTypes.bool,
  deletePost: PropTypes.func,
};

PostGrid.defaultProps = {
  isAuthenticated: false,
  deletePost: () => {},
};

export default PostGrid;
