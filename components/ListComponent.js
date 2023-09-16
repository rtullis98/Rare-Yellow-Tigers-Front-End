import React from 'react';
import PropTypes, { arrayOf } from 'prop-types';

const ListComponent = ({ arr }) => (
  <>
    <table className="w-75" style={{ fontSize: '16px' }}>
      {arr.map((item) => <tr style={{ border: '2px solid black', textAlign: 'center' }}><td className="p-2 w-25">{item.label}</td></tr>)}
    </table>
  </>
);

export default ListComponent;

ListComponent.propTypes = {
  arr: PropTypes.shape(arrayOf(PropTypes.string)).isRequired,
};
