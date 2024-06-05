"use client";
import React, { useEffect, useState, Suspense, useRef } from "react";
import Loading from "./loading";
import { FetchPhotosConfig } from "@/app/types/FetchPhotosConfig";
const PhotosLayout = React.lazy(() => import("./photosLayoutAdmin"));

export default function ChangePanel() {
  const [images, setImages] = useState<FetchPhotosConfig>({ photos: [] });
  const [renderCount, setRenderCount] = useState(0);
  const [tags, setTags] = useState<{ name: string; count: number }[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(["portraits"]);

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
      className={`min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed flex items-start`}
    >
      <div className="ml-8 mr-8 p-8 bg-dark-gray rounded-xl border border-[#909090] shadow-custom_shadow">
        {/* bg-dark-gray w-24 hover:bg-[#404040] hover:scale-105 p-4  shadow-custom_shadow m-8 mb-10" */}

        {tags.map((tag, index) => {
          return (
            <div className="" key={index + "div"}>
              <label key={index + "label"} className="text-white text-nowrap">
                <input
                  type="checkbox"
                  className="m-2 w-4 h-4 bg-white border-2 border-gray-400 rounded-md cursor-pointer"
                  key={index}
                  {...(selectedTags.includes(tag.name)
                    ? { checked: true }
                    : { checked: false })}
                  value={tag.name}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTags([...selectedTags, tag.name]);
                    } else {
                      setSelectedTags(
                        selectedTags.filter((item) => item !== tag.name)
                      );
                    }
                  }}
                />
                {tag.name} <span className="text-[#909090]">({tag.count})</span>
              </label>
            </div>
          );
        })}
      </div>
      <Suspense fallback={<Loading />}>
        <PhotosLayout
          photos_json={images}
          renderCountHandler={setRenderCountHandler}
        />
      </Suspense>
    </main>
  );
}
