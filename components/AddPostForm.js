import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { createPost } from '../api/postsData';

const initialState = {
  title: '',
  imageUrl: '',
  content: '',
  categoryId: 0,
  isApproved: false,
};

const AddPostForm = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };
    console.log(payload);
    createPost(payload)
      .then((response) => {
        if (response.ok) {
          console.log('New Post Created:', response.data);
        } else {
          response.json().then((errorData) => {
            console.error('Error:', errorData.error);
          });
        }
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        {/* IMAGE INPUT AS STRING */}
        <FloatingLabel controlId="floatingInput1" label="Enter post image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter an image url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Enter the title of the post" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Post Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Enter the content of the post" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter the content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingSelect" label="Select the category of the post" className="mb-3">
          <Form.Select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="0">Select a category</option>
            <option value="1">Music</option>
            <option value="2">Movie</option>
            {/* Add more options as needed */}
          </Form.Select>
        </FloatingLabel>

        {/* SUBMIT BUTTON  */}
        <Button type="submit">Create Post</Button>
      </Form>
    </>
  );
};

AddPostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    categoryId: PropTypes.number,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    isApproved: PropTypes.bool,
  }),
};
AddPostForm.defaultProps = {
  obj: initialState,
};

export default AddPostForm;
