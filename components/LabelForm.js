import React from 'react';
import PropTypes from 'prop-types';

const LabelForm = ({ type }) => (
  <>

    <h4>Create a new { type === 'tag' ? <span>Tag</span> : <span>Category</span>}</h4>
  </>
);

export default LabelForm;

LabelForm.propTypes = {
  type: PropTypes.string.isRequired,
};
