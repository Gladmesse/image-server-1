const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Gør uploads-mappen statisk
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer opsætning
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

// Upload-route
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Ingen fil uploadet" });
  }
  const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ url: fullUrl });
});

// Test
app.get("/", (req, res) => {
  res.send("Serveren kører! Brug POST /upload med Postman.");
});

app.listen(PORT, () => {
  console.log(`Server kører på port ${PORT}`);
});