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
  title: "Abhilash Naidu Paspulati | Mechanical Engineer, Technology Transfer",
  description: "Engineers Australia-assessed Mechanical Engineer in Melbourne. 7 years in pharma and biopharma, including technology transfer on CSL Seqirus's AUD 800M Project Banksia. Open to regulated life sciences roles.",
  keywords: ["Mechanical Engineer", "Technology Transfer", "GMP", "Pharmaceutical", "Biopharma", "Melbourne", "Project Banksia", "TGA", "FDA", "CSL Seqirus"],
  authors: [{ name: "Abhilash Naidu Paspulati" }],
  openGraph: {
    title: "Abhilash Naidu Paspulati | Mechanical Engineer, Technology Transfer",
    description: "Engineers Australia-assessed Mechanical Engineer in Melbourne. 7 years in pharma and biopharma, including technology transfer on CSL Seqirus's AUD 800M Project Banksia.",
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
