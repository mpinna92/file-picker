import type { Metadata } from "next";
import { inter } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "File Picker Stack AI",
  description: "Take-at-Home Task - Frontend Engineer - Maximiliano Pinna",
  applicationName: "File Picker",
  authors: { name: "Maximiliano Pinna", url: "https://github.com/mpinna92" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
