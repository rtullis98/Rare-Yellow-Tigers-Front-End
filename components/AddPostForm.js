import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createPost, updatePost } from '../api/postsData';
import { getAllCategories } from '../api/categoryData';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  // Id: 0,
  title: '',
  imageUrl: '',
  content: '',
  isApproved: false,
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
    if (obj.id) {
      setFormData(obj);
    }
  }, [user, obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      const payload = { ...formData, Id: obj.id };
      updatePost(payload)
        .then(() => router.push('/myPostsPage'));
    } else {
      const payload = { ...formData, PublicationDate: new Date(Date.now()), RareUserId: user.id };
      createPost(payload)
        .then(router.push('/myPostsPage'))
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

        <Form.Group className="mb-3" controlId="formGridLevel">
          <Form.Select
            aria-label="Category"
            name="categoryId"
            onChange={handleChange}
            className="mb-3"
            value={formData.categoryId}
          >
            <option value="">Select a Category</option>
            {
            category.map((categories) => (
              <option
                key={categories.id}
                value={categories.id}
              >
                {categories.label}
              </option>
            ))
          }
          </Form.Select>
        </Form.Group>

        {/* SUBMIT BUTTON  */}

        <Button type="submit" className="btn-secondary mt-2">{obj.id ? 'Update' : 'Create'} Post</Button>
      </Form>
    </>
  );
}

AddPostForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    categoryId: PropTypes.number,
    imageUrl: PropTypes.string,
    content: PropTypes.string,
    isApproved: PropTypes.bool,
    rareUserId: PropTypes.number,
  }),
};
AddPostForm.defaultProps = {
  obj: initialState,
};
