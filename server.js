// server.js eller index.js

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Aktiver CORS
app.use(cors());

// Gør uploads-mappen statisk
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer opsætning til fil-upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Én upload-route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Ingen fil uploadet" });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  const fullUrl = `${req.protocol}://${req.get("host")}${fileUrl}`;
  res.json({ url: fullUrl });
});

// Test route
app.get("/", (req, res) => {
  res.send("Serveren kører! Brug POST /upload for at uploade billeder.");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server kører på port ${PORT}`);
});