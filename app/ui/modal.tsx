"use client";

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { FiXSquare, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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

function Modal(props: { photos_json: FetchPhotosConfig }) {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const file_name = searchParams.get("file_name");
  const pathname = usePathname();

  const photoObj = props.photos_json.photos.find(
    (el) => el.file_name === file_name
  );

  const currPhotoId = props.photos_json.photos.findIndex(
    (el) => el === photoObj
  );

  const nextPhotoName = props.photos_json.photos[currPhotoId + 1]?.file_name;
  const prevPhotoName = props.photos_json.photos[currPhotoId - 1]?.file_name;
  const nextPhotoFolder =
    props.photos_json.photos[currPhotoId + 1]?.localization;
  const prevPhotoFolder =
    props.photos_json.photos[currPhotoId - 1]?.localization;

  const [isNext, setIsNext] = useState(true);

  // console.log(currPhotoId);
  const router = useRouter();
  const cooldown = useRef(false);

  // console.log("Modal has been rerendered!");

  const handleNextPhoto = (cooldownDuration: number = 0) => {
    // currentPhotoFolder = nextPhotoFolder;
    const doRouting = () => {
      router.push(
        nextPhotoName
          ? pathname +
              `?modal=true&folder=/${nextPhotoFolder}&file_name=${nextPhotoName}`
          : pathname,
        { scroll: false }
      );
    };
    if (cooldownDuration === 0) {
      setIsNext(true);
      doRouting();
    } else if (!cooldown.current) {
      cooldown.current = true;
      setIsNext(true);
      doRouting();
      setTimeout(() => {
        cooldown.current = false;
      }, cooldownDuration);
    }
  };

  const handlePrevPhoto = (cooldownDuration: number = 0) => {
    const doRouting = () => {
      router.push(
        prevPhotoName
          ? pathname +
              `?modal=true&folder=/${prevPhotoFolder}&file_name=${prevPhotoName}`
          : pathname,
        { scroll: false }
      );
    };
    if (cooldownDuration === 0) {
      setIsNext(false);
      doRouting();
    } else if (!cooldown.current) {
      cooldown.current = true;
      setIsNext(false);
      doRouting();
      setTimeout(() => {
        cooldown.current = false;
      }, cooldownDuration);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNextPhoto(500);
      } else if (e.key === "ArrowLeft") {
        handlePrevPhoto(500);
      }
    };
    const document = window.document;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, pathname, searchParams, file_name, nextPhotoName, prevPhotoName]);

  return (
    <>
      <AnimatePresence>
        {modal && photoObj && (
          <motion.div
            className="z-20 fixed top-0 left-0 h-screen w-full flex justify-center items-center focus:outline-none outline-dark-gray"
            onClick={(e) => router.push(pathname, { scroll: false })}
            exit={{ backdropFilter: "none", backgroundColor: "rgb(0 0 0 0)" }}
            initial={{
              backdropFilter: "none",
              backgroundColor: "rgb(0 0 0 0)",
            }}
            animate={{
              backdropFilter: "blur(8px)",
              backgroundColor: "rgb(32 32 32 0.5)",
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <dialog className="bg-transparent bg-opacity-0 z-50 flex justify-center items-center select-none">
              <div className="bg-transparent m-auto p-8 ">
                <motion.div
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative h-full w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      initial={{
                        translateX: isNext
                          ? photoObj.width / 4
                          : -photoObj.width / 4,
                        opacity: 0,
                      }}
                      animate={{ translateX: 0, opacity: 1 }}
                      exit={{
                        translateX: isNext
                          ? -photoObj.width / 4
                          : photoObj.width / 4,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.125 }}
                      key={photoObj.file_name}
                    >
                      <div
                        className="absolute left-0 h-full w-[50%] text-transparent hover:text-[#707070]"
                        onClick={() => handlePrevPhoto()}
                      >
                        <FiChevronLeft className="w-10 h-10 absolute left-0 top-[45%]" />
                      </div>

                      <Image
                        src={`/${photoObj.localization}/${photoObj.file_name}`}
                        height={photoObj.height}
                        width={photoObj.width}
                        alt={photoObj.description}
                        placeholder="blur"
                        blurDataURL={photoObj.blurred}
                        priority={true}
                        className="max-h-[80vh] w-auto"
                        quality={90}
                        key={"image" + photoObj.file_name}
                      />

                      <div
                        className="absolute right-0 top-0 h-full w-[50%] text-transparent hover:text-[#707070]"
                        onClick={() => handleNextPhoto()}
                      >
                        <FiChevronRight className="w-10 h-10 absolute right-0 top-[45%]" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            </dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Modal;
