import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Credit Repair App",
  description: "A web app for credit repair",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='relative'>
        {children}
      </body>
    </html>
  );
}
