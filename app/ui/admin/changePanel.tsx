"use client";
import React, { useEffect, useState, Suspense, useRef } from "react";
import Loading from "./loading";
import { FetchPhotosConfig } from "@/app/types/FetchPhotosConfig";
import SelectTagsMenu from "./selectTagsMenu";
const PhotosLayout = React.lazy(() => import("./photosLayoutAdmin"));
// const SelectTagsMenu = React.lazy(() => import("./selectTagsMenu"));

export default function ChangePanel() {
  const [images, setImages] = useState<FetchPhotosConfig>({ photos: [] });
  const [renderCount, setRenderCount] = useState(0);
  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(["portraits"]);
  const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

  const handleSetSelectedPhotos = (photo_ids: string[]) => {
    setSelectedPhotos(photo_ids);
  };
  const handleSetSelectedTags = (tags: string[]) => {
    setSelectedTags(tags);
  };
  const setRenderCountHandler = () => {
    setRenderCount(renderCount + 1);
  };

  useEffect(() => {
    fetch(
      `http://localhost:3001/api/photos/get?tags=${selectedTags.join(",")}`,
      {
        method: "GET",
        credentials: "include",
      }
    ).then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          setImages(res);
        });
      }
    });
  }, [renderCount, selectedTags]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:3001/api/photos/get/tags/allcount",
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      let tags = data.tags.map((tag: { name: string; count: number }) => {
        return {
          name: tag.name,
          count: tag.count,
        };
      });
      setTags(tags);
      console.log(tags);
    };
    fetchData();
  }, []);

  const handleSwapPhotos = async (selectedPhotos: string[]) => {
    const response = await fetch("http://localhost:3001/api/photos/swap", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first: parseInt(selectedPhotos[0]),
        second: parseInt(selectedPhotos[1]),
      }),
    });
    const data = await response.json();
    console.log(data);
    setRenderCountHandler();
  };

  // console.log(selectedTags);
  console.log(selectedPhotos);

  return (
    <main
      className={`min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed md:flex items-start`}
    >
      <Suspense fallback={<Loading />}>
        <SelectTagsMenu
          selectedTags={selectedTags}
          handleSetSelectedTags={handleSetSelectedTags}
          handleSetSelectedPhotos={handleSetSelectedPhotos}
          selectedPhotos={selectedPhotos}
          tags={tags}
          handleSwapPhotos={handleSwapPhotos}
        />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <PhotosLayout
          photos_json={images}
          renderCountHandler={setRenderCountHandler}
          handleSetSelectedPhotos={handleSetSelectedPhotos}
          selectedPhotos={selectedPhotos}
        />
      </Suspense>
    </main>
  );
}
