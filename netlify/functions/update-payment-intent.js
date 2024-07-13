require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { paymentIntentId, shippingAddress, email } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
      shipping: {
        name: shippingAddress.recipient,
        address: {
          line1: shippingAddress.addressLine,
          city: shippingAddress.city,
          state: shippingAddress.region,
          postal_code: shippingAddress.postalCode,
          country: shippingAddress.country,
        },
        phone: shippingAddress.phone,
      },
      receipt_email: email,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(paymentIntent),
    };
  } catch (error) {
    console.error("Error updating payment intent:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
