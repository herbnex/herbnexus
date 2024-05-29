require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { confirmationTokenId } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      confirm: true,
      amount: 5000, // Amount in cents
      currency: 'usd',
      confirmation_token: confirmationTokenId, // the ConfirmationToken ID sent by your client
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        client_secret: paymentIntent.client_secret,
        status: paymentIntent.status,
      }),
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
