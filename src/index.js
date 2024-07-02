import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatProvider } from './components/pages/Contact/ChatContext'; // Import the ChatProvider
import './global.css'; // Import global CSS

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const rootElement = document.getElementById('root');

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    <Router>
      <Elements stripe={stripePromise}>
        <ChatProvider>
          <App />
        </ChatProvider>
      </Elements>
    </Router>,
    rootElement
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Elements stripe={stripePromise}>
          <ChatProvider>
            <App />
          </ChatProvider>
        </Elements>
      </Router>
    </React.StrictMode>,
    rootElement
  );
}

reportWebVitals();
