import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useProduct } from './ProductContext';
import './NavBar.css';

const NavBar = ({ cartCount, onToggleCategories, showCategories, onCategorySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const categoriesDropdownRef = useRef(null);
  const searchDropdownRef = useRef(null);
  const categories = ['Specialty Supplements', 'Natural Extracts', 'Amino Acids & Blends ', 'Vitamins & Minerals', 'Proteins & Blends'];
  
  const { cart, allProducts } = useProduct();
  const history = useHistory();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      const results = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    }
  }, [searchTerm, allProducts]);

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
    history.push(`/shop/category/${category}`);
  };

  const handleProductClick = (product) => {
    setSearchResults([]); // Hide search results
    setSearchTerm(''); // Clear search term
    const p = product.name.toLowerCase().replace(/ /g, '-')
    history.push(`/shop/product/${p}`);
  };

  const handleCheckout = () => {
    history.push('/shop/checkout');
    setSearchResults([]); // Hide search results
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target)) {
        onToggleCategories(false);
      }
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onToggleCategories]);

  useEffect(() => {
    const unlisten = history.listen(() => {
      setSearchResults([]);
    });
    return () => {
      unlisten();
    };
  }, [history]);

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
      <div className="navbar-search" ref={searchDropdownRef}>
        <input
          type="text"
          placeholder="Search for anything"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaSearch size={16} color="#fff" />
        </button>
        {searchResults.length > 0 && (
          <div className="search-results-dropdown">
            <ul>
              {searchResults.map((result, index) => (
                <li key={index} onClick={() => handleProductClick(result)}>
                  <img src={result.image} alt={result.name} />
                  <div>
                    <h6>{result.name}</h6>
                    <p>${result.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
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
