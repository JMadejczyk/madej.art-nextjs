import { ReactNode } from "react";
import { IconType } from "react-icons";
import { goudy } from "@/app/ui/fonts";

export default function MenuButton(props: { content: string; Icon: IconType }) {
  return (
    <button className="flex bg-[#202020cf] h-20 w-64 items-center pl-3 pr-3 hover:bg-[#202020dd]">
      <props.Icon className="m-8 h-6 w-6" />
      <p className={`${goudy.className} text-lg pt-1 pr-8`}>{props.content}</p>
    </button>
  );
}
