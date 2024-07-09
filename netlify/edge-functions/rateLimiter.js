export default async (request) => {
    console.log('Rate Limiter Invoked');
  
    // Log the request URL for debugging
    console.log(`Request URL: ${request.url}`);
  
    // Fetch the original request
    let originalResponse;
    try {
      // Clone the request to ensure it can be reused
      const requestClone = request.clone();
      
      originalResponse = await fetch(requestClone);
      console.log('Original request fetched successfully');
    } catch (error) {
      console.log('Error fetching original request:', error);
      return new Response('Error fetching original request', { status: 500 });
    }
  
    // Return the original response
    return new Response(originalResponse.body, {
      status: originalResponse.status,
      statusText: originalResponse.statusText,
      headers: originalResponse.headers
    });
  };
  
  export const config = {
    path: "/*",
  };
  