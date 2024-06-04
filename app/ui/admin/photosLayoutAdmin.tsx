"use client";

import { useState } from "react";
import Image from "next/image";
import Masonry from "@mui/lab/Masonry";
// import Link from "next/link";
import { FetchPhotosConfig, PhotoConfig } from "@/app/types/FetchPhotosConfig";
// import { render } from "react-dom";
import SmallImage from "@/app/ui/admin/smallImage";
import { useRef } from "react";

export default function Photos_layout_Admin(props: {
  photos_json: FetchPhotosConfig;
  renderCountHandler: () => void;
}) {
  // console.log("Images has been rerendered");
  const [modalImage, setModalImage] = useState<PhotoConfig | null>(null);
  const handleSetModalImage = (image: PhotoConfig) => {
    setModalImage(image);
  };
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);

  // console.log("Modal image: ", modalImage);
  return (
    props.photos_json && (
      <div className="2xl:w-7/12 xl:w-9/12 lg:w-10/12 md:w-11/12 md:mr-auto md:ml-auto flex justify-center mt-2  mr-2 ml-2 pb-16">
        {
          <Masonry
            columns={{ xs: 2, sm: 3, md: 4 }}
            spacing={2}
            className="m-0 pb-4"
            defaultHeight={6000}
            // defaultColumns={4}
            defaultSpacing={2}
          >
            {props.photos_json.photos.map((image, index) => (
              <div key={index}>
                <SmallImage
                  image={image}
                  index={index}
                  renderCountHandler={props.renderCountHandler}
                  handleSetModalImage={handleSetModalImage}
                />
              </div>
            ))}
          </Masonry>
        }
        {modalImage && (
          <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
            <div className="bg-[#444444] p-8 m-10 rounded-xl shadow-custom_shadow">
              <button
                className="bg-[#aa2222] text-white p-2 rounded-xl hover:bg-[#ff6666] hover:scale-[102%] shadow-custom_shadow"
                onClick={() => setModalImage(null)}
              >
                Zamknij
              </button>
              <Image
                key={modalImage.file_name}
                src={`/${modalImage.localization}/${modalImage.file_name}`}
                width={modalImage.width / 10}
                height={modalImage.height / 10}
                alt={modalImage.description}
                className="object-cover rounded-xl shadow-custom_shadow mt-4 mb-4 "
              />
              <h2 className="text-center">Opis</h2>

              <input
                type="text"
                className="w-full bg-dark-gray p-3 rounded-xl border border-[#909090] mb-2 shadow-custom_shadow"
                placeholder={modalImage.description}
                ref={ref}
              />
              <h2 className="text-center">Tagi</h2>
              <input
                type="text"
                className="w-full bg-dark-gray p-3 rounded-xl border border-[#909090] mb-4 shadow-custom_shadow"
                placeholder={modalImage.tags?.join(", ")}
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
        )}
      </div>
    )
  );
}
//TODO wyrzucić modal do osobnego pliku
