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

const themeInitScript = `
(() => {
  try {
    const stored = localStorage.getItem('luxive-theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = stored === 'dark' || stored === 'light' ? stored : preferred;
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch {
    document.documentElement.dataset.theme = 'light';
  }
})();
`;

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
