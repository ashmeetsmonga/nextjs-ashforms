import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  const d = new Date(date);
  const formattedDate = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
  return formattedDate;
}
