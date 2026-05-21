import { Rethink_Sans, Yellowtail } from "next/font/google";

/** Retro brush-script for headings, logos, and hero phrases */
export const yellowtail = Yellowtail({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-yellowtail",
  display: "swap",
});

/** Clean contemporary sans for body text and UI elements */
export const rethinkSans = Rethink_Sans({
  subsets: ["latin"],
  variable: "--font-rethink",
  display: "swap",
});
