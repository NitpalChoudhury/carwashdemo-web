require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'reviews.json');

app.use(cors());
app.use(bodyParser.json());

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function requireAdmin(req, res, next) {
  const header = req.header('x-admin-token') || req.header('authorization');
  const token = header ? header.replace(/^Bearer\s+/i, '') : '';
  if (!process.env.ADMIN_TOKEN) {
    return res.status(500).json({ error: 'ADMIN_TOKEN not configured on server' });
  }
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized: admin token required' });
  }
  next();
}

app.get('/reviews', (req, res) => {
  const reviews = readData();
  res.json(reviews);
});

app.post('/reviews', requireAdmin, (req, res) => {
  const { author, rating, text, service } = req.body;
  if (!author || !text || !service || typeof rating !== 'number') {
    return res.status(400).json({ error: 'Missing required fields (author, rating:number, text, service)' });
  }
  const reviews = readData();
  const newReview = {
    id: Date.now().toString(),
    author,
    rating,
    text,
    service,
    date: new Date().toISOString()
  };
  reviews.unshift(newReview);
  writeData(reviews);
  res.status(201).json(newReview);
});

app.put('/reviews/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const reviews = readData();
  const idx = reviews.findIndex(r => r.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Review not found' });
  const updated = { ...reviews[idx], ...updates, id };
  reviews[idx] = updated;
  writeData(reviews);
  res.json(updated);
});

app.delete('/reviews/:id', requireAdmin, (req, res) => {
  const { id } = req.params;
  const reviews = readData();
  const filtered = reviews.filter(r => r.id !== id);
  if (filtered.length === reviews.length) return res.status(404).json({ error: 'Review not found' });
  writeData(filtered);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
