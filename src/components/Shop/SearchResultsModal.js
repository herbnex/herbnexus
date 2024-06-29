import React from 'react';
import { Modal, ListGroup } from 'react-bootstrap';

const SearchResultsModal = ({ show, onHide, results, onSelect }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {results.map((result, index) => (
            <ListGroup.Item key={index} onClick={() => onSelect(result)}>
              {result.name} - ${result.price}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

export default SearchResultsModal;
