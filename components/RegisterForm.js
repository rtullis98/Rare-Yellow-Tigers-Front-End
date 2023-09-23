// import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { FloatingLabel } from 'react-bootstrap';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { useAuth } from '../utils/context/authContext';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
  profileImageUrl: '',
};

function RegisterForm() {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formInput, uid: user.uid, isActive: true, isStaff: false,
    };
    registerUser(payload).then(() => {
      router.push('/');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>User Registration</h2>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your First Name"
          name="firstName"
          value={formInput.firstName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* LAST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter your Last Name"
          name="lastName"
          value={formInput.lastName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* EMAIL INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
        <Form.Control
          type="email"
          placeholder="Enter your Email"
          name="email"
          value={formInput.email}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* BIO INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Bio" className="mb-3">
        <Form.Control
          type="textbox"
          placeholder="Enter your Bio"
          name="bio"
          value={formInput.bio}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PROFILE PICTURE INPUT  */}
      <FloatingLabel controlId="floatingInput5" label="Profile Picture Url" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter your Profile Picture URL"
          name="profileImageUrl"
          value={formInput.profileImageUrl}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

// RegisterForm.propTypes = {
//   user: PropTypes.shape({
//     firstName: PropTypes.string.isRequired,
//     lastName: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     bio: PropTypes.string.isRequired,
//     profileImageUrl: PropTypes.string.isRequired,
//   }).isRequired,
// };

export default RegisterForm;
