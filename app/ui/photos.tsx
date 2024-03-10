"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Masonry from "@mui/lab/Masonry";

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
  json_file_localization: string;
  photos_folder: string;
}) {
  const [images, setImages] = useState<FetchPhotosConfig>({ photos: [] });

  useEffect(() => {
    fetch(props.json_file_localization).then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          setImages(res);
        });
      }
    });
  }, []);

  type photoData = {
    name: string;
    width: number;
    height: number;
    desc: string;
    blured: string;
  };

  const handlePhotoClick = (image: photoData) => {
    console.log(image);
  };

  console.log("Images has been rerendered");

  return (
    <div className="xl:w-7/12 lg:w-8/12 md:w-11/12 md:mr-auto md:ml-auto flex justify-center mt-2  mr-2 ml-2">
      {
        <Masonry
          columns={{ xs: 2, sm: 3, md: 4 }}
          spacing={2}
          className="m-0 pb-4"
        >
          {images.photos.map((image, index) => (
            <div key={index}>
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
                onClick={() => handlePhotoClick(image)}
              />
            </div>
          ))}
        </Masonry>
      }
    </div>
  );
}
