import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const AdminPdfService = {
  getAllPDFs: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pdf/all`);
      return response.data;
    } catch (error) {
      console.error('Error fetching PDFs:', error);
      throw error;
    }
  },

  uploadPDF: async (file, date) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('date', date);

    try {
      const response = await axios.post(`${BASE_URL}/pdf/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response;
    } catch (error) {
      console.error('Error uploading PDF:', error);
      throw error;
    }
  },

  deletePDF: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/pdf/delete/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting PDF:', error);
      throw error;
    }
  },
};