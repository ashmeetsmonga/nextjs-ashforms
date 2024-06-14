import { CreateFormPayload } from "@/lib/types";
import axios from "axios";

export const createForm = (payload: CreateFormPayload) => {
  return axios.post("/api/auth/addform", payload);
};
