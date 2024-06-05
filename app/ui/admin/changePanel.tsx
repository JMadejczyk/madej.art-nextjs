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

  console.log(selectedTags);
  return (
    <main
      className={`min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed md:flex items-start`}
    >
      <Suspense fallback={<Loading />}>
        <SelectTagsMenu
          selectedTags={selectedTags}
          handleSetSelectedTags={handleSetSelectedTags}
          tags={tags}
        />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <PhotosLayout
          photos_json={images}
          renderCountHandler={setRenderCountHandler}
        />
      </Suspense>
    </main>
  );
}
