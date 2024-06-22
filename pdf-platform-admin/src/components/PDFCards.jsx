
import React from "react";
import styled from "styled-components";
import axios from "axios";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;r

`;

const Card = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
`;

const PDFName = styled.h3`
  font-size: 16px;
  margin: 0 0 10px 0;
`;

const PDFDate = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 10px 0;
`;

const ViewButton = styled.a`
  display: inline-block;
  background-color: #00bcd4;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    background-color: #02bce2;
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  margin-top: 10px;
  margin-left:20px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #d32f2f;
  }
`;

const PDFCards = ({ pdfs, fetchPDFs }) => {
    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`http://localhost:5000/pdf/delete/${id}`);
        if (response.status === 200) {
          fetchPDFs(); 
        }
      } catch (error) {
        console.error("Error deleting PDF:", error);
      }
    };
    return (
      <CardContainer>
        {pdfs.map((pdf) => (
          <Card key={pdf._id}>
            <PDFName>{pdf.name}</PDFName>
            <PDFDate>Date: {pdf.date}</PDFDate>
            <ViewButton
              href={`http://localhost:5000${pdf.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View PDF
            </ViewButton>
            <DeleteButton onClick={() => handleDelete(pdf._id)}>Delete</DeleteButton>
          </Card>
        ))}
      </CardContainer>
    );
  };
  
export default PDFCards;
