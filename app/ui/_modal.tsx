import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Image from "next/image";

// import photo from "@/public/portraits/Img0820_.jpg";

type photoData = {
  name: string;
  width: number;
  height: number;
  desc: string;
  blured: string;
};

export default function PhotoModal(props: {
  photo: photoData;
  json_file_localization: string;
  photos_folder: string;
  open: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [curPhoto, setCurPhoto] = useState();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={"w-screen h-screen"}
    >
      <Dialog.Panel className={"h-full flex flex-col"}>
        <div className="min-h-[80vh]">
          <Image
            src={`${props.photos_folder}/${props.photo.name}`}
            height={props.photo.height}
            width={props.photo.width}
            alt={props.photo.desc}
            key={props.photo.name}
            placeholder="blur"
            blurDataURL={props.photo.blured}
            // className="!w-auto !max-h-[85%]"
            // sizes="fill"
            // className="max-h-screen w-auto"
            className={`m-auto max-h-full w-auto h-[${props.photo.height}px] max-w-[${props.photo.width}px] max-w-none`}
          />
        </div>

        <div className="h-[15%] flex justify-center items-center border">
          <Image
            src={`${props.photos_folder}/${props.photo.name}`}
            height={props.photo.height}
            width={props.photo.width}
            alt={props.photo.desc}
            key={props.photo.name}
            placeholder="blur"
            blurDataURL={props.photo.blured}
            // className="!w-auto !max-h-[85%]"
            // sizes="fill"
            // className="max-h-screen w-auto"
            className={`m-auto max-h-full w-auto h-[${props.photo.height}px] max-w-[${props.photo.width}px] max-w-none`}
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
