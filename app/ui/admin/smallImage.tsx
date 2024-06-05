import Image from "next/image";
import { PhotoConfig } from "@/app/types/FetchPhotosConfig";
import { goudy } from "@/app/ui/fonts";
import styles from "./photos.module.css";

const handleDelete = (photo_id: number, renderCountHandler: () => void) => {
  fetch("http://localhost:3001/api/photos/remove", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ photos: [{ photo_id: photo_id }] }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderCountHandler();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  console.log("Wysłano żądanie usunięcia zdjęcia");
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
        `http://localhost:3001/api/photos/get/tags/${photo_id}`,
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
    // <Link
    //   href={`?modal=true&folder=/${props.image.localization}&file_name=${props.image.file_name}`}
    //   scroll={false}
    //   className={`select-none`}
    // >
    <div className={`${styles.photo} w-full relative`}>
      <Image
        src={`/${props.image.localization}/${props.image.file_name}`}
        width={props.image.width}
        height={props.image.height}
        quality={60}
        alt={props.image.description}
        className="shadow-custom_shadow"
        key={props.image.file_name}
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
          //   handleDelete(props.image.photo_id, props.renderCountHandler);
          handleGetTags(props.image.photo_id);
          // props.handleSetModalImage(props.image);
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
