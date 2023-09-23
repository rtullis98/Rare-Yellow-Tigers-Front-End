import React from 'react';
import PropTypes from 'prop-types';

const ListComponent = ({ item }) => (
  <>

    <tr style={{ border: '2px solid black', textAlign: 'center', backgroundColor: '#fff' }}><td className="p-2 w-25 fw-semibold">{item}</td></tr>

  </>
);

export default ListComponent;

ListComponent.propTypes = {
  item: PropTypes.string.isRequired,
};
