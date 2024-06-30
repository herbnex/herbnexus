// src/components/Shop/AllCategoriesPage.js

import React, { useState } from 'react';
import { Container, Dropdown } from 'react-bootstrap';
import './CategoryPage.css';
import { useProduct } from './ProductContext';
import { FaTh, FaThList } from 'react-icons/fa';
import ProductList from './ProductList';

const AllCategoriesPage = ({ handleAddToCart, handleShowProductDetail }) => {
  const { allProducts } = useProduct();
  const categories = ['All', ...new Set(allProducts.map(product => product.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [view, setView] = useState('grid');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleViewToggle = (viewType) => {
    setView(viewType);
  };

  const filteredProducts = selectedCategory === 'All' ? allProducts : allProducts.filter(product => product.category === selectedCategory);

  return (
    <Container className="category-page-container">
      <div className="category-tabs">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-tab ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="header">
        <div className="sort-options">
          <span className="sort-label">Sort by:</span>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Featured
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Price: Low to High</Dropdown.Item>
              <Dropdown.Item href="#">Price: High to Low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="header-right">
          <div className="item-count">
            {filteredProducts.length} items
          </div>
          <div className="view-toggle">
            <FaTh
              size={24}
              color={view === 'grid' ? '#39CABB' : '#ccc'}
              onClick={() => handleViewToggle('grid')}
              className="view-icon"
            />
            <FaThList
              size={24}
              color={view === 'list' ? '#39CABB' : '#ccc'}
              onClick={() => handleViewToggle('list')}
              className="view-icon"
            />
          </div>
        </div>
      </div>
      <ProductList
        products={filteredProducts}
        view={view}
        handleAddToCart={handleAddToCart}
        handleShowProductDetail={handleShowProductDetail}
      />
    </Container>
  );
};

export default AllCategoriesPage;
