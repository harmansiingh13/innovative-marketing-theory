import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./designSystem/globals.css";
import "./designSystem/colors.css";
import logo from "./designSystem/images/imt-logooo.png";
import { ToasterProvider } from "@/shared/components/Toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Innovative Marketing Theory",
  description: "Innovative Marketing Theory",
  icons: {
    icon: logo.src,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className={inter.className}>
        {children}
        <ToasterProvider />
      </body>
    </html>
  );
}
