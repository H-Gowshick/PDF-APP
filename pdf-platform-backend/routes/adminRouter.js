const express = require("express");
const multer = require("multer");
const path = require("path");
const PDF = require("../models/PDF-Model"); // Adjust the path as necessary
const fs = require("fs");
const router = express.Router();
// Multer setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to handle file upload
router.post("/upload", upload.single("file"), (req, res) => {
  const { date } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const newPDF = new PDF({
    name: file.originalname,
    url: `/uploads/${file.filename}`,
    date: date,
  });

  newPDF
    .save()
    .then(() => res.status(201).json({ message: "PDF uploaded successfully" }))
    .catch((err) => res.status(500).send(err));
});

router.get("/all", (req, res) => {
  PDF.find({})
    .then((pdfs) => {

      res.status(200).json(pdfs);
    })
    .catch((err) => {
    
      res.status(500).send(err);
    });
});


// Route to delete a specific PDF by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const pdfId = req.params.id;
    const pdf = await PDF.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ message: "PDF not found" });
    }

    // Delete file from uploads folder (assuming file system storage)
    const filePath = `./uploads/${pdf.url.split('/uploads/')[1]}`; // Adjust based on your file storage logic
    // Delete from MongoDB
    await pdf.deleteOne();

   
     fs.unlinkSync(filePath);

    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error("Error deleting PDF:", error);
    res.status(500).json({ message: "Failed to delete PDF" });
  }
});


module.exports = router;
