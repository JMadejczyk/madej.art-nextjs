import Image from "next/image";
import { PhotoConfig } from "@/app/types/FetchPhotosConfig";
import { goudy } from "@/app/ui/fonts";
import styles from "./photos.module.css";
import dotenv from "dotenv";
dotenv.config();
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const handleDelete = (photo_id: number, renderCountHandler: () => void) => {
  fetch(`${apiUrl}/api/photos/remove`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ photos: [{ photo_id: photo_id }] }),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      renderCountHandler();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  // console.log("Wysłano żądanie usunięcia zdjęcia");
};

const SmallImage = (props: {
  image: PhotoConfig;
  index: number;
  renderCountHandler: () => void;
  handleSetModalImage: (image: PhotoConfig) => void;
}) => {
  const handleGetTags = async (photo_id: number) => {
    try {
      const response = await fetch(
        `${apiUrl}/api/photos/get/tags/${photo_id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      let tags = data.tags.map((tag: { name: string }) => tag.name);
      props.handleSetModalImage({ ...props.image, tags: tags });
      return tags;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.photo} w-full relative`}>
      <Image
        src={`/${props.image.localization}/${props.image.file_name}`}
        width={props.image.width}
        height={props.image.height}
        sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, (max-width: 1020px) 25vw, (max-width: 1280px) 20vw, (max-width: 1535px) 18vw, 15vw"
        quality={75}
        alt={props.image.description}
        className="shadow-custom_shadow"
        key={props.image.file_name + "photo"}
        priority={props.index <= 15 ? true : false}
        placeholder="blur"
        blurDataURL={props.image.blurred}
      />
      <div
        className={`w-full ${styles.descr} absolute left-0 bottom-0 text-[#161616] h-9 flex justify-center items-center bg-[#ffffff33] backdrop-blur-[20px] duration-[400ms] ${goudy.className} `}
      >
        {props.image.description}
      </div>
      <div
        className={`${styles.descr} absolute left-0 top-0 p-4 opacity-0 hover:opacity-100 hover:bg-[#ff6666] cursor-pointer text-[#161616] h-9 flex justify-center items-center bg-[#ffffff33] backdrop-blur-[20px] duration-[400ms] ${goudy.className}`}
        onClick={() => {
          handleDelete(props.image.photo_id, props.renderCountHandler);
        }}
      >
        Usuń
      </div>
      <div
        className={`${styles.descr} absolute right-0 top-0 p-4 opacity-0 hover:opacity-100 hover:bg-[#66ff66] cursor-pointer text-[#161616] h-9 flex justify-center items-center bg-[#ffffff33] backdrop-blur-[20px] duration-[400ms] ${goudy.className}`}
        onClick={() => {
          handleGetTags(props.image.photo_id);
        }}
      >
        Edytuj
      </div>
    </div>
    // </Link>
  );
};

export default SmallImage;
// Path: app/ui/admin/smallImage.tsx
