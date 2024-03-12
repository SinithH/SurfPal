'use client';

import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./shared/components/header";
import Body from "./shared/components/body";
import Hero from "./shared/components/hero";
import Footer from "./shared/components/footer";
import MainFeatures from "./shared/components/mainFeature";
import UseCase from "./shared/components/useCase";

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
        <Hero/>
        <MainFeatures/>
        <UseCase/>
        <Footer/>
        <main className="mt-16">
            {children}
        </main>
      </body>
    </html>
  );
}
