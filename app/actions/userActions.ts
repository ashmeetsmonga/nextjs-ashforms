import { LoginPayload, RegisterPayload } from "@/lib/types";
import axios from "axios";

export const registerUser = (payload: RegisterPayload) => {
  return axios.post("/api/register", payload);
};

export const loginUser = (payload: LoginPayload) => {
  return axios.post("/api/login", payload);
};

export const getUserDetails = (id: string) => {
  return axios.get(`/api/userdetails?id=${id}`);
};
