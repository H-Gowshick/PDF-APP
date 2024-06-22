import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const userPdfService = {
  getPdfsByDate: async (date) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pdf/byDate/${date}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      throw error;
    }
  }
};

export default userPdfService;