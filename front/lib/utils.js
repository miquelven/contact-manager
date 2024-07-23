import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
}
