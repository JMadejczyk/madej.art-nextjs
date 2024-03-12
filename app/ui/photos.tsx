"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Masonry from "@mui/lab/Masonry";
import Link from "next/link";

interface FetchPhotosConfig {
  photos: {
    name: string;
    width: number;
    height: number;
    desc: string;
    blured: string;
  }[];
}

export default function Photos_layout(props: {
  photos_folder: string;
  photos_json: FetchPhotosConfig;
}) {
  console.log("Images has been rerendered");

  return (
    <div className="xl:w-7/12 lg:w-8/12 md:w-11/12 md:mr-auto md:ml-auto flex justify-center mt-2  mr-2 ml-2">
      {
        <Masonry
          columns={{ xs: 2, sm: 3, md: 4 }}
          spacing={2}
          className="m-0 pb-4"
        >
          {props.photos_json.photos.map((image, index) => (
            <div key={index}>
              <Link
                href={`?modal=true&folder=${props.photos_folder}&name=${image.name}`}
              >
                <Image
                  src={`${props.photos_folder}/${image.name}`}
                  width={image.width}
                  height={image.height}
                  // quality={50}
                  alt={image.desc}
                  className="shadow-custom_shadow cursor-pointer"
                  key={image.name}
                  priority={index <= 15 ? true : false}
                  placeholder="blur"
                  blurDataURL={image.blured}
                  // onClick={() => handlePhotoClick(image)}
                />
              </Link>
            </div>
          ))}
        </Masonry>
      }
    </div>
  );
}
