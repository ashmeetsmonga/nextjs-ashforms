import { CreateFormPayload, UpdateFormPayload } from "@/lib/types";
import axios from "axios";
import prisma from "@/lib/prisma";

export const createForm = (payload: CreateFormPayload) => {
  return axios.post("/api/auth/addform", payload);
};

export const getFormsByUserID = () => {
  return axios.get("/api/auth/getforms");
};

export const deleteFormByID = (id: string) => {
  return axios.delete(`/api/auth/deleteform?id=${id}`);
};

export const updateForm = (payload: UpdateFormPayload) => {
  return axios.put("/api/auth/updateform", payload);
};

export const getFormByID = (id: string) => {
  return axios.get(`/api/auth/getformbyid?id=${id}`);
};
