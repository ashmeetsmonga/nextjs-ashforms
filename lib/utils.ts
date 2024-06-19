import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookie } from "cookies-next";
import { decodeToken } from "./token";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  const d = new Date(date);
  const formattedDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  return formattedDate;
}

export const isValidToken = async (token: string) => {
  let validToken = true;
  let userData = null;
  try {
    userData = await decodeToken(token);
  } catch (e) {
    validToken = false;
  }
  return { validToken, userData };
};
