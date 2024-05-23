"use client";
// import { motion, animate } from "framer-motion";
// import { caveat } from "@/app/ui/fonts";

export default function Contact() {
  return (
    <div className="bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed min-h-screen flex flex-col items-center pt-24 ">
      <h1 className="text-3xl text-center m-10">Kontakt</h1>
      <form className="flex flex-col justify-center gap-4 w-[80vw] sm:w-96 text-[white]">
        <input
          className={`h-11 bg-[#313131] border p-3 rounded-md`}
          type="text"
          name="imie"
          id="imie"
          placeholder="Imię"
        />
        <input
          className={`h-11 bg-[#313131] border p-3 rounded-md`}
          type="text"
          name="nazwisko"
          id="nazwisko"
          placeholder="Nazwisko"
        />
        <input
          className={`h-11 bg-[#313131] border p-3 rounded-md`}
          type="text"
          name="mail"
          id="mail"
          placeholder="adres@mail"
        />
        <textarea
          className={`bg-[#313131] border p-3 rounded-md`}
          name="message"
          id="message"
          cols={30}
          rows={8}
          placeholder="Wiadomość"
        ></textarea>
        <input
          className={`h-11 bg-[#313131] border p-3 rounded-md`}
          type="text"
          name="tel"
          id="tel"
          placeholder="Numer telefonu"
        />
      </form>
    </div>
  );
}
