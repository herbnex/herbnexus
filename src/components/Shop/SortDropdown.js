import React from 'react';
import { Dropdown } from 'react-bootstrap';

const SortDropdown = ({ onSortChange }) => (
  <Dropdown className="ml-2">
    <Dropdown.Toggle variant="light">Sort By</Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item onClick={() => onSortChange('price')}>Price</Dropdown.Item>
      <Dropdown.Item onClick={() => onSortChange('rating')}>Rating</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

export default SortDropdown;
