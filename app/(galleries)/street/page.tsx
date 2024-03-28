"use client";

import Header from "@/app/ui/header";
import Photos_layout from "../../ui/photos";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import Modal from "@/app/ui/modal";

interface FetchPhotosConfig {
  photos: {
    name: string;
    width: number;
    height: number;
    desc: string;
    blured: string;
  }[];
}

export default function Home() {
  const [images, setImages] = useState<FetchPhotosConfig>({ photos: [] });

  useEffect(() => {
    fetch("/data/street.json").then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          setImages(res);
        });
      }
    });
  }, []);

  return (
    <main className="min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')]">
      <Suspense>
        <Photos_layout photos_folder={"/street"} photos_json={images} />
      </Suspense>
      <Suspense>
        <Modal photos_json={images} />
      </Suspense>
    </main>
  );
}
