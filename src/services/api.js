import axios from "axios";

const API = axios.create({
 baseURL: process.env.REACT_APP_API_URL,
});

export const registerUser   = (data) => API.post("/register", data);
export const loginUser      = (data) => API.post("/login", data);
export const forgotPassword = (data) => API.post("/forgot-password", data);
export const validateToken  = (token) => API.get(`/reset-password/${token}`);
export const resetPassword  = (token, data) => API.post(`/reset-password/${token}`, data);