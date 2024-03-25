'use client';

import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./shared/components/header";
import Footer from "./shared/components/footer";
import useStore from "@/lib/store";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { theme } = useStore();
  
  return (
    <html lang="en" className={`${theme} dark:bg-darkBg`}>
      <head>
        <title>SurfPal</title>
      </head>
      <body className={poppins.className}>
        <Header />
        <main className="mt-24">
            {children}
        </main>
      </body>
    </html>
  );
}
