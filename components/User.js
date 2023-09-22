import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function User({ user }) {
  console.warn('Image: ', user.profileImageUrl);

  let photo = '';
  if (user.profileImageUrl === null) {
    photo = user.fbUser.photoURL;
  } else {
    photo = user.profileImageUrl;
  }
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={photo} alt="profile picture" style={{ height: 'auto' }} />
      <Card.Body>
        <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
        <Card.Text>
          {user.email}
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Bio: {user.bio}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    profileImageUrl: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
    createdOn: PropTypes.string,
    fbUser: PropTypes.shape({
      photoURL: PropTypes.string,
    }),
  }).isRequired,
};
