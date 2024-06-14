import { CreateFormPayload } from "@/lib/types";
import axios from "axios";
import prisma from "@/lib/prisma";

export const createForm = (payload: CreateFormPayload) => {
  return axios.post("/api/auth/addform", payload);
};

export const getFormsByUserID = () => {
  return axios.get("/api/auth/getforms");
};
