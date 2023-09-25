import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FloatingLabel, Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createPost, updatePost } from '../api/postsData';
import { getAllCategories } from '../api/categoryData';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

const initialState = {
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

  console.warn('OBJECT: ', obj);
  useEffect(() => {
    getAllCategories().then(setCategory);
    checkUser(user.id).then(setRareUser);
    if (obj.id) setFormData(obj);
  }, [obj, user]);

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
      const updatedPost = { ...formData, Id: obj.id };
      updatePost(updatedPost)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formData, PublicationDate: new Date(Date.now()), RareUserId: user.id };
      createPost(payload)
        .then(router.push('/myPostsPage'))
        .catch((error) => {
          console.error('API Error:', error);
        });
    }
  };

  // console.warn('FORM DATA: ', formData);

  return (
    <>
      <Form onSubmit={handleSubmit}>

        {/* IMAGE INPUT AS STRING */}
        <FloatingLabel controlId="floatingInput1" label="Enter post image" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter an image url"
            name="ImageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput2" label="Enter the title of the post" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Post Title"
            name="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput3" label="Enter the content of the post" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter the content"
            name="Content"
            value={formData.content}
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
            value={obj.categoryId}
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
        <Button type="submit">Create Post</Button>
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
