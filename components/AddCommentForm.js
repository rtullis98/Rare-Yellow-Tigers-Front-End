/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createComment } from '../api/commentData';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  content: '',
};

function AddCommentForm({ postId }) {
  const [comment, setComment] = useState(initialState);

  const [, setRareUser] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    checkUser(user.id).then(setRareUser);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const newComment = {
      ...comment, postId, PublicationDate: new Date(Date.now()), AuthorId: user.id,
    };
    createComment(newComment);
    setComment(initialState);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="content">
        <Form.Control
          type="text"
          placeholder="Enter your comment"
          name="content"
          value={comment.content}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button type="submit">Add Comment</Button>
    </Form>
  );
}

AddCommentForm.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default AddCommentForm;
