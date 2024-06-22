import React, { useState } from "react";
import PDFCard from "./PDFCard";
import "../../assets/css/UserPanel.css";
import { userPdfService } from "../../services/UserPdfService";

const UserPanel = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [pdfs, setPdfs] = useState([]);
  const [message, setMessage] = useState("");

  const handleDateChange = async (event) => {
    const newDate = event.target.value;
    setSelectedDate(newDate);
    if (newDate) {
      try {
        const data = await userPdfService.getPdfsByDate(newDate);
        setPdfs(data);
        if (data.length === 0) {
          setMessage("No PDFs found for the selected date.");
        } else {
          setMessage("");
        }
      } catch (error) {
        console.error("Error fetching PDFs:", error);
        setMessage("Error fetching PDFs. Please try again.");
      }
    } else {
      setPdfs([]);
      setMessage("");
    }
  };

  return (
    <>
      <nav className="navbar">
        <h1 className="nav-title">User Panel</h1>
      </nav>
      <div className="container">
        <h2 className="title">PDF Document Viewer</h2>
        <p className="subtitle">Search a PDF file by uploaded date..</p>
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
        {message && <p className="message">{message}</p>}
        <div className="pdf-cards">
          {pdfs.map((pdf) => (
            <PDFCard key={pdf._id} pdf={pdf} />
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPanel;