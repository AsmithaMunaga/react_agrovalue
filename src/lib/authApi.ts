import api from "./api";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

export const requestOtp = async (email: string) => {
  const response = await api.post("/api/auth/login/request-otp", {
    email,
  });
  return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await api.post("/api/auth/login/verify-otp", {
    email,
    otp,
  });
  return response.data;
};