const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Opret storage til uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix)
  }
})

const upload = multer({ storage: storage });

// Enkelt upload route
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Ingen fil uploadet' });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Test route
app.get('/', (req, res) => {
  res.send('Serveren kører! Brug POST /upload for at uploade billeder.');
});

// Server starter
app.listen(PORT, () => {
  console.log(`Serveren kører på port ${PORT}`);
});