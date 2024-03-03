"use client";

import { FiList } from "react-icons/fi";
import { goudy } from "@/app/ui/fonts";
export default function Header() {
  return (
    <>
      <div className="bg-[#202020] w-screen text-white p-4 text-center flex items-center ">
        <button
          className="p-2.5 border-2 border-transparent rounded-lg hover:bg-[#2c2c2c] hover:border-[#161616]"
          onClick={() => {
            console.log("twoja stara");
          }}
        >
          <FiList className="h-8 w-8 text-zinc-400" />
        </button>

        <p className={`${goudy.className} antialiased m-auto text-2xl`}>
          Jakub Madejczyk <br /> Photography
        </p>
      </div>
    </>
  );
}
