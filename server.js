const express = require("express");
const multer = require("multer");
const csvParser = require("csv-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const { handleCsvUpload, getPaginatedData } = require("./src/csvUpload");

// Database connection setup
mongoose.connect("mongodb://localhost:27017/noapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Multer configuration for handling CSV file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ messageFromDeveloper: "Server up" });
});

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  try {
    const result = await handleCsvUpload(req.file.buffer);

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ errorMessage: error });
  }
});

app.get("/data", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page, default is 1
  const pageSize = parseInt(req.query.pageSize) || 10; // Number of records per page, default is 10

  try {
    const paginatedData = await getPaginatedData(page, pageSize);
    res.status(200).json(paginatedData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;