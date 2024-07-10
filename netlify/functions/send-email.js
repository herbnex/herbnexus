const axios = require('axios');

exports.handler = async (event, context) => {
  console.log('Event:', event);

  try {
    const { userEmail, doctorEmail, subject, message } = JSON.parse(event.body);
    console.log('Parsed event body:', { userEmail, doctorEmail, subject, message });

    const mailjetUrl = 'https://api.mailjet.com/v3.1/send';
    const auth = {
      username: process.env.MJ_APIKEY_PUBLIC,
      password: process.env.MJ_APIKEY_PRIVATE
    };

    const emailData = {
      Messages: [
        {
          From: {
            Email: 'noreply@herbnexus.io',
            Name: 'Herb Nexus',
          },
          To: [
            {
              Email: userEmail,
              Name: 'User',
            },
            {
              Email: doctorEmail,
              Name: 'Doctor',
            },
          ],
          Subject: subject,
          TextPart: message,
          HTMLPart: `<p>${message}</p>`,
        },
      ],
    };

    const response = await axios.post(mailjetUrl, emailData, {
      auth: auth,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('Mailjet response:', response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ result: response.data }),
    };
  } catch (err) {
    console.error('Error sending email:', err.message);
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: err.message,
      }),
    };
  }
};
