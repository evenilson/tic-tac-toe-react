import { type ClassNameValue, twJoin, twMerge } from "tailwind-merge"

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(twJoin(inputs))
}
