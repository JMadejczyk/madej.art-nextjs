"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiXSquare, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

  const [isNext, setIsNext] = useState(true);
  // console.log(currPhotoId);
  const router = useRouter();

  console.log("Modal has been rerendered!");

  const handleNextPhoto = () => {
    setIsNext(true);
    router.push(
      nextPhotoName && folder
        ? pathname + `?modal=true&folder=${folder}&name=${nextPhotoName}`
        : pathname,
      { scroll: false }
    );
  };

  const handlePrevPhoto = () => {
    setIsNext(false);
    router.push(
      prevPhotoName && folder
        ? pathname + `?modal=true&folder=${folder}&name=${prevPhotoName}`
        : pathname,
      { scroll: false }
    );
  };

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
      <AnimatePresence>
        {modal && photoObj && (
          <motion.dialog
            className="fixed top-0 left-0 w-screen h-screen bg-dark-gray bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center select-none	"
            exit={{ backdropFilter: "none" }}
            initial={{ backdropFilter: "none" }}
            animate={{ backdropFilter: "blur(8px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => router.push(pathname, { scroll: false })}
            layout
          >
            <div className="bg-transparent m-auto p-8">
              {/* <div className="w-full flex justify-end">
              <Link href={pathname} scroll={false} className="mb-[-4px]">
                <button type="button">
                  <FiXSquare className="w-10 h-10 text-[#707070]" />
                </button>
              </Link>
            </div> */}
              <motion.div
                exit={{
                  opacity: 0,
                  // translateY: 1000,
                  // translateX: 1000,
                  scale: 0,
                  // rotate: "2137deg",
                }}
                initial={{
                  opacity: 0,
                  // translateY: 1000,
                  // translateX: 1000,

                  scale: 0,
                  // rotate: "2137deg",
                }}
                animate={{
                  opacity: 1,
                  // translateY: 0,
                  // translateX: 0,

                  scale: 1,
                  // rotate: "0deg",
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative h-full w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="absolute left-0 h-full w-[50%] text-transparent hover:text-[#707070]"
                  onClick={() => {
                    handlePrevPhoto();
                  }}
                >
                  <FiChevronLeft className="w-10 h-10 absolute left-0 top-[45%]" />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{
                      translateX: isNext
                        ? photoObj.width / 4
                        : -photoObj.width / 4,
                    }}
                    animate={{ translateX: 0 }}
                    exit={{
                      translateX: isNext
                        ? -photoObj.width / 4
                        : photoObj.width / 4,
                    }}
                    transition={{ duration: 0.125 }}
                    key={photoObj.name}
                    layout
                  >
                    <Image
                      src={`${folder}/${photoObj.name}`}
                      height={photoObj.height}
                      width={photoObj.width}
                      alt={photoObj.desc}
                      placeholder="blur"
                      blurDataURL={photoObj.blured}
                      priority={true}
                      // className={""}
                      className="max-h-[80vh] w-auto"
                      quality={90}
                      key={"image" + photoObj.name}
                    />
                  </motion.div>
                </AnimatePresence>
                <div
                  className="absolute right-0 top-0 h-full w-[50%] text-transparent hover:text-[#707070]"
                  onClick={() => {
                    handleNextPhoto();
                  }}
                >
                  <FiChevronRight className="w-10 h-10 absolute right-0 top-[45%]" />
                </div>
              </motion.div>

              <br />
              {/* <p className="text-[#ffffff]">{`${
              props.photos_json.photos.find((el) => el.name === name)?.name
            }`}</p> */}
            </div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </>
  );
}

export default Modal;
