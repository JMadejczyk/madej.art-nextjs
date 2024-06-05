"use client";
import React, { useEffect, useState, Suspense } from "react";
import Loading from "./loading";
import { FetchPhotosConfig } from "@/app/types/FetchPhotosConfig";
const PhotosLayout = React.lazy(() => import("./photosLayoutAdmin"));

export default function ChangePanel() {
  const [images, setImages] = useState<FetchPhotosConfig>({ photos: [] });
  const [renderCount, setRenderCount] = useState(0);

  const setRenderCountHandler = () => {
    setRenderCount(renderCount + 1);
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/photos/get?tags=street,portraits", {
      method: "GET",
      credentials: "include",
    }).then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          setImages(res);
        });
      }
    });
  }, [renderCount]);

  return (
    <main
      className={`min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed`}
    >
      <Suspense fallback={<Loading />}>
        <PhotosLayout
          photos_json={images}
          renderCountHandler={setRenderCountHandler}
        />
      </Suspense>
    </main>
  );
}
