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

  //Check if useState below is necessary
  const [isNext, setIsNext] = useState(true);

  // console.log(currPhotoId);
  const router = useRouter();
  const cooldown = useRef(false);

  // console.log("Modal has been rerendered!");

  const handleNextPhoto = (cooldownDuration: number = 0) => {
    const doRouting = () => {
      router.push(
        nextPhotoName && folder
          ? pathname + `?modal=true&folder=${folder}&name=${nextPhotoName}`
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
        prevPhotoName && folder
          ? pathname + `?modal=true&folder=${folder}&name=${prevPhotoName}`
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
          <motion.div
            className="fixed top-0 left-0 h-screen w-full flex justify-center items-center focus:outline-none outline-dark-gray"
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
                    scale: 0.3,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0.3,
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
                      }}
                      animate={{ translateX: 0 }}
                      exit={{
                        translateX: isNext
                          ? -photoObj.width / 4
                          : photoObj.width / 4,
                      }}
                      transition={{ duration: 0.125 }}
                      key={photoObj.name}
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
                        priority={true}
                        className="max-h-[80vh] w-auto"
                        quality={90}
                        key={"image" + photoObj.name}
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
