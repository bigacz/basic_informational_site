import express, { response } from 'express';

const app = express();

app.get('/', async (req, res) => {
  res.sendFile('index.html', { root: process.cwd() });
});

app.get('/contact-me', async (req, res) => {
  res.sendFile('contact-me.html', { root: process.cwd() });
});

app.get('/about', async (req, res) => {
  res.sendFile('about.html', { root: process.cwd() });
});

app.get(/(.*?)/, async (req, res) => {
  res.sendFile('404.html', { root: process.cwd() });
});

app.listen(8080);
