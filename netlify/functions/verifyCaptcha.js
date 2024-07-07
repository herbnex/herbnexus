const axios = require('axios');

const RECAPTCHA_SECRET_KEY = '6LeVGgoqAAAAADTpI3ZDUfR02ewuENDh2nRCGRCi';

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const { token } = JSON.parse(event.body);

  try {
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: RECAPTCHA_SECRET_KEY,
        response: token,
      },
    });

    const data = response.data;

    if (data.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: data['error-codes'] }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Server error' }),
    };
  }
};
