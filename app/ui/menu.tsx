import MenuButton from "@/app/ui/menuButton";
import {
  FiHome,
  FiCamera,
  FiMapPin,
  FiUser,
  FiMessageSquare,
  FiInstagram,
} from "react-icons/fi";
// import "animate.css";
import Link from "next/link";

export default function Menu(props: { showMenu: boolean }) {
  return (
    <div
      className={`absolute left-0 transition-opacity bg-[#202020bb] bg-[url('/img/noise_transparent.png')]
      backdrop-blur-[10px] w-[17rem] shadow-custom_shadow ${
        props.showMenu ? "opacity-100" : "opacity-0"
      }`}
    >
      <Link href="/">
        <MenuButton content={"Strona główna"} Icon={FiHome} />
      </Link>

      <Link href="/landscapes">
        <MenuButton content={"Krajobrazy"} Icon={FiCamera} />
      </Link>
      <Link href="/street">
        <MenuButton content={"Street photo"} Icon={FiMapPin} />
      </Link>
      <Link href="/about">
        <MenuButton content={"O mnie"} Icon={FiUser} />
      </Link>
      <Link href="/kontakt">
        <MenuButton content={"Kontakt"} Icon={FiMessageSquare} />
      </Link>
      <Link href="https://www.instagram.com/madej.art/" target="_blank">
        <MenuButton content={"Instagram"} Icon={FiInstagram} />
      </Link>
    </div>
  );
}
