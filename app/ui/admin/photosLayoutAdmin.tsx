"use client";

import { useState } from "react";
import Masonry from "@mui/lab/Masonry";
import { FetchPhotosConfig, PhotoConfig } from "@/app/types/FetchPhotosConfig";
import SmallImage from "@/app/ui/admin/smallImage";
import ChangePhotoDataModal from "@/app/ui/admin/changePhotoDataModal";

export default function Photos_layout_Admin(props: {
  photos_json: FetchPhotosConfig;
  renderCountHandler: () => void;
}) {
  // console.log("Images has been rerendered");
  const [modalImage, setModalImage] = useState<PhotoConfig | null>(null);
  const handleSetModalImage = (image: PhotoConfig | null) => {
    setModalImage(image);
  };

  // console.log("Modal image: ", modalImage);
  return (
    props.photos_json && (
      <div className="2xl:w-7/12 xl:w-9/12 lg:w-10/12 md:w-11/12 md:mr-auto md:ml-auto flex justify-center mt-2  mr-2 ml-2 pb-16">
        {
          <Masonry
            columns={{ xs: 2, sm: 3, md: 4 }}
            spacing={2}
            className="m-0 pb-4"
            defaultHeight={6000}
            // defaultColumns={4}
            defaultSpacing={2}
          >
            {props.photos_json.photos.map((image, index) => (
              <div key={index}>
                <SmallImage
                  image={image}
                  index={index}
                  renderCountHandler={props.renderCountHandler}
                  handleSetModalImage={handleSetModalImage}
                />
              </div>
            ))}
          </Masonry>
        }
        {modalImage && (
          <ChangePhotoDataModal
            handleSetModalImage={handleSetModalImage}
            modalImage={modalImage}
          />
        )}
      </div>
    )
  );
}
