import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Alert } from 'react-bootstrap';
import './Shop.css';
import EditorsPicks from './EditorsPicks';
import AllProductsPage from './AllProductsPage';
import CartModal from './CartModal';
import CategoryList from './CategoryList';
import SearchResultsModal from './SearchResultsModal';
import CategoryProducts from './CategoryProducts';
import PopularGifts from './PopularGifts';
import { useProduct } from './ProductContext';

const Shop = ({ searchTerm }) => {
  const { allProducts, cart, addToCart, removeFromCart } = useProduct();
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const history = useHistory();

  useEffect(() => {
      }, [cart]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleShowCheckout = () => setShowCheckout(true);
  const handleCloseCheckout = () => setShowCheckout(false);

  const handleShowProductDetail = (product) => {
    const formattedName = product.name.toLowerCase().replace(/ /g, '-');
    history.push(`/shop/product/${formattedName}`);
    
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    setShowCheckout(false);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  const filteredProducts = allProducts
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => a.price - b.price);

  const categoryProducts = selectedCategory
    ? allProducts.filter(product => product.category === selectedCategory)
    : [];

  const handleSelectProduct = (product) => {
    setShowSearchResults(false);
    history.push(`/shop/product/${product.id}`);
  };

  return (
    <Container className="my-4">
      {orderPlaced && <Alert variant="success">Your order has been placed successfully!</Alert>}

      <h4 className="text-center">Shop by Body System</h4>
      <CategoryList />

      {selectedCategory ? (
        <CategoryProducts
          products={categoryProducts}
          onAddToCart={handleAddToCart}
          onShowProductDetail={handleShowProductDetail}
        />
      ) : (
        <>
          <PopularGifts
            products={allProducts}
            onAddToCart={handleAddToCart}
            onShowProductDetail={handleShowProductDetail}
          />
          {/* <EditorsPicks 
            products={allProducts.slice(9, 15)} 
            handleAddToCart={handleAddToCart}
            handleShowProductDetail={handleShowProductDetail} 
          /> */}
          <AllProductsPage 
            handleAddToCart={handleAddToCart}
            handleShowProductDetail={handleShowProductDetail}
          />
        </>
      )}

      <CartModal
        show={showCheckout}
        onHide={handleCloseCheckout}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onPlaceOrder={handlePlaceOrder}
      />

      <SearchResultsModal
        show={showSearchResults}
        onHide={() => setShowSearchResults(false)}
        results={filteredProducts}
        onSelect={handleSelectProduct}
      />
    </Container>
  );
};

export default Shop;
