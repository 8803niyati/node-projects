const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filepath = '';

  switch (req.url) {
    case '/':
      filepath = './index.html';
      break;
    case '/blog':
      filepath = './blog.html';
      break;
    case '/services':
      filepath = './services.html';
      break;
    case '/contact':
      filepath = './contact.html';
      break;
    case '/gallery':
      filepath = './gallery.html';
      break;
    default:
      filepath = './index.html'; // fallback
  }

  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Page Not Found</h1>');
  }
});

const port = 8000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
