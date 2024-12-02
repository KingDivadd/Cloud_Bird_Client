import type { Metadata } from "next";
import "./globals.css";
import {ChatProvider} from '@/app/context/ChatContext'

export const metadata: Metadata = {
  title: "Cloud Bird",
  description: "Cloud Bird is an all-in-one business growth platform that empowers entrepreneurs and businesses with AI-driven tools to start, grow, and scale efficiently.",
  keywords: "Business Growth, AI Tools, Productivity Platform, Startup Solutions, All-in-One Business Tool",
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
