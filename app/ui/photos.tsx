"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FetchPhotosConfig {
  photos: string[];
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
        return <Image src={`/${image}`} width={600} height={600} alt="image" />;
      })}
    </>
  );
}
