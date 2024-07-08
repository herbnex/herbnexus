const axios = require('axios');

const url = 'https://herbnexus.io/rateLimiter'; // Replace with the correct site URL
const numRequests = 150; // Number of requests to make

const makeRequest = async () => {
  try {
    const response = await axios.get(url, {
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
    });
    console.log(response.status);
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
    } else {
      console.log('Error:', error.message);
    }
  }
};

const main = async () => {
  const promises = [];
  for (let i = 0; i < numRequests; i++) {
    promises.push(makeRequest());
  }
  await Promise.all(promises);
  console.log('All requests made');
};

main();
