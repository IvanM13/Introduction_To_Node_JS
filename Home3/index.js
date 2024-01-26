const express = require('express');
const fs = require('fs/promises');

const app = express();
const port = 3000;

let counters = {};
const filePath = 'counters.json';

async function readCounters() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    counters = JSON.parse(data);
  } catch (error) {
    console.error('Error reading counters file:', error.message);
  }
}

readCounters();

function updateCounter(req, res, next) {
  const url = req.url;
  counters[url] = (counters[url] || 0) + 1;

  fs.writeFile(filePath, JSON.stringify(counters))
    .catch((error) => console.error('Error writing counters file:', error.message));

  next();
}

function readCounter(req, res, next) {
  const url = req.url;
  req.counter = counters[url] || 0;
  next();
}

app.get('/', updateCounter, readCounter, (req, res) => {
  res.send(`<h1>Welcome to home<h1/><br> <p>counter: ${req.counter}<p/><br><a href="/about">/about</a>`);
});

app.get('/about', updateCounter, readCounter, (req, res) => {
  res.send(`<h1>About<h1/><br> <p>counter: ${req.counter}<p/><br><a href="/">/main</a>`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});