import type { Metadata } from "next";
import { Cormorant_Upright, Open_Sans, Inter } from "next/font/google";
import clsx from "clsx";
import "./globals.scss";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Najd",
  description: "Najd",
  icons: {
    icon: "/favicon.png",
  },
};

const cormorant = Cormorant_Upright({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-open-sans",
});

const interFont = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={clsx(
        cormorant.variable,
        openSans.variable,
        interFont.variable
      )}
    >
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
