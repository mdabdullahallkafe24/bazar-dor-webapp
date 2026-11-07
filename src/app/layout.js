import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "বাজার দর | BazarDor",
  description:
    "প্রয়োজনীয় পণ্যের দাম এক নজরে — বাংলাদেশের বাজারদর দেখুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
