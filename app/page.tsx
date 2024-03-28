"use client";

import Header from "@/app/ui/header";
import Photos_layout from "./ui/photos";
import { useEffect, useState, Suspense } from "react";
import Modal from "./ui/modal";
import Loading from "./loading";

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
    fetch("/data/portraits.json").then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          setImages(res);
        });
      }
    });
  }, []);

  return (
    <main
      className={`min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed`}
    >
      <Suspense fallback={<Loading />}>
        <Photos_layout photos_folder={"/portraits"} photos_json={images} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Modal photos_json={images} />
      </Suspense>
    </main>
  );
}
