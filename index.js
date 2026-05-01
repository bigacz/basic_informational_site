import http from 'node:http';
import fs from 'node:fs/promises';

async function getPage(pageName) {
  let filePath = './404.html';

  switch (pageName) {
    case '':
      filePath = './index.html';
      break;
    case 'about':
      filePath = './about.html';
      break;
    case 'contact-me':
      filePath = './contact-me.html';
      break;
    default:
      filePath = './404.html';
      break;
  }

  try {
    const page = await fs.readFile(filePath);
    return page;
  } catch (error) {
    console.error(error);
    console.error(`Couldn't find page file`);
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method !== 'GET') {
    response.writeHead(405, 'Method Not Allowed');
    response.end();
  }

  const url = new URL(request.url, 'https://localhost');
  const path = url.pathname;

  const pageName = path.slice(1);
  const page = await getPage(pageName);

  response.writeHead(200);
  response.end(page);
});

server.listen(8080);
