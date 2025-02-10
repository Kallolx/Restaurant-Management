import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TAKA_SYMBOL = "৳";

export function formatPrice(
  amount: number | string,
  showCurrencySign = true
): string {
  const numericPrice = typeof amount === "string" ? parseFloat(amount) : amount;
  const f = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(numericPrice);

  return showCurrencySign ? f.replace("$", TAKA_SYMBOL) : f.replace("$", "");
}
