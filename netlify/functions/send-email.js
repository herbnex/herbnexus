const mailjet = require('node-mailjet');

const client = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

exports.handler = async (event, context) => {
  console.log('Event:', event);

  try {
    const { userEmail, doctorEmail, subject, message, senderType } = JSON.parse(event.body);
    console.log('Parsed event body:', { userEmail, doctorEmail, subject, message, senderType });

    let recipientEmail, recipientName;
    if (senderType === 'user') {
      recipientEmail = doctorEmail;
      recipientName = doctorEmail;
    } else if (senderType === 'doctor') {
      recipientEmail = userEmail;
      recipientName = userEmail;
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid sender type' }),
      };
    }

    const request = client.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'noreply@herbnexus.io',
            Name: 'Herb Nexus',
          },
          To: [
            {
              Email: recipientEmail,
              Name: recipientName,
            },
          ],
          Subject: subject,
          TextPart: message,
          HTMLPart: `<p>${message}</p>`,
        },
      ],
    });

    const result = await request;
    console.log('Mailjet response:', result.body);

    return {
      statusCode: 200,
      body: JSON.stringify({ result: result.body }),
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
