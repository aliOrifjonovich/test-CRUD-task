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
export const companyApi = {
    getCompanies: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get(`${API_URL}/companies/get-all`);
        return response.data;
    }),
    addCompany: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.post(`${API_URL}/companies/add`, data);
        return response.data;
    }),
    updateCompany: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.put(`${API_URL}/companies/update`, Object.assign({ id }, data), {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }),
    deleteCompany: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.delete(`${API_URL}/companies/delete/by-id`, {
            headers: {
                "Content-Type": "application/json",
            },
            data: id,
        });
        return response.data;
    }),
};
