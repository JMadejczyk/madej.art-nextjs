"use client";
import { RiCopyrightLine } from "react-icons/ri";
import { goudy } from "@/app/ui/fonts";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <div
      className={` w-full bg-dark-gray bg-[url('/img/noise_transparent.png')] text-white p-4 text-center flex items-center justify-center shadow-custom_shadow_light antialiased ${goudy.className}`}
    >
      <span>Copyright </span> &nbsp;
      <RiCopyrightLine /> &nbsp;
      <span className="text-lg pb-1">{year}</span> &nbsp;
      <span> Jakub Madejczyk</span>
    </div>
  );
}
