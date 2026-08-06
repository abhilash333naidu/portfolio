import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { CursorFlare } from "@/components/cursor-flare";
import { ChatBot } from "@/components/animations/chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Better font loading performance
});

export const metadata: Metadata = {
  title: "Abhilash Naidu Paspulati | Engineering Manager & Systems Engineer",
  description: "Engineering Manager with 10+ years delivering safety-critical, capital-intensive programs across pharmaceutical manufacturing, precision engineering, and regulated industries. Expert in systems engineering, GMP compliance, and technology transfer.",
  keywords: ["Engineering Manager", "Systems Engineer", "GMP", "Pharmaceutical", "Technology Transfer", "Project Banksia", "TGA", "FDA", "CATIA", "FEA", "FMEA"],
  authors: [{ name: "Abhilash Naidu Paspulati" }],
  openGraph: {
    title: "Abhilash Naidu Paspulati | Engineering Manager & Systems Engineer",
    description: "Delivering high-stakes capital programs in regulated industries. 10+ years in pharmaceutical manufacturing, systems engineering, and safety-critical design.",
    type: "website",
  },
  other: {
    "viewport": "width=device-width, initial-scale=1.0, maximum-scale=5.0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-text-primary`}
        style={{
          minWidth: "100vw",
          overflowX: "hidden",
        }}
      >
        <CursorFlare />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <ChatBot />
      </body>
    </html>
  );
}
