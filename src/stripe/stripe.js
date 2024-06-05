// src/stripe/stripe.js
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-public-key-here");

export default stripePromise;
