// "use client";

// import { useEffect, useState } from "react";
import Image from "next/image";
import Masonry from "@mui/lab/Masonry";
import Link from "next/link";
import { goudy } from "@/app/ui/fonts";
import styles from "./photos.module.css";
import { FetchPhotosConfig, PhotoConfig } from "@/app/types/FetchPhotosConfig";
import { render } from "react-dom";

const handleDelete = (photo_id: number, renderCountHandler: () => void) => {
  fetch("http://localhost:3001/api/photos/remove", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ photos: [{ photo_id: photo_id }] }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderCountHandler();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log("Wysłano żądanie usunięcia zdjęcia");
};

const SmallImage = (props: {
  image: PhotoConfig;
  index: number;
  renderCountHandler: () => void;
}) => {
  return (
    // <Link
    //   href={`?modal=true&folder=/${props.image.localization}&file_name=${props.image.file_name}`}
    //   scroll={false}
    //   className={`select-none`}
    // >
    <div className={`${styles.photo} w-full relative`}>
      <Image
        src={`/${props.image.localization}/${props.image.file_name}`}
        width={props.image.width}
        height={props.image.height}
        quality={60}
        alt={props.image.description}
        className="shadow-custom_shadow"
        key={props.image.file_name}
        priority={props.index <= 15 ? true : false}
        placeholder="blur"
        blurDataURL={props.image.blurred}
      />
      <div
        className={`w-full ${styles.descr} absolute left-0 bottom-0 text-[#161616] h-9 flex justify-center items-center bg-[#ffffff33] backdrop-blur-[20px] duration-[400ms] ${goudy.className} `}
      >
        {props.image.description}
      </div>
      <div
        className={`${styles.descr} absolute left-0 top-0 p-4 opacity-0 hover:opacity-100 hover:bg-[#ff6666] cursor-pointer text-[#161616] h-9 flex justify-center items-center bg-[#ffffff33] backdrop-blur-[20px] duration-[400ms] ${goudy.className}`}
        onClick={() => {
          handleDelete(props.image.photo_id, props.renderCountHandler);
        }}
      >
        Usuń
      </div>
      <div
        className={`${styles.descr} absolute right-0 top-0 p-4 opacity-0 hover:opacity-100 hover:bg-[#66ff66] cursor-pointer text-[#161616] h-9 flex justify-center items-center bg-[#ffffff33] backdrop-blur-[20px] duration-[400ms] ${goudy.className}`}
        onClick={() => {
          //   handleDelete(props.image.photo_id, props.renderCountHandler);
        }}
      >
        Edytuj
      </div>
    </div>
    // </Link>
  );
};

export default function Photos_layout_Admin(props: {
  photos_json: FetchPhotosConfig;
  renderCountHandler: () => void;
}) {
  console.log("Images has been rerendered");

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
                />
              </div>
            ))}
          </Masonry>
        }
      </div>
    )
  );
}
