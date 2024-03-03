import MenuButton from "@/app/ui/menuButton";
import {
  FiHome,
  FiCamera,
  FiMapPin,
  FiUser,
  FiMessageSquare,
  FiInstagram,
} from "react-icons/fi";
import "animate.css";

export default function Menu(props: { showMenu: boolean }) {
  return (
    <div
      className={`absolute left-0 transition-opacity ${
        props.showMenu ? "opacity-100" : "opacity-0"
      }`}
    >
      <MenuButton content={"Strona główna"} Icon={FiHome} />
      <MenuButton content={"Krajobrazy"} Icon={FiCamera} />
      <MenuButton content={"Street photo"} Icon={FiMapPin} />
      <MenuButton content={"O mnie"} Icon={FiUser} />
      <MenuButton content={"Kontakt"} Icon={FiMessageSquare} />
      <MenuButton content={"Instagram"} Icon={FiInstagram} />
    </div>
  );
}
