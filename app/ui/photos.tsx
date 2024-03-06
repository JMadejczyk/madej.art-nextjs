"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Masonry from "@mui/lab/Masonry";
import useWindowWidth from "@/app/lib/useWindowWidth";

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

  const width = useWindowWidth();
  useEffect(() => {
    fetch("/data/portraits.json").then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          setImages(res);
        });
      }
    });
  }, []);

  return (
    <div className="xl:w-7/12 lg:w-8/12 md:w-11/12 md:mr-auto md:ml-auto flex justify-center mt-4 mb-4 mr-2 ml-2">
      {
        <Masonry columns={width > 600 ? 3 : 2} spacing={2}>
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
