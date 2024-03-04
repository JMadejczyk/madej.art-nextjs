"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FetchPhotosConfig {
  photos: { name: string; width: number; height: number }[];
}

export default function Photos() {
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
  return (
    <>
      {images.photos.map((image) => {
        return (
          <Image
            src={`/images/${image.name}`}
            width={image.width}
            height={image.height}
            // quality={}
            alt="image"
          />
        );
      })}
    </>
  );
}
