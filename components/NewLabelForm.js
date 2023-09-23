import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createCategory } from '../api/categoryData';
import { createTag } from '../api/tagsData';

const initialState = {
  lable: '',
};

function NewLableForm({ onUpdate, type }) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formData };

    if (type.toLowerCase() === 'category') {
      createCategory(payload).then(() => onUpdate());
    } else if (type.toLowerCase() === 'tag') {
      createTag(payload).then(() => onUpdate());
    }
    e.target.reset();
  };

  return (
    <>
      <div style={{ border: '1px solid black', borderRadius: '10px', padding: '20px' }}>
        {/* <h4>Create a new { type === 'tag' ? <span>Tag</span> : <span>Category</span>}</h4> */}
        <h4>Create a new {type}</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" name="label" required onChange={handleChange} />
          </Form.Group>
          <Button variant="secondary" className="btn-sm" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>

  );
}

NewLableForm.propTypes = {
  type: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NewLableForm;
