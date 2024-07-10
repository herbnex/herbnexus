const mailjet = require('node-mailjet').connect(
    process.env.MJ_API_KEY,
    process.env.MJ_SECRET_KEY
  );
  
  exports.handler = async (event, context) => {
    const { userEmail, doctorEmail, subject, message } = JSON.parse(event.body);
  
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: 'noreply@herbnexus.com',
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
  