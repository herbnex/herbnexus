const axios = require('axios');

const url = 'https://herbnexus.io'; // Replace with the correct site URL
const numRequests = 750; // Number of requests to make

const makeRequest = async () => {
  try {
    const response = await axios.get(url, {
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false }),
      timeout: 10000, // 10 seconds timeout
    });
    console.log(`Status: ${response.status}, Timestamp: ${new Date().toISOString()}`);
  } catch (error) {
    if (error.response) {
      console.log(`Error Status: ${error.response.status}, Timestamp: ${new Date().toISOString()}`);
    } else {
      console.log(`Error: ${error.message}, Timestamp: ${new Date().toISOString()}`);
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
