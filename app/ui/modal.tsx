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
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [curPhoto, setCurPhoto] = useState();

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={"w-screen h-screen flex items-center justify-center"}
    >
      <Dialog.Panel
        className={`h-[90vh] w-[90vw] flex flex-col items-center justify-center m-auto`}
      >
        <div className="w-auto max-h-full ">
          <Image
            src={`${props.photos_folder}/${props.photo.name}`}
            height={props.photo.height}
            width={props.photo.width}
            alt={props.photo.desc}
            key={props.photo.name}
            placeholder="blur"
            blurDataURL={props.photo.blured}
            className="!w-auto !max-h-[85%]"
          />
          <div className="h-[15%] flex justify-center items-center border">
            <Image
              src={`${props.photos_folder}/${props.photo.name}`}
              height={props.photo.height}
              width={props.photo.width}
              alt={props.photo.desc}
              key={props.photo.name}
              placeholder="blur"
              blurDataURL={props.photo.blured}
              className="!w-auto !max-h-[100%]"
            />
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
