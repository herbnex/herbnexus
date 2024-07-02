import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch, useHistory } from 'react-router-dom';
import Shop from './Shop';
import ProductPage from './ProductPage';
import CategoryPage from './CategoryPage';
import AllProductsPage from './AllProductsPage';
import AllCategoriesPage from './AllCategoriesPage';
import NavBar from './NavBar';
import BreadcrumbNav from './BreadcrumbNav';
import Checkout from './Checkout'; // Import the Checkout component
import { useProduct } from './ProductContext';
import TermsOfService from '../pages/TermsOfService/TermsOfService';
import DeliveryPolicy from '../Shop/DeliveryPolicy';
import ReturnPolicy from '../Shop/ReturnPolicy';
import PrivateRoute from '../PrivateRoute/PrivateRoute'; // Import PrivateRoute component

const ShopLayout = () => {
  let { path } = useRouteMatch();
  const history = useHistory();

  const { cart, addToCart } = useProduct();
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    console.log('Cart state in ShopLayout component:', cart);
  }, [cart]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategorySelect = (category) => {
    history.push(`/shop/category/${category}`);
  };

  const handleShowProductDetail = (product) => {
    const formattedName = product.name.toLowerCase().replace(/ /g, '-');
    history.push(`/shop/product/${formattedName}`);
  };

  return (
    <>
      <NavBar
        cartCount={cart.length}
        onSearch={handleSearchChange}
        onToggleCategories={toggleCategories}
        showCategories={showCategories}
        onCategorySelect={handleCategorySelect}
      />
      <BreadcrumbNav />
      <Switch>
        <Route exact path={`${path}/`} render={(props) => <Shop {...props} searchTerm={searchTerm} />} />
        <Route path={`${path}/product/:name`} render={(props) => <ProductPage {...props} />} />
        <Route 
          path={`${path}/category/:category`} 
          render={(props) => (
            <CategoryPage 
              {...props} 
              handleAddToCart={addToCart} 
              handleShowProductDetail={handleShowProductDetail} 
            />
          )} 
        />
        <Route 
          path={`${path}/product`} 
          render={(props) => (
            <AllProductsPage 
              {...props} 
              handleAddToCart={addToCart} 
              handleShowProductDetail={handleShowProductDetail} 
            />
          )} 
        />
        <Route 
          path={`${path}/category`} 
          render={(props) => (
            <AllCategoriesPage 
              {...props} 
              handleAddToCart={addToCart} 
              handleShowProductDetail={handleShowProductDetail}
            />
          )} 
        />
        <Route path={`${path}/checkout`} >
          <Checkout />
        </Route>
        <Route path={`${path}/security-policy`} >
          <TermsOfService />
        </Route>
        <Route path={`${path}/delivery-policy`} >
          <DeliveryPolicy />
        </Route>
        <Route path={`${path}/return-policy`}>
          <ReturnPolicy />
        </Route>
      </Switch>
    </>
  );
};

export default ShopLayout;
