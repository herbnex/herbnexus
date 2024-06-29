import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <Form inline>
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </InputGroup>
  </Form>
);

export default SearchBar;
