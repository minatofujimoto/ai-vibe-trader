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
// Unit feature implementation - 20250410_0052
// Unit feature implementation - 20250415_0062
// Unit feature implementation - 20250422_0075
// Unit feature implementation - 20250423_0078
