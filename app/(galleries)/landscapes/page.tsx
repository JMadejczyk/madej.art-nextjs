"use client";

import Header from "@/app/ui/header";
import Photos_layout from "../../ui/photos";
import Modal from "@/app/ui/modal";
import { Suspense, useEffect, useState } from "react";

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
    fetch("/data/landscapes.json").then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          setImages(res);
        });
      }
    });
  }, []);

  return (
    <main className="min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')]">
      <Header />
      <Suspense>
        <Photos_layout photos_folder={"/landscapes"} photos_json={images} />
      </Suspense>
      <Suspense>
        <Modal photos_json={images} />
      </Suspense>
    </main>
  );
}
