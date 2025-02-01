import axios from "axios";
import { Company } from "../types";

const API_URL = "http://45.138.158.137:92/api"; // Replace with your API URL

export const companyApi = {
  getCompanies: async () => {
    const response = await axios.get(`${API_URL}/companies/get-all`);
    return response.data;
  },

  addCompany: async (data: Omit<Company, "id">) => {
    const response = await axios.post(`${API_URL}/companies/add`, data);
    return response.data;
  },

  updateCompany: async (id: string, data: Partial<Company>) => {
    const response = await axios.put(
      `${API_URL}/companies/update`,
      { id, ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  deleteCompany: async (id: string) => {
    const response = await axios.delete(`${API_URL}/companies/delete/by-id`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: id,
    });
    return response.data;
  },
};
