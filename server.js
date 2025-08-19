const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

// hvor filer skal gemmes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads")); // gør billeder offentlige

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

app.get("/", (req, res) => {
  res.send("Serveren kører! Brug POST /upload for at uploade billeder.");
});

app.listen(process.env.PORT || 3000, () => console.log("Server kører"));