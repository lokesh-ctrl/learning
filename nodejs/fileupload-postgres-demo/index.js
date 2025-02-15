const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const port = 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const file = req.file;
  try {
    const result = await pool.query(
      "INSERT INTO images (filename, mimetype, data) VALUES ($1, $2, $3) RETURNING id",
      [file.originalname, file.mimetype, file.buffer]
    );
    res.json({ fileId: result.rows[0].id });
  } catch (error) {
    console.error("PostgreSQL Upload Error:", error);
    res.status(500).send("Error uploading file");
  }
});

app.get("/files", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, filename FROM images");
    res.json(result.rows);
  } catch (error) {
    console.error("PostgreSQL List Error:", error);
    res.status(500).send("Error fetching files");
  }
});

app.get("/file/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT filename, mimetype, data FROM images WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length > 0) {
      res.setHeader("Content-Type", result.rows[0].mimetype);
      res.send(result.rows[0].data);
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    console.error("PostgreSQL Retrieve Error:", error);
    res.status(500).send("Error retrieving file");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const fs = require("fs");
const internal = require("stream");
fs.writeFileSync("public/index.html", frontend);
