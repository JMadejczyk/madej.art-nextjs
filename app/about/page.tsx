"use client";
import Image from "next/image";
import photo from "@/public/img/_KWJ9509.jpg";
import portrait from "@/public/img/portret.jpg";
import { caveat } from "@/app/ui/fonts";
import { motion } from "framer-motion";
import { goudy } from "@/app/ui/fonts";

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
    y: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

function First() {
  const lines =
    "„Przykazanie dla fotografów i innych twórców: ^nie pożyczaj duszy od innego artysty, choćby nie ^wiem jak ci się spodobała, ponieważ w tym samym ^momencie stracisz swoją duszę, która jest źródłem ^wyjątkowości tego, co robisz” – Joanna Rybczyńska";
  return (
    <div className="bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed min-h-[80vh] flex flex-col justify-center">
      <div
        className={` h-auto flex flex-col-reverse lg:flex-row justify-center items-center `}
      >
        <motion.div
          className={`w-[345px] sm:w-[430px] md:w-[415px] font-[#F2F2F2] text-[#F2F2F2]  text-xl sm:text-2xl ml-6 mr-6 md:mr-16 md:ml-16 drop-shadow-custom_shadow flex flex-wrap ${caveat.className}`}
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
      </div>
    </div>
  );
}

function Second() {
  return (
    <div className="bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed min-h-[90vh] flex flex-col justify-center">
      <div
        className={` h-auto flex flex-col lg:flex-row justify-center items-center `}
      >
        <motion.div
          className="bg-[url('/img/noise_transparent.png')] bg-fixed w-4/6 md:w-[400px] bg-dark-gray p-6 md:p-8 rounded-md shadow-custom_shadow_light m-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image src={portrait} alt="Jakub Madejczyk" priority />
        </motion.div>

        <motion.div
          className={`w-[18rem] min-[460xl]:w-[22rem] sm:w-96 md:w-[28rem] font-[#F2F2F2] text-[#F2F2F2] text-lg sm:text-xl md:text-2xl ml-6 mr-6 md:mr-16 md:ml-16 drop-shadow-custom_shadow flex flex-wrap ${goudy.className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          Cześć, jestem fotografem spod Poznania interesującym się głównie
          fotografią portretową. Jest ona dla mnie nie tylko pasją, ale też
          sposobem na wyrażanie siebie. Niepowtarzalne, nietuzinkowe sesje są
          czymś co najbardziej mnie nakręca.
        </motion.div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <First />
      <Second />
    </>
  );
}
