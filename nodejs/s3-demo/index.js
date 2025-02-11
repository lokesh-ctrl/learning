// Import dependencies
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const port = 4321;

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.AWS_BUCKET_NAME;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "public")));

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const file = req.file;
  const params = {
    Bucket: bucketName,
    Key: `uploads/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const uploadResult = await s3.upload(params).promise();
    res.json({ fileUrl: uploadResult.Location });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).send("Error uploading file");
  }
});

app.get("/files", async (req, res) => {
  try {
    const data = await s3
      .listObjectsV2({ Bucket: bucketName, Prefix: "uploads/" })
      .promise();
    const files = data.Contents.map((file) => ({
      url: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.Key}`,
      key: file.Key,
    }));
    res.json(files);
  } catch (error) {
    console.error("S3 List Error:", error);
    res.status(500).send("Error fetching files");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
