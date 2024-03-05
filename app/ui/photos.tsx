"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Photos_column from "./photos_column";
// import { fetchPortraits } from "../lib/data";

interface FetchPhotosConfig {
  photos: { name: string; width: number; height: number; desc: string }[];
}

export default function Photos_layout() {
  const [images, setImages] = useState<FetchPhotosConfig>({ photos: [] });
  useEffect(() => {
    fetch("/data/portraits.json").then((res: Response) => {
      if (res.ok) {
        res.json().then((res) => {
          setImages(res);
        });
      }
    });
    // await new Promise((resolve) => fetchPortraits())
    // setImages()
  }, []);

  const first_row_images = images.photos
    .filter((image, index) => index % 3 === 0)
    .map((image) => {
      return (
        <Image
          src={`/images/${image.name}`}
          width={image.width}
          height={image.height}
          // quality={}
          alt={image.desc}
          className="mt-2 mb-2"
          key={image.name}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAIAAAD3rtNaAAAACXBIWXMAACTpAAAk6QFQJOf4AAAA50lEQVR4nAHcACP/ABwZECMjGAsNBgABAAQEAAEBABYVDwAyLyQyNSkwMisiIx0PEQ4QEA06QDgAPj8zSE07XlFOYlNOS1FAVVpPSVNIADQ0H2BkWNvR393P2GVnV09URkdIPQAlIAmHh4P4+P/x8v9oaF0yNSM4OywAJyIPaWhl9/n/xcfiXFxTPD0rMjIkACIiFzY2Lsmutr6uuUdIQDI1JjQ1KAAlJB0kJBtVQDleRj8YGxIeHRUjIxoAEQ8JFhYQHRkUNSclGhoVHBoSIx0YAAcGBBMTEykiKCopMw0ODwoLCgsJCA6tNWyMzhuSAAAAAElFTkSuQmCC"
        />
      );
    });

  const second_row_images = images.photos
    .filter((image, index) => index % 3 === 1)
    .map((image) => {
      return (
        <Image
          src={`/images/${image.name}`}
          width={image.width}
          height={image.height}
          // quality={}
          alt={image.desc}
          className="mt-2 mb-2"
          key={image.name}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAIAAAD3rtNaAAAACXBIWXMAACTpAAAk6QFQJOf4AAAA50lEQVR4nAHcACP/ABwZECMjGAsNBgABAAQEAAEBABYVDwAyLyQyNSkwMisiIx0PEQ4QEA06QDgAPj8zSE07XlFOYlNOS1FAVVpPSVNIADQ0H2BkWNvR393P2GVnV09URkdIPQAlIAmHh4P4+P/x8v9oaF0yNSM4OywAJyIPaWhl9/n/xcfiXFxTPD0rMjIkACIiFzY2Lsmutr6uuUdIQDI1JjQ1KAAlJB0kJBtVQDleRj8YGxIeHRUjIxoAEQ8JFhYQHRkUNSclGhoVHBoSIx0YAAcGBBMTEykiKCopMw0ODwoLCgsJCA6tNWyMzhuSAAAAAElFTkSuQmCC"
        />
      );
    });

  const third_row_images = images.photos
    .filter((image, index) => index % 3 === 2)
    .map((image) => {
      return (
        <Image
          src={`/images/${image.name}`}
          width={image.width}
          height={image.height}
          // quality={}
          alt={image.desc}
          className="mt-2 mb-2 shadow-lg"
          key={image.name}
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAIAAAD3rtNaAAAACXBIWXMAACTpAAAk6QFQJOf4AAAA50lEQVR4nAHcACP/ABwZECMjGAsNBgABAAQEAAEBABYVDwAyLyQyNSkwMisiIx0PEQ4QEA06QDgAPj8zSE07XlFOYlNOS1FAVVpPSVNIADQ0H2BkWNvR393P2GVnV09URkdIPQAlIAmHh4P4+P/x8v9oaF0yNSM4OywAJyIPaWhl9/n/xcfiXFxTPD0rMjIkACIiFzY2Lsmutr6uuUdIQDI1JjQ1KAAlJB0kJBtVQDleRj8YGxIeHRUjIxoAEQ8JFhYQHRkUNSclGhoVHBoSIx0YAAcGBBMTEykiKCopMw0ODwoLCgsJCA6tNWyMzhuSAAAAAElFTkSuQmCC"
        />
      );
    });

  // const first_row_images = images.photos.map((image) => {
  //   return (
  //     <Image
  //       src={`/images/${image.name}`}
  //       width={image.width}
  //       height={image.height}
  //       // quality={}
  //       alt={image.desc}
  //     />
  //   );
  // });

  return (
    <div className="w-8/12 flex flex-row pl-2 pr-2 m-auto">
      <Photos_column photos={first_row_images} />
      <Photos_column photos={second_row_images} />
      <Photos_column photos={third_row_images} />
    </div>
  );
}
