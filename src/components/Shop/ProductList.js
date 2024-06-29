import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const ProductList = ({ products, handleAddToCart, handleShowProductDetail, view }) => (
  <Row className={`product-grid ${view}`}>
    {products.map(product => (
      <Col key={product.id} xs={6} sm={6} md={4} lg={3} className={`product-card ${view}`}>
        <ProductCard
          product={product}
          handleAddToCart={handleAddToCart}
          handleShowProductDetail={handleShowProductDetail}
        />
      </Col>
    ))}
  </Row>
);

export default ProductList;
