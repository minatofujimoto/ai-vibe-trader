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
// Unit feature implementation - 20250424_0080
// Unit feature implementation - 20250501_0095
// Unit feature implementation - 20250602_0153
// Unit feature implementation - 20250613_0172
// Unit feature implementation - 20250620_0181
// Unit feature implementation - 20250702_0198
