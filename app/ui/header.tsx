"use client";

import { FiList } from "react-icons/fi";
import { goudy } from "@/app/ui/fonts";
import Menu from "@/app/ui/menu";
import { useState } from "react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="bg-dark-gray bg-[url('/img/noise_transparent.png')] w-screen text-white p-4 text-center flex items-center shadow-custom_shadow_light">
        <button
          className="p-2.5 border-2 border-transparent rounded-lg hover:bg-[#2c2c2c] hover:border-[#161616]"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <FiList className="h-8 w-8 text-[#99999999]" />
        </button>

        <p
          className={`${goudy.className} antialiased m-auto text-2xl drop-shadow-xl`}
        >
          Jakub Madejczyk <br /> Photography
        </p>
      </div>
      <Menu showMenu={showMenu} />
    </>
  );
}
