"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { FiXSquare, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

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
  const currPhotoId = props.photos_json.photos.findIndex(
    (el) => el === photoObj
  );
  const nextPhotoName = props.photos_json.photos[currPhotoId + 1]?.name;
  const prevPhotoName = props.photos_json.photos[currPhotoId - 1]?.name;

  // console.log(currPhotoId);
  const router = useRouter();

  // ?????
  // const [photoObj, setPhotoObject] = useState(
  //   props.photos_json.photos.find((el) => el.name === name)
  // );
  // ?????
  console.log("Modal has been rerendered!");

  const handleNextPhoto = () =>
    router.push(
      nextPhotoName && folder
        ? pathname + `?modal=true&folder=${folder}&name=${nextPhotoName}`
        : pathname,
      { scroll: false }
    );

  const handlePrevPhoto = () =>
    router.push(
      prevPhotoName && folder
        ? pathname + `?modal=true&folder=${folder}&name=${prevPhotoName}`
        : pathname,
      { scroll: false }
    );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        // console.log("handleNextPhoto");
        handleNextPhoto();
      } else if (e.key === "ArrowLeft") {
        // console.log("handlePrevPhoto");
        handlePrevPhoto();
      }
    };
    const document = window.document;
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    modal,
    pathname,
    searchParams,
    folder,
    name,
    folder,
    nextPhotoName,
    prevPhotoName,
  ]);

  return (
    <>
      {modal && photoObj && (
        <dialog
          className="fixed top-0 left-0 w-screen h-screen bg-dark-gray bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center select-none	"
          onClick={(e) => router.push(pathname, { scroll: false })}
        >
          <div className="bg-transparent m-auto p-8">
            <div className="w-full flex justify-end">
              <Link href={pathname} scroll={false} className="mb-[-4px]">
                <button type="button">
                  <FiXSquare className="w-10 h-10 text-[#707070]" />
                </button>
              </Link>
            </div>

            <div
              className="relative h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="absolute left-0 h-full w-[50%] text-transparent hover:text-[#707070]"
                onClick={() => handlePrevPhoto()}
              >
                <FiChevronLeft className="w-10 h-10 absolute left-0 top-[45%]" />
              </div>
              <Image
                src={`${folder}/${photoObj.name}`}
                height={photoObj.height}
                width={photoObj.width}
                alt={photoObj.desc}
                placeholder="blur"
                blurDataURL={photoObj.blured}
                // className={""}
                className="max-h-[80vh] w-auto"
                quality={90}
              />
              <div
                className="absolute right-0 top-0 h-full w-[50%] text-transparent hover:text-[#707070]"
                onClick={() => handleNextPhoto()}
              >
                <FiChevronRight className="w-10 h-10 absolute right-0 top-[45%]" />
              </div>
            </div>

            <br />
            {/* <p className="text-[#ffffff]">{`${
              props.photos_json.photos.find((el) => el.name === name)?.name
            }`}</p> */}
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
