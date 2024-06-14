import { RegisterPayload } from "@/lib/types";
import axios from "axios";

export const registerUser = (payload: RegisterPayload) => {
  return axios.post("/api/register", payload);
};
