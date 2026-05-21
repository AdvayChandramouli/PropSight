import type { Metadata } from "next";
import { rethinkSans, yellowtail } from "@/lib/config/fonts";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "PropSight · STR Pricing Intelligence",
  description:
    "ML-driven short-term rental pricing intelligence — smarter pricing, sunnier yields.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${yellowtail.variable} ${rethinkSans.variable}`}
    >
      <body className="font-body antialiased">
        <AnimatedBackground>{children}</AnimatedBackground>
      </body>
    </html>
  );
}
