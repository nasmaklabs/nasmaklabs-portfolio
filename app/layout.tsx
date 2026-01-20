import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nasmak Labs | Software & Product Studio",
  description: "We build digital products that matter. From concept to launch, we transform ambitious ideas into exceptional digital experiences.",
  keywords: ["software development", "product studio", "web development", "mobile apps", "AI integration", "product design"],
  authors: [{ name: "Nasmak Labs" }],
  openGraph: {
    title: "Nasmak Labs | Software & Product Studio",
    description: "We build digital products that matter.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030303]`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
