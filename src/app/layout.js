import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// বাংলা টেক্সটের জন্য অপ্টিমাইজড ফন্ট (self-hosted, no layout shift)।
const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-bengali",
  fallback: ["Hind Siliguri", "Nirmala UI", "sans-serif"],
});

export const metadata = {
  title: "বাজার দর | BazarDor",
  description:
    "প্রয়োজনীয় পণ্যের দাম এক নজরে — বাংলাদেশের বাজারদর দেখুন।",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#008b45",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={notoSansBengali.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
