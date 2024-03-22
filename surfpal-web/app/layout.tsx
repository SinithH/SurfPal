'use client';

import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./shared/components/header";
import Footer from "./shared/components/footer";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        <main className="mt-24">
            {children}
        </main>
      </body>
    </html>
  );
}
