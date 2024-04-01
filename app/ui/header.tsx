"use client";

import { FiList } from "react-icons/fi";
import { goudy } from "@/app/ui/fonts";
import Menu from "@/app/ui/menu";
import { useState, useRef } from "react";
import useScrollDirecton from "@/app/lib/scroll";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [mountMenu, setMountMenu] = useState(false);

  const handleMenuTransition = () => {
    setMountMenu(!mountMenu);
    setShowMenu(false);
  };
  const scrollDirection = useScrollDirecton();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // console.log("header rerendered");
  return (
    <>
      <div
        className={`bg-dark-gray bg-[url('/img/noise_transparent.png')] text-white p-4 text-center flex items-center shadow-custom_shadow_light sticky ${
          scrollDirection === "down" ? "-top-24" : "top-0"
        } transition-all duration-500 z-10`}
      >
        <button
          className="p-2.5 border-2 border-transparent rounded-lg md:absolute md:left-4 hover:bg-[#2c2c2c] hover:border-[#161616]"
          onClick={() => {
            setShowMenu(!showMenu);
            if (!showMenu) {
              setMountMenu(true);
            }
          }}
          ref={buttonRef}
        >
          <FiList className="h-8 w-8 text-[#99999999]" />
        </button>

        <p
          className={`${goudy.className} antialiased m-auto text-2xl drop-shadow-xl`}
        >
          Jakub Madejczyk <br /> Photography
        </p>
      </div>
      {mountMenu && (
        <Menu
          showMenu={showMenu}
          handleMenuTransition={handleMenuTransition}
          buttonRef={buttonRef}
        />
      )}
    </>
  );
}
