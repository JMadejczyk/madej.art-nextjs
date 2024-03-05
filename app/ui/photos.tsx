"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Photos_column from "./photos_column";

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

  function create_n_row_images(mod_number: number): JSX.Element[] {
    const row_images = images.photos
      .filter((image, index) => index % 3 === mod_number)
      .map((image) => {
        return (
          <Image
            src={`/images/${image.name}`}
            width={image.width}
            height={image.height}
            // quality={}
            alt={image.desc}
            className="mt-2 mb-2 shadow-photo_shadow"
            key={image.name}
            priority={false}
            placeholder="blur"
            blurDataURL={image.blured}
          />
        );
      });
    return row_images;
  }

  const first_row_images = create_n_row_images(0);
  const second_row_images = create_n_row_images(1);
  const third_row_images = create_n_row_images(2);

  return (
    <div className="w-7/12 flex flex-row pl-2 pr-2 m-auto">
      <Photos_column photos={first_row_images} />
      <Photos_column photos={second_row_images} />
      <Photos_column photos={third_row_images} />
    </div>
  );
}
