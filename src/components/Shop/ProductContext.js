import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const allProducts = [
    { 
      id: 1, 
      name: 'Custom Air Freshener', 
      price: 18.49, 
      discountPrice: 15.99, 
      image: 'https://via.placeholder.com/200', 
      category: 'Home & Garden', 
      rating: 4.5, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'], 
      colors: ['White', 'Black', 'Pink'], 
      designOptions: ['Option 1', 'Option 2'], 
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1 
    },
    { 
      id: 2, 
      name: 'Travel Jewelry Box', 
      price: 29.97, 
      discountPrice: 25.97, 
      image: 'https://via.placeholder.com/200', 
      category: 'Fashion', 
      rating: 4.8, 
      reviews: [{ user: 'Jamie', date: '25 Jun, 2024', comment: 'Great product!', rating: 5 }], 
      additionalImages: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'], 
      colors: ['White', 'Black', 'Pink'], 
      designOptions: ['Option 1', 'Option 2'], 
      demandText: '294 people bought this in the last 24 hours.', 
      saleEndDate: '06 July',
      quantity: 1 
    },
    { 
      id: 3, 
      name: 'School Supplies', 
      price: 8.49, 
      image: 'https://via.placeholder.com/200', 
      category: 'Books', 
      rating: 4.2, 
      reviews: [{ user: 'Alex', date: '20 Jun, 2024', comment: 'Very useful!', rating: 4 }], 
      additionalImages: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'], 
      colors: ['Blue', 'Red'], 
      designOptions: ['Standard', 'Premium'], 
      demandText: '150 people bought this in the last week.', 
      saleEndDate: '10 July',
      quantity: 1 
    },
    { 
      id: 4, 
      name: 'Gift Basket', 
      price: 25.00, 
      image: 'https://via.placeholder.com/200', 
      category: 'Home & Garden', 
      rating: 4.7, 
      reviews: [{ user: 'Sam', date: '15 Jun, 2024', comment: 'Loved it!', rating: 5 }], 
      additionalImages: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'], 
      colors: ['Green', 'Yellow'], 
      designOptions: ['Option 1', 'Option 2'], 
      demandText: '50 people bought this in the last 24 hours.', 
      saleEndDate: '05 July',
      quantity: 1 
    },
    { 
      id: 5, 
      name: 'Yoga Mat', 
      price: 20.00, 
      image: 'https://via.placeholder.com/200', 
      category: 'Sports', 
      rating: 4.9, 
      reviews: [{ user: 'Chris', date: '10 Jun, 2024', comment: 'Best yoga mat ever!', rating: 5 }], 
      additionalImages: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'], 
      colors: ['Purple', 'Blue'], 
      designOptions: ['Standard', 'Thick'], 
      demandText: '200 people bought this in the last month.', 
      saleEndDate: '12 July',
      quantity: 1 
    },
    { 
      id: 6, 
      name: 'Bluetooth Headphones', 
      price: 59.99, 
      discountPrice: 49.99, 
      image: 'https://via.placeholder.com/200', 
      category: 'Electronics', 
      rating: 4.6, 
      reviews: [{ user: 'Jordan', date: '05 Jun, 2024', comment: 'Great sound quality!', rating: 5 }], 
      additionalImages: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'], 
      colors: ['Black', 'White'], 
      designOptions: ['Option 1', 'Option 2'], 
      demandText: '100 people bought this in the last week.', 
      saleEndDate: '15 July',
      quantity: 1 
    },
    { 
      id: 7, 
      name: 'Coffee Maker', 
      price: 75.00, 
      discountPrice: 65.00, 
      image: 'https://via.placeholder.com/200', 
      category: 'Home & Garden', 
      rating: 4.3, 
      reviews: [{ user: 'Taylor', date: '01 Jun, 2024', comment: 'Makes great coffee!', rating: 4 }], 
      additionalImages: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'], 
      colors: ['Silver', 'Black'], 
      designOptions: ['Standard', 'Deluxe'], 
      demandText: '300 people bought this in the last month.', 
      saleEndDate: '20 July',
      quantity: 1 
    },
    { 
      id: 8, 
      name: 'Electric Toothbrush', 
      price: 40.00, 
      discountPrice: 35.00, 
      image: 'https://via.placeholder.com/200', 
      category: 'Health & Beauty', 
      rating: 4.8, 
      reviews: [{ user: 'Morgan', date: '28 May, 2024', comment: 'Very effective!', rating: 5 }], 
      additionalImages: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'], 
      colors: ['White', 'Blue'], 
      designOptions: ['Standard', 'Premium'], 
      demandText: '120 people bought this in the last 24 hours.', 
      saleEndDate: '25 July',
      quantity: 1 
    },
    { 
      id: 9, 
      name: 'Running Shoes', 
      price: 90.00, 
      discountPrice: 80.00, 
      image: 'https://via.placeholder.com/200', 
      category: 'Sports', 
      rating: 4.7, 
      reviews: [{ user: 'Alex', date: '22 May, 2024', comment: 'Very comfortable!', rating: 5 }], 
      additionalImages: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'], 
      colors: ['Black', 'Red'], 
      designOptions: ['Standard', 'Deluxe'], 
      demandText: '500 people bought this in the last month.', 
      saleEndDate: '30 July',
      quantity: 1 
    },
    { 
      id: 10, 
      name: 'Smart Watch', 
      price: 150.00, 
      discountPrice: 120.00, 
      image: 'https://via.placeholder.com/200', 
      category: 'Electronics', 
      rating: 4.9, 
      reviews: [{ user: 'Jordan', date: '18 May, 2024', comment: 'Love the features!', rating: 5 }], 
      additionalImages: ['https://via.placeholder.com/200', 'https://via.placeholder.com/200'], 
      colors: ['Black', 'Silver'], 
      designOptions: ['Standard', 'Premium'], 
      demandText: '700 people bought this in the last month.', 
      saleEndDate: '05 August',
      quantity: 1 
    }
  ];
  
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };

  const [cart, setCart] = useState(loadCartFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) => 
        item.id === productId ? { ...item, quantity: parseInt(quantity) } : item
      );
    });
  };

  return (
    <ProductContext.Provider value={{ allProducts, cart, addToCart, removeFromCart, updateCartQuantity }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => useContext(ProductContext);

export { ProductProvider, useProduct };
