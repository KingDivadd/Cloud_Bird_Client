import type { Metadata } from "next";
import "./globals.css";
import {ChatProvider} from '@/app/context/ChatContext'

export const metadata: Metadata = {
  title: "Cloud Bird",
  description: "An AI-driven platform that empowers entrepreneurs and businesses with tools for ideation, growth, funding, and real-time insights in a centralized ecosystem.",
  keywords: "AI Business Tools, Entrepreneurship Platform, Business Growth Assistant, Funding and Planning, Market Insights",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='relative'>
        <ChatProvider>
            <div className="container mx-auto ">
              {children}
            </div>
          </ChatProvider>
      </body>
    </html>
  );
}
