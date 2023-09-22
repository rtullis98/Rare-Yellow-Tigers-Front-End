import React from 'react';
import PropTypes from 'prop-types';

const PostGrid = ({ posts }) => (
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
});

PostGrid.propTypes = {
  posts: PropTypes.arrayOf(postShape).isRequired,
};

export default PostGrid;
