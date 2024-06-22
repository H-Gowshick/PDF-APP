import React from "react";
import axios from "axios";

const PDFCard = ({ pdf }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:5000${pdf.url}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', pdf.name);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="pdf-card">
      <h3>{pdf.name}</h3>
      <p>Date: {pdf.date}</p>
      <div className="pdf-actions">
        <a 
          href={`http://localhost:5000${pdf.url}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="view-button"
        >
          View PDF
        </a>
        <button 
          onClick={handleDownload}
          className="download-button"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PDFCard;