import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../ui/header";
import Footer from "../ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Madej.art Photography",
  description: "Photography portfolio site",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
