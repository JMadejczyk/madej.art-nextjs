"use client";
// import { motion, animate } from "framer-motion";
// import { caveat } from "@/app/ui/fonts";

export default function Contact() {
  return (
    <div className="bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed min-h-screen flex flex-col ">
      <h1 className="text-3xl text-center m-20">Kontakt</h1>
      <form className="flex flex-col items-center justify-center gap-4">
        <input type="text" name="imie" id="imie" />
        <input type="text" name="nazwisko" id="nazwisko" />
        <input type="text" name="mail" id="mail" />
        <textarea name="message" id="message" cols={30} rows={10}></textarea>
        <input type="text" name="tel" id="tel" />
      </form>
    </div>
  );
}
