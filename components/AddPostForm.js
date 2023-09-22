import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createPost, updatePost } from '../api/postsData';
import { getAllCategories } from '../api/categoryData';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  Id: 0,
  Title: '',
  ImageUrl: '',
  Content: '',
  IsApproved: false,
};

export default function AddPostForm({ obj }) {
  const [formData, setFormData] = useState(initialState);
  const [, setRareUser] = useState({});
  const [category, setCategory] = useState([]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    getAllCategories().then(setCategory);
    checkUser(user.id).then(setRareUser);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.Id) {
      updatePost(formData)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formData, PublicationDate: new Date(Date.now()), RareUserId: user.id };
      createPost(payload)
        .then(router.push('/'))
        .catch((error) => {
          console.error('API Error:', error);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>

        {/* IMAGE INPUT AS STRING */}
        <FloatingLabel controlId="floatingInput1" label="Enter post image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter an image url"
            name="ImageUrl"
            value={formData.ImageUrl}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Enter the title of the post" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Post Title"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Enter the content of the post" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter the content"
            name="Content"
            value={formData.Content}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <Form.Group className="mb-3" controlId="formGridLevel">
          <Form.Select
            aria-label="Category"
            name="CategoryId"
            onChange={handleChange}
            className="mb-3"
            value={obj.CategoryId}
          >
            <option value="">Select a Category</option>
            {
            category.map((Categories) => (
              <option
                key={Categories.id}
                value={Categories.id}
              >
                {Categories.label}
              </option>
            ))
          }
          </Form.Select>
        </Form.Group>

        {/* SUBMIT BUTTON  */}
        <Button type="submit">Create Post</Button>
      </Form>
    </>
  );
}

AddPostForm.propTypes = {
  obj: PropTypes.shape({
    Id: PropTypes.number,
    Title: PropTypes.string,
    CategoryId: PropTypes.number,
    ImageUrl: PropTypes.string,
    Content: PropTypes.string,
    IsApproved: PropTypes.bool,
    RareUserId: PropTypes.number,
  }),
};
AddPostForm.defaultProps = {
  obj: initialState,
};
