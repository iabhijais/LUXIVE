import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import AnnouncementBar from "../components/AnnouncementBar";
import GlobalLuxeBot from "../components/GlobalLuxeBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUXIVE - Premium Luxury E-commerce",
  description: "India's #1 destination for authentic sneakers, luxury fashion, and premium perfumes. Curated collections of the rarest drops.",
  icons: {
    icon: '/luxive-brand-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            <AnnouncementBar />
            <Navbar />
            <CartDrawer />
            {children}
            <GlobalLuxeBot />
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
