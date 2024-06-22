import React from "react";

const PDFCard = ({ pdf }) => {
  return (
    <div className="pdf-card">
      <h3>{pdf.name}</h3>
      <p>Date: {pdf.date}</p>
      <a href={`http://localhost:5000${pdf.url}`} target="_blank" rel="noopener noreferrer">
        View PDF
      </a>
    </div>
  );
};

export default PDFCard;