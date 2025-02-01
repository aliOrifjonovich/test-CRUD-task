import axios from "axios";

const API_URL = "http://45.138.158.137:92/api";

// Update axios interceptor to handle token correctly
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  signup: async (data: {
    login: string;
    password: string;
    fullName: string;
  }) => {
    const response = await axios.post(`${API_URL}/auths/sign-up`, data);
    return response.data;
  },

  signin: async (data: { login: string; password: string }) => {
    const response = await axios.post(`${API_URL}/auths/sign-in`, data);
    // Store the token without any modifications
    localStorage.setItem("token", response.data);
    return response.data;
  },

  logout: async () => {
    localStorage.removeItem("token");
    return null;
  },
};
