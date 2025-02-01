var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
const API_URL = "http://45.138.158.137:92/api";
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const authApi = {
    signup: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.post(`${API_URL}/auths/sign-up`, data);
        return response.data;
    }),
    signin: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.post(`${API_URL}/auths/sign-in`, data);
        localStorage.setItem("token", response.data);
        return response.data;
    }),
    logout: () => __awaiter(void 0, void 0, void 0, function* () {
        localStorage.removeItem("token");
        return null;
    }),
};
