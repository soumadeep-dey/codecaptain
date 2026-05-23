import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ytThumb(
  videoId: string,
  quality: "mqdefault" | "hqdefault" | "maxresdefault" = "mqdefault",
) {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
