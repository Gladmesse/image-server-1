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
app.post("/upload", upload.single("file"), (req, res) => {
  // den relative sti til filen
  const fileUrl = `/uploads/${req.file.filename}`;
  
  // byg det fulde link med domæne
  const fullUrl = `${req.protocol}://${req.get("host")}${fileUrl}`;
  
  // send svaret tilbage
  res.json({ url: fullUrl });
});

// Test route
app.get('/', (req, res) => {
  res.send('Serveren kører! Brug POST /upload for at uploade billeder.');
});

// Server starter
app.listen(PORT, () => {
  console.log(`Serveren kører på port ${PORT}`);
});