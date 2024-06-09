import { PhotoConfig } from "@/app/types/FetchPhotosConfig";
import Image from "next/image";
import { useRef } from "react";

const ChangePhotoDataModal = (props: {
  handleSetModalImage: (image: PhotoConfig | null) => void;
  modalImage: PhotoConfig;
  renderCountHandler: () => void;
}) => {
  const ref = useRef<HTMLInputElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;
  const ref2 = useRef<HTMLInputElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;

  const handleUpdatePhotoData = async () => {
    try {
      const tags = ref2.current.value.split(",").map((tag) => tag.trim());
      // console.log("tags: ", tags);
      if (tags[0].length > 0) {
        const response = await fetch(
          "http://localhost:3001/api/photos/update/tags",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              photo_id: props.modalImage.photo_id,
              tags: tags,
            }),
          }
        );
        if (response.ok) {
          let data = await response.json();
          // console.log(data.message);
          ref2.current.value = "";
          ref2.current.placeholder = data.tags.join(", ");
        }
      }
      const description = ref.current.value;
      // console.log("description: ", description);

      if (description) {
        const response2 = await fetch(
          "http://localhost:3001/api/photos/update/description",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              photo_id: props.modalImage.photo_id,
              description: description,
            }),
          }
        );
        if (response2.ok) {
          let data = await response2.json();
          // console.log(data.message);
          ref.current.value = "";
          ref.current.placeholder = data.description;
        }
      }
      props.renderCountHandler();
    } catch (err) {
      // console.log(err);
      console.error(err);
    }
  };

  // console.log("Modal refresher: ", modalRefresher);
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
      <div className="bg-[#444444] p-8 m-10 rounded-xl shadow-custom_shadow">
        <button
          className="bg-[#aa2222] text-white p-2 rounded-xl hover:bg-[#ff6666] hover:scale-[102%] shadow-custom_shadow"
          onClick={() => props.handleSetModalImage(null)}
        >
          Zamknij
        </button>
        <Image
          key={props.modalImage.file_name}
          src={`/${props.modalImage.localization}/${props.modalImage.file_name}`}
          width={props.modalImage.width}
          height={props.modalImage.height}
          placeholder="blur"
          blurDataURL={props.modalImage.blurred}
          sizes={
            props.modalImage.width > props.modalImage.height
              ? `(max-width: 1250px) 90vw, (max-width: 1800px) 80vw, 70vw`
              : `(max-width: 600px) 100vw, (max-width: 800px) 90vw, (max-width: 1000px) 83vw, (max-width: 1400px) 70vw, 50vw`
          }
          quality={80}
          alt={props.modalImage.description}
          className="max-h-[55vh] w-auto rounded-xl shadow-custom_shadow mt-4 mb-4"
        />
        <h2 className="text-center">Opis</h2>

        <input
          type="text"
          className="w-full bg-dark-gray p-3 rounded-xl border border-[#909090] mb-2 shadow-custom_shadow"
          placeholder={props.modalImage.description}
          ref={ref}
        />
        <h2 className="text-center">Tagi</h2>
        <input
          type="text"
          className="w-full bg-dark-gray p-3 rounded-xl border border-[#909090] mb-4 shadow-custom_shadow"
          placeholder={props.modalImage.tags?.join(", ")}
          ref={ref2}
        />
        <button
          className="bg-[#22aa22] text-white p-2 rounded-xl hover:bg-[#44cc44] hover:scale-[102%] shadow-custom_shadow"
          onClick={() => {
            handleUpdatePhotoData();
          }}
        >
          Zapisz
        </button>
      </div>
    </div>
  );
};

export default ChangePhotoDataModal;
