"use client";

import React, { useEffect, useState, Suspense } from "react";
import Loading from "../../../loading.tsx";
import { FetchPhotosConfig } from "@/app/types/FetchPhotosConfig";
import dotenv from "dotenv";
dotenv.config();
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const PhotosLayout = React.lazy(() => import("../../../ui/photos"));
const Modal = React.lazy(() => import("../../../ui/modal"));

export default function Home() {
  const [images, setImages] = useState<FetchPhotosConfig>({ photos: [] });

  useEffect(() => {
    fetch(`${apiUrl}/api/photos/get?tags=street`).then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          setImages(res);
        });
      }
    });
  }, []);

  return (
    <main className="min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')]">
      <Suspense fallback={<Loading />}>
        <PhotosLayout photos_json={images} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Modal photos_json={images} />
      </Suspense>
    </main>
  );
}
