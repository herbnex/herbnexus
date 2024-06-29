import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import './NavBar.css';

const NavBar = ({ cartCount, onSearch, onToggleCategories, showCategories, onCategorySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const categoriesDropdownRef = useRef(null);
  const categories = ['Home & Garden', 'Electronics', 'Books', 'Fashion', 'Toys', 'Health & Beauty', 'Sports', 'Automotive', 'Jewelry', 'Music'];
  const { cart } = useProduct();
  const history = useHistory();

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
    history.push(`/shop/category/${category}`);
  };

  const handleCheckout = () => {
    history.push('/shop/checkout');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        onToggleCategories(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onToggleCategories]);

  return (
    <div className="navbar-container">
      <div className="navbar-left" onClick={() => onToggleCategories(!showCategories)}>
        <FaBars size={24} />
        <span style={{ marginLeft: '0.5rem' }}>Categories</span>
        {showCategories && (
          <div className="categories-dropdown" ref={categoriesDropdownRef}>
            <ul>
              {categories.map((category, index) => (
                <li key={index} onClick={() => handleCategorySelect(category)}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for anything"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>
          <FaSearch size={16} color="#fff" />
        </button>
      </div>
      <div className="cart-container">
        <DropdownButton
          alignRight
          title={
            <>
              <FaShoppingCart size={24} />
              <span className="cart-counter">{cartCount}</span>
            </>
          }
          id="dropdown-menu-align-right"
        >
          {cart.map((item, index) => (
            <Dropdown.Item key={index}>{item.name} - ${item.price}</Dropdown.Item>
          ))}
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleCheckout}>Checkout</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};

export default NavBar;
