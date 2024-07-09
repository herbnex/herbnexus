export default async (request) => {
    console.log('Rate Limiter Invoked');
  
    // Log the IP for debugging
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('client-ip');
    console.log(`IP: ${ip}`);
  
    // Allow the request to continue
    return new Response('Hello, world!', { status: 200 });
  };
  
  export const config = {
    path: "/*",
  };
  