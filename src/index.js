import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

console.log("Stripe Public Key:", process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const rootElement = document.getElementById('root');

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    <Router>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Router>,
    rootElement
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Elements stripe={stripePromise}>
          <App />
        </Elements>
      </Router>
    </React.StrictMode>,
    rootElement
  );
}

reportWebVitals();
