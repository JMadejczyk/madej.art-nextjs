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
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className={"w-9/12"}>
      <Dialog.Panel>
        <Image
          src={props.photo.name}
          height={props.photo.height}
          width={props.photo.width}
          alt={props.photo.desc}
        />
      </Dialog.Panel>
    </Dialog>
  );
}
