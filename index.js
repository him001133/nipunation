addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    // Fetch the index.html file from the same directory
    const indexHtmlResponse = await fetch(new URL('index.html', import.meta.url));

    if (!indexHtmlResponse.ok) {
      throw new Error(`Failed to fetch index.html: ${indexHtmlResponse.status}`);
    }

    const indexHtml = await indexHtmlResponse.text();

    return new Response(indexHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
