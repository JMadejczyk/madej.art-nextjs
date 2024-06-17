"use client";
// import { motion, animate } from "framer-motion";
// import { caveat } from "@/app/ui/fonts";
import {
  FiMessageSquare,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
} from "react-icons/fi";

export default function Contact() {
  return (
    <div className="bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed min-h-screen flex flex-col items-center">
      <h1 className="text-3xl text-center m-10 mt-24">Kontakt</h1>

      <div className="flex gap-10 flex-col sm:flex-row sm:gap-20 items-start m-10 mb-20">
        <div className="text-center flex flex-col w-36">
          <div className="rounded-full bg-dark-gray p-6 border w-fit m-auto mb-5">
            <FiMapPin className="size-9" />
          </div>
          <div className="flex flex-col gap-1">
            <p>Poznań</p>
            <p>Kórnik</p>
            <p>I okolice</p>
          </div>
        </div>

        <div className="text-center flex flex-col">
          <div className="rounded-full bg-dark-gray p-6 border w-fit m-auto mb-5">
            <FiPhone className="size-9" />
          </div>
          <div className="flex flex-col gap-1">
            <p>+48 530 833 888</p>
            <a
              className="underline hover:scale-[102%] transition-transform hover:text-[#ff8c73]"
              href="mailto:jbmk.art@gmail.com"
            >
              Napisz do mnie maila!
            </a>
            <p>jbmk.art@gmail.com</p>
          </div>
        </div>

        <div className="text-center flex flex-col w-36">
          <div className="rounded-full bg-dark-gray p-6 border w-fit m-auto mb-5">
            <FiMessageSquare className="size-9" />
          </div>
          <div className="flex flex-col gap-3">
            <a
              className="hover:scale-[103%] hover:text-[#ff8c73]"
              href="https://www.facebook.com/profile.php?id=100093676324981"
              target="_blank"
            >
              <div className="flex gap-3">
                <FiFacebook className="size-8" />
                <p className="m-auto mr-3">Facebook</p>
              </div>
            </a>
            <a
              className="hover:scale-[103%] hover:text-[#ff8c73]"
              href="https://www.instagram.com/madej.art/"
              target="_blank"
            >
              <div className="flex gap-3">
                <FiInstagram className="size-7" />
                <p className="m-auto mr-3">Instagram</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
