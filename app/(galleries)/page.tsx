"use client";

import Header from "@/app/ui/header";
// import Photos_layout from "../ui/photos";
import React, { useEffect, useState, Suspense } from "react";
// import Modal from "../ui/modal";
import Loading from "../loading";

const PhotosLayout = React.lazy(() => import("../ui/photos"));
const Modal = React.lazy(() => import("../ui/modal"));

interface FetchPhotosConfig {
  photos: {
    photo_id: number;
    file_name: string;
    width: number;
    height: number;
    description: string;
    blurred: string;
    localization: string;
    position: number;
  }[];
}

export default function Home() {
  const [images, setImages] = useState<FetchPhotosConfig>({ photos: [] });

  useEffect(() => {
    fetch("http://localhost:3001/api/photos/get?tags=portraits").then(
      (res: Response) => {
        if (res.ok) {
          res.json().then((res) => {
            // console.log("Res: " + res);
            // console.log(res[0]);
            setImages(res);
          });
        }
      }
    );
  }, []);

  // console.log(images.photos.length);
  // console.log(typeof images);

  return (
    <main
      className={`min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed`}
    >
      <Suspense fallback={<Loading />}>
        <PhotosLayout photos_json={images} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Modal photos_json={images} />
      </Suspense>
    </main>
  );
}
