const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  name: String,
  url: String,
  date: String,
});

const PDF = mongoose.model("PDF", pdfSchema);

module.exports = PDF;
