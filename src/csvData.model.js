const mongoose = require("mongoose");

const csvDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
});

const CsvData = mongoose.model("CsvData", csvDataSchema);

module.exports = CsvData;
