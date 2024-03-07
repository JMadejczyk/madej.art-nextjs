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

  console.log("Images has been rerendered");

  return (
    <div className="xl:w-7/12 lg:w-8/12 md:w-11/12 md:mr-auto md:ml-auto flex justify-center mt-4 mb-4 mr-2 ml-2">
      {
        <Masonry columns={{ xs: 2, sm: 3, md: 4 }} spacing={2}>
          {images.photos.map((image, index) => (
            <div key={index}>
              <Image
                src={`${props.photos_folder}/${image.name}`}
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
