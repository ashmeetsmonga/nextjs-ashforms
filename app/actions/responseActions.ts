import { ResponsePayload } from "@/lib/types";
import axios from "axios";

export const addResponse = (payload: ResponsePayload) => {
  return axios.post("/api/auth/addresponse", payload);
};
