import React, { useRef, useState, useEffect, useCallback } from "react";
import PDFCards from "./PDFCards";
import { AdminPdfService } from "../../services/AdminPdfService";
import "../../assets/css/AdminPanel.css";

const AdminPanel = () => {
  const [file, setFile] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pdfs, setPdfs] = useState([]);
  const fileInputRef = useRef(null);

  const fetchPDFs = useCallback(async () => {
    try {
      const data = await AdminPdfService.getAllPDFs();
      setPdfs(data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  }, []);

  useEffect(() => {
    fetchPDFs();
  }, [fetchPDFs]);

  const handleFileSelect = () => fileInputRef.current?.click();

  const validateFileAndDate = (file, date) => {
    return !file || file.type !== "application/pdf"
      ? (setMessage({ type: "error", text: "Only PDF file format accepted" }),
        false)
      : !date
      ? (setMessage({ type: "error", text: "Date field is required" }), false)
      : true;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (validateFileAndDate(selectedFile, selectedDate)) {
      setFile(selectedFile);
      setMessage({ type: "", text: "" });
      uploadFile(selectedFile, selectedDate);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (validateFileAndDate(droppedFile, selectedDate)) {
      setFile(droppedFile);
      setMessage({ type: "", text: "" });
      uploadFile(droppedFile, selectedDate);
    }
  };

  const handleDateChange = (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    setMessage({ type: "", text: "" });
    if (file) uploadFile(file, newDate);
  };

  const simulateProgress = () =>
    new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(
        () =>
          progress <= 100
            ? setUploadProgress(progress++)
            : (clearInterval(interval), resolve()),
        50
      );
    });

  const uploadFile = async (file, date) => {
    if (!file || !date) {
      setMessage({ type: "error", text: "Please select a file and a date" });
      return;
    }
    try {
      setUploadProgress(0);
      const progressPromise = simulateProgress();
      const uploadPromise = AdminPdfService.uploadPDF(file, date);
      const [response] = await Promise.all([uploadPromise, progressPromise]);
      if (response.status === 201) {
        setUploadProgress(100);
        setTimeout(() => {
          setMessage({ type: "success", text: "PDF uploaded successfully" });
          setFile(null);
          setSelectedDate("");
          setUploadProgress(0);
          fetchPDFs();
        }, 500);
      }
    } catch (error) {
      setMessage({ type: "error", text: "Failed to upload PDF" });
      console.error("Error uploading PDF:", error);
      setUploadProgress(0);
    }
  };

  return (
    <>
      <nav className="navbar">
        <h1 className="nav-title">Admin Panel</h1>
      </nav>
      <div className="container">
        <h2 className="title">PDF Document</h2>
        <p className="subtitle">Upload only a PDF file..</p>
        <div className="date-container">
          <label className="date-label" htmlFor="dateInput">
            Select a date:
          </label>
          <input
            className="date-input"
            type="date"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div
          className="upload-area"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {file && <p className="selected-file">Selected file: {file.name}</p>}
          <div className="file-icon" />
          <button className="choose-file-button" onClick={handleFileSelect}>
            CHOOSE FILE
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf"
            style={{ display: "none" }}
          />
          <p className="drop-text">or drop file here</p>
          {uploadProgress > 0 && (
            <>
              <p className="uploading-text">Uploading...</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${uploadProgress}%` }}
                >
                  <span className="progress-text">{uploadProgress}%</span>
                </div>
              </div>
            </>
          )}
          {message.text &&
            (message.type === "error" ? (
              <div className="alert-message">{message.text}</div>
            ) : (
              <div className="success-message">{message.text}</div>
            ))}
        </div>
        <h2 className="title-two">Uploaded PDF Documents</h2>
        <PDFCards pdfs={pdfs} fetchPDFs={fetchPDFs} />
      </div>
    </>
  );
};

export default AdminPanel;
