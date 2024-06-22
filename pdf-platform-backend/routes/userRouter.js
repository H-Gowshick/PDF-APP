const express = require("express");
const PDF = require("../models/PDF-Model"); 
const router = express.Router();


router.get("/byDate/:date", async (req, res) => {
  try {
    const pdfs = await PDF.find({ date: req.params.date });    
    res.json(pdfs);
  } catch (error) {
    console.error("Error fetching PDFs by date:", error);
    res.status(500).json({ message: "Error fetching PDFs" });
  }
});


module.exports = router;
