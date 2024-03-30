"use client";
import Image from "next/image";
import photo from "@/public/img/_KWJ9509.jpg";
import { caveat } from "@/app/ui/fonts";
import Header from "../ui/header";
import Footer from "../ui/footer";
import { motion, animate } from "framer-motion";

const sentence = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.018,
      when: "beforeChildren",
    },
  },
};

const letter = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export default function About() {
  const lines =
    "„Przykazanie dla fotografów i innych twórców: ^nie pożyczaj duszy od innego artysty, choćby nie ^wiem jak ci się spodobała, ponieważ w tym samym ^momencie stracisz swoją duszę, która jest źródłem ^wyjątkowości tego, co robisz” – Joanna Rybczyńska";
  return (
    <div className="bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed min-h-screen flex flex-col justify-center">
      <main
        className={`min-h-full h-auto flex flex-col-reverse lg:flex-row justify-center items-center pb-36`}
      >
        <motion.div
          className={`w-[345px] sm:w-[430px] md:w-[415px] font-[#F2F2F2] text-[#F2F2F2]  text-xl sm:text-2xl ml-6 mr-6 md:mr-16 md:ml-16 drop-shadow-custom_shadow flex flex-wrap ${caveat.className}`}
          //
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {lines.split("").map((char, index) => {
            if (char === " ") {
              return <span key={"1" + char + "-" + index}> &nbsp; </span>;
            }
            if (char === "^") {
              return (
                <div key={"1" + char + "-" + index} className={`w-full`}>
                  {"\n"}
                </div>
              );
            }
            return (
              <motion.p
                key={"1" + char + "-" + index}
                variants={letter}
                className="block"
              >
                {char}
              </motion.p>
            );
          })}
        </motion.div>
        <motion.div
          className="bg-[url('/img/noise_transparent.png')] bg-fixed w-4/6 md:w-[400px] bg-dark-gray p-6 md:p-8 rounded-md shadow-custom_shadow_light m-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image src={photo} alt="Jakub Madejczyk" priority />
        </motion.div>
      </main>
    </div>
  );
}
