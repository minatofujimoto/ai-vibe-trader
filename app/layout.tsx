import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Vibe Trader",
  description: "AI-powered trading agent with live execution via Aster API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
// Unit feature implementation - 20250408_0048
