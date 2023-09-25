import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

export default function User({ user }) {
  console.warn('UserImage: ', user.fbUser.photoURL);
  let photo = '';
  if (user.profileImageUrl === null) {
    photo = 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=';
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
