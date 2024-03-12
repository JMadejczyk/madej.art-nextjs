"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
interface FetchPhotosConfig {
  photos: {
    name: string;
    width: number;
    height: number;
    desc: string;
    blured: string;
  }[];
}

function Modal(props: { photos_json: FetchPhotosConfig }) {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const folder = searchParams.get("folder");
  const name = searchParams.get("name");
  const pathname = usePathname();

  const photoObj = props.photos_json.photos.find((el) => el.name === name);
  // ?????
  // const [photoObj, setPhotoObject] = useState(
  //   props.photos_json.photos.find((el) => el.name === name)
  // );
  // ?????
  return (
    <>
      {modal && (
        <dialog className="fixed top-0 left-0 w-screen h-screen bg-dark-gray bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-transparent m-auto p-8">
            <div className="flex flex-col items-center">
              <h3>Modal content</h3>
              <div>
                <Image
                  src={name ? `${folder}/${name}` : `/portraits/Img0801_.jpg`}
                  height={photoObj?.height}
                  width={photoObj?.width}
                  alt={photoObj?.desc ? photoObj?.desc : ""}
                  placeholder="blur"
                  blurDataURL={photoObj?.blured}
                  // className={""}
                  className="max-h-[80vh] w-auto"
                  quality={90}
                />
              </div>

              <br />
              <p>{`${
                props.photos_json.photos.find((el) => el.name === name)?.name
              }`}</p>
              <Link href={pathname}>
                <button type="button" className="bg-light-gray p-2">
                  Close Modal
                </button>
              </Link>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
