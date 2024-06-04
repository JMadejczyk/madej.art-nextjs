"use client";
import { PhotoConfig } from "@/app/types/FetchPhotosConfig";
import Image from "next/image";
import { useRef } from "react";

const ChangePhotoDataModal = (props: {
  handleSetModalImage: (image: PhotoConfig | null) => void;
  modalImage: PhotoConfig;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div className="bg-[#444444] p-8 m-10 rounded-xl shadow-custom_shadow">
        <button
          className="bg-[#aa2222] text-white p-2 rounded-xl hover:bg-[#ff6666] hover:scale-[102%] shadow-custom_shadow"
          onClick={() => props.handleSetModalImage(null)}
        >
          Zamknij
        </button>
        <Image
          key={props.modalImage.file_name}
          src={`/${props.modalImage.localization}/${props.modalImage.file_name}`}
          width={props.modalImage.width / 10}
          height={props.modalImage.height / 10}
          alt={props.modalImage.description}
          className="object-cover rounded-xl shadow-custom_shadow mt-4 mb-4 "
        />
        <h2 className="text-center">Opis</h2>

        <input
          type="text"
          className="w-full bg-dark-gray p-3 rounded-xl border border-[#909090] mb-2 shadow-custom_shadow"
          placeholder={props.modalImage.description}
          ref={ref}
        />
        <h2 className="text-center">Tagi</h2>
        <input
          type="text"
          className="w-full bg-dark-gray p-3 rounded-xl border border-[#909090] mb-4 shadow-custom_shadow"
          placeholder={props.modalImage.tags?.join(", ")}
          ref={ref2}
        />
        <button
          className="bg-[#22aa22] text-white p-2 rounded-xl hover:bg-[#44cc44] hover:scale-[102%] shadow-custom_shadow"
          onClick={() => {}}
        >
          Zapisz
        </button>
      </div>
    </div>
  );
};

export default ChangePhotoDataModal;
