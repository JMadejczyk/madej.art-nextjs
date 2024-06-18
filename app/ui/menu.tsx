import MenuButton from "@/app/ui/menuButton";
import {
  FiHome,
  FiCamera,
  FiMapPin,
  FiUser,
  FiMessageSquare,
  FiInstagram,
  FiCloud,
  FiDollarSign,
} from "react-icons/fi";

import Link from "next/link";
import useScrollDirecton from "@/app/lib/scroll";
import { RefObject, useCallback, useEffect, useRef } from "react";

// TODO menu animation - sliding from left screen border

export default function Menu(props: {
  showMenu: boolean;
  handleMenuTransition: () => void;
  buttonRef: RefObject<HTMLButtonElement>;
}) {
  const scrollDirection = useScrollDirecton();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      props.buttonRef.current &&
      !props.buttonRef.current.contains(e.target)
    ) {
      props.handleMenuTransition();
    }
  };

  const showMenu = props.showMenu;
  const handleMenuTransition = props.handleMenuTransition;
  useEffect(() => {
    if (scrollDirection === "down" && showMenu) {
      handleMenuTransition();
    }
  }, [scrollDirection, showMenu, handleMenuTransition]);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  // console.log("Menu rerendered");
  return (
    <div
      className={`fixed top-24 left-0 transition-opacity bg-[#202020bb] bg-[url('/img/noise_transparent.png')]
      backdrop-blur-[10px] w-[17rem] shadow-custom_shadow ${
        props.showMenu ? "opacity-100" : "opacity-0"
      } z-10`}
      onTransitionEnd={() => props.handleMenuTransition()}
      ref={menuRef}
    >
      <Link href="/">
        <MenuButton content={"Portrety"} Icon={FiCamera} />
      </Link>
      <Link href="/landscapes">
        <MenuButton content={"Krajobrazy"} Icon={FiCloud} />
      </Link>
      <Link href="/street">
        <MenuButton content={"Street photo"} Icon={FiMapPin} />
      </Link>
      <Link href="/about">
        <MenuButton content={"O mnie"} Icon={FiUser} />
      </Link>
      <Link href="/contact">
        <MenuButton content={"Kontakt"} Icon={FiMessageSquare} />
      </Link>
      {/* <Link href="/prices">
        <MenuButton content={"Cennik"} Icon={FiDollarSign} />
      </Link> */}
      <Link href="https://www.instagram.com/madej.art/" target="_blank">
        <MenuButton content={"Instagram"} Icon={FiInstagram} />
      </Link>
    </div>
  );
}
