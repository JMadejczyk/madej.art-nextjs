"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Photos_column from "./photos_column";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";

interface FetchPhotosConfig {
  photos: {
    name: string;
    width: number;
    height: number;
    desc: string;
    blured: string;
  }[];
}

export default function Photos_layout() {
  const [images, setImages] = useState<FetchPhotosConfig>({ photos: [] });
  useEffect(() => {
    fetch("/data/portraits.json").then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          setImages(res);
        });
      }
    });
  }, []);

  // function create_n_row_images(mod_number: number): JSX.Element[] {
  //   const row_images = images.photos
  //     .filter((image, index) => index % 3 === mod_number)
  //     .map((image) => {
  //       return (
  // <Image
  //   src={`/images/${image.name}`}
  //   width={image.width}
  //   height={image.height}
  //   // quality={}
  //   alt={image.desc}
  //   className="mt-2 mb-2 shadow-photo_shadow"
  //   key={image.name}
  //   // priority={true}
  //   placeholder="blur"
  //   blurDataURL={image.blured}
  // />
  //       );
  //     });
  //   return row_images;
  // }

  // const first_row_images = create_n_row_images(0);
  // const second_row_images = create_n_row_images(1);
  // const third_row_images = create_n_row_images(2);

  return (
    <div className="xl:w-8/12 m-auto flex justify-center">
      {/* <Photos_column photos={first_row_images} />
      <Photos_column photos={second_row_images} />
      <Photos_column photos={third_row_images} /> */}
      {
        <Masonry columns={3} spacing={2}>
          {images.photos.map((image, index) => (
            <div key={index}>
              <Image
                src={`/images/${image.name}`}
                width={image.width}
                height={image.height}
                // quality={}
                alt={image.desc}
                className="shadow-photo_shadow"
                key={image.name}
                // priority={true}
                placeholder="blur"
                blurDataURL={image.blured}
              />
            </div>
          ))}
        </Masonry>
      }
    </div>
  );
}
