import http from 'node:http';
import fs from 'node:fs/promises';

let internalError;

async function getPage(pageName) {
  const pagesNames = ['index', 'about', 'contact', '404'];

  const isPageValid = pagesNames.find((element) => element === pageName);
  if (!isPageValid) {
    try {
      const errorPage = await fs.readFile('./404.html');
      return errorPage;
    } catch (erorr) {
      console.error(error);
      console.error("Couldn't find 404 page file");
    }
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method !== 'GET') {
    response.writeHead(405, 'Method Not Allowed');
    response.end();
  }

  const url = new URL(request.url, 'https://localhost');
  const path = url.pathname;

  const pageName = path.slice(0, -1);
  const page = await getPage(pageName);

  response.writeHead(200);
  response.end(page);
});

server.listen(8000);
