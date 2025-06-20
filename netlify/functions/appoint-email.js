const mailjet = require('node-mailjet');

const client = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

exports.handler = async (event, context) => {
  console.log('Event:', event);

  try {
    const { userEmail, doctorEmail, subject, userMessage, doctorMessage } = JSON.parse(event.body);
    console.log('Parsed event body:', { userEmail, doctorEmail, subject, userMessage, doctorMessage });

    // Send email to the user
    const userRequest = client.post('send', { version: 'v3.1' }).request({
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
          ],
          Subject: subject,
          TextPart: userMessage,
          HTMLPart: `<p>${userMessage}</p>`,
        },
      ],
    });

    // Send email to the doctor
    const doctorRequest = client.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'noreply@herbnexus.io',
            Name: 'Herb Nexus',
          },
          To: [
            {
              Email: doctorEmail,
              Name: 'Doctor',
            },
          ],
          Subject: subject,
          TextPart: doctorMessage,
          HTMLPart: `<p>${doctorMessage}</p>`,
        },
      ],
    });

    const [userResult, doctorResult] = await Promise.all([userRequest, doctorRequest]);
    console.log('Mailjet response:', userResult.body, doctorResult.body);

    return {
      statusCode: 200,
      body: JSON.stringify({ result: { user: userResult.body, doctor: doctorResult.body } }),
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
