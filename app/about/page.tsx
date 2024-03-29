"use client";
import Image from "next/image";
import photo from "@/public/img/_KWJ9509.jpg";
import { caveat } from "@/app/ui/fonts";
import Header from "../ui/header";
import Footer from "../ui/footer";
import { motion, animate } from "framer-motion";

export default function About() {
  //   const lines = [
  //     ",,Przykazanie dla fotografów i innych twórców:",
  //     "nie pożyczaj duszy od innego artysty, choćby nie",
  //     "wiem jak ci się spodobała, ponieważ w tym samym",
  //     "momencie stracisz swoją duszę, która jest źródłem",
  //     "wyjątkowości tego, co robisz” – Joanna Maria Rybczyńska",
  //   ];
  const line1 = "„Przykazanie dla fotografów i innych twórców: ";
  const line2 = "nie pożyczaj duszy od innego artysty, choćby nie ";
  const line3 = "wiem jak ci się spodobała, ponieważ w tym samym ";
  const line4 = "momencie stracisz swoją duszę, która jest źródłem ";
  const line5 = "wyjątkowości tego, co robisz” – Joanna Maria Rybczyńska";
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.018,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed min-h-screen flex flex-col justify-center">
      {/* <Header /> */}
      <main
        className={`min-h-full h-auto flex flex-row justify-center items-center pb-36`}
      >
        {/* TODO text letter by letter showing animation */}
        <motion.p
          className={`w-[400px] font-[#F2F2F2] text-[#F2F2F2] text-2xl m-16 drop-shadow-custom_shadow ${caveat.className}`}
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {/* TODO make it less stupid */}

          {line1.split("").map((char, index) => {
            return (
              <motion.span key={"1" + char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            );
          })}
          {line2.split("").map((char, index) => {
            return (
              <motion.span key={"2" + char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            );
          })}
          {line3.split("").map((char, index) => {
            return (
              <motion.span key={"3" + char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            );
          })}
          {line4.split("").map((char, index) => {
            return (
              <motion.span key={"4" + char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            );
          })}
          {line5.split("").map((char, index) => {
            return (
              <motion.span key={"5" + char + "-" + index} variants={letter}>
                {char}
              </motion.span>
            );
          })}
        </motion.p>
        <motion.div
          className="bg-[url('/img/noise_transparent.png')] bg-fixed w-[400px] bg-dark-gray p-8 rounded-md shadow-custom_shadow_light mt-10 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image src={photo} alt="Jakub Madejczyk" priority />
        </motion.div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
