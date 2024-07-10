const mailjet = require('node-mailjet');

const client = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

exports.handler = async (event, context) => {
  const { userEmail, doctorEmail, subject, message } = JSON.parse(event.body);

  const request = client.post('send', { version: 'v3.1' }).request({
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
  });

  try {
    const result = await request;
    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
