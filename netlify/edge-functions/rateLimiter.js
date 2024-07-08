export default async (context) => {
    console.log('Edge Function Invoked');
    return new Response('OK', { status: 200 });
  };
  