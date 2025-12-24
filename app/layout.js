import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "../components/SessionWrapper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ai - Adaptive Learning Platform",
  description: "An adaptive learning platform powered by AI to personalize your learning journey.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        
        <SessionWrapper>

          <Navbar />

          {children}

          <Footer />

        </SessionWrapper>
      </body>
    </html>
  );
}
