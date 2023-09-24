/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { addTagToPost } from '../api/postsData';
import { checkUser } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getAllTags } from '../api/tagsData';

function AddTagToPost({ postId }) {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [, setRareUser] = useState({});
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkUser(user.id).then(setRareUser);
    getAllTags().then((tagsData) => {
      setTags(tagsData);
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTag) {
      console.warn('SELECTED TAG', selectedTag);
      const newPostId = postId[0]?.id;
      console.warn('POST ID: ', newPostId);
      addTagToPost(newPostId, selectedTag)
        .then((data) => {
          console.warn('Tag added to post:', data);
        })
        .then(router.push('/myPostsPage'))
        .catch((error) => {
          console.error('Error adding tag to post:', error);
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formGridTag">
          <Form.Select
            aria-label="Tag"
            name="TagId"
            onChange={(e) => setSelectedTag(e.target.value)}
            className="mb-3"
            value={selectedTag}
          >
            <option value="">Select a Tag</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit">Add Tag</Button>
      </Form>
    </>
  );
}

AddTagToPost.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default AddTagToPost;
