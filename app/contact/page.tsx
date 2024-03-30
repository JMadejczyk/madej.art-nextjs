"use client";
import { motion, animate } from "framer-motion";
import { caveat } from "@/app/ui/fonts";

export default function Contact() {
  const line1 = "„Przykazanie dla fotografów i innych twórców: ";
  const line2 = "nie pożyczaj duszy od innego artysty, choćby nie ";
  const line3 = "wiem jak ci się spodobała, ponieważ w tym samym ";
  const line4 = "momencie stracisz swoją duszę, która jest źródłem ";
  const line5 = "wyjątkowości tego, co robisz” – Joanna Maria Rybczyńska";

  const sentence = {
    hidden: { opacity: 1, x: "100px" },
    visible: {
      opacity: 1,
      x: 0,

      transition: {
        delay: 0.5,
        staggerChildren: 0.018,
        when: "beforeChildren",
        ease: "easeInOut",
      },
    },
  };
  const letter = {
    hidden: {
      opacity: 0,
      x: "100px",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
      },
      // animate: {
      //   duration: 10,
      //   ease: "easeOut",
      // },
    },
  };

  return (
    <>
      {/* <motion.p
    className={`w-4/6 md:w-[400px] font-[#F2F2F2] text-[#F2F2F2] text-2xl m-6 md:m-16 drop-shadow-custom_shadow ${caveat.className}`}
    variants={sentence}
    initial="hidden"
    animate="visible"
    > */}
      {/* TODO make it less stupid */}

      {line1.split("").map((char, index) => {
        return (
          <motion.p
            key={"1" + char + "-" + index}
            variants={letter}
            initial="hidden"
            animate="visible"
          >
            {char}
          </motion.p>
        );
      })}
      {line2.split("").map((char, index) => {
        return (
          <motion.p
            key={"2" + char + "-" + index}
            variants={letter}
            initial="hidden"
            animate="visible"
          >
            {char}
          </motion.p>
        );
      })}
      {line3.split("").map((char, index) => {
        return (
          <motion.p
            key={"3" + char + "-" + index}
            variants={letter}
            initial="hidden"
            animate="visible"
          >
            {char}
          </motion.p>
        );
      })}
      {line4.split("").map((char, index) => {
        return (
          <motion.p
            key={"4" + char + "-" + index}
            variants={letter}
            initial="hidden"
            animate="visible"
          >
            {char}
          </motion.p>
        );
      })}
      {line5.split("").map((char, index) => {
        return (
          <motion.p
            key={"5" + char + "-" + index}
            variants={letter}
            initial="hidden"
            animate="visible"
          >
            {char}
          </motion.p>
        );
      })}
      {/* </motion.p> */}
    </>
  );
}
