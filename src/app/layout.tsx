import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Menu from "@/components/PageMenu";
import MenuContent from "@/components/MenuContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog scolastico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex h-full w-full">
          <Menu />
          <div className="w-full bg-base-100 flex flex-col items-center min-h-[100vh] mt-[104px]">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
