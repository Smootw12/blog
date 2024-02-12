import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Menu from "@/components/Menu/PageMenu";
import { defaultTheme } from "@/lib/themes";

import { getCookies } from "next-client-cookies/server";
import { Toaster } from "react-hot-toast";
import ClientProviders from "@/components/ClientProviders";
const inter = Inter({ subsets: ["latin"] });
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog scolastico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = getCookies().get("theme");
  return (
    <html data-theme={theme || defaultTheme} lang="it">
      <body className={inter.className}>
        <ClientProviders value={cookies().getAll()}>
          <Navbar />
          <div className="flex h-full w-full">
            <Menu />
            <div className="w-full bg-base-100 flex flex-col items-center min-h-[100vh] mt-[104px]">
              {children}
            </div>
          </div>
          <Footer />
          <Toaster position="top-center" containerClassName="toast" />
        </ClientProviders>
      </body>
    </html>
  );
}
