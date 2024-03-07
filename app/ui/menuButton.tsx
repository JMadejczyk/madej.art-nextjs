import { ReactNode } from "react";
import { IconType } from "react-icons";
import { goudy } from "@/app/ui/fonts";

export default function MenuButton(props: { content: string; Icon: IconType }) {
  return (
    <button className="pl-6 flex h-20 bg-transparent items-center hover:bg-[#303030] w-full">
      <div className="flex items-center justify-center">
        <props.Icon className="m-6 mr-8 h-6 w-6" />
        <p className={`${goudy.className} text-lg pt-1`}>{props.content}</p>
      </div>
    </button>
  );
}
