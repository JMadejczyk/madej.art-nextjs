import { useRef, useState, useEffect } from "react";
// import Image from "next/image";

interface fileWithDescriptionAndTags {
  file: File;
  description: string;
  tags: string;
}

const AddPhoto = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filesWithDescriptions, setFilesWithDescriptions] = useState<
    fileWithDescriptionAndTags[]
  >([]);
  const [message, setMessage] = useState<string>("");

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFilesWithDescriptions(
        files.map((file) => ({ file, description: "", tags: "" }))
      );
    }
  };

  const handleDescriptionChange = (index: number, description: string) => {
    setFilesWithDescriptions((prev) =>
      prev.map((fileWithDescriptionAndTags, i) =>
        i === index
          ? { ...fileWithDescriptionAndTags, description }
          : fileWithDescriptionAndTags
      )
    );
  };

  const handleTagsChange = (index: number, tags: string) => {
    setFilesWithDescriptions((prev) =>
      prev.map((fileWithDescriptionAndTags, i) =>
        i === index
          ? { ...fileWithDescriptionAndTags, tags }
          : fileWithDescriptionAndTags
      )
    );
  };

  const handleImageClick = (file: File) => {
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  const uploadImages = async (
    filesWithDescriptions: fileWithDescriptionAndTags[],
    option: "top" | "bottom"
  ) => {
    const formData = new FormData();

    filesWithDescriptions.forEach((fileWithDescriptionAndTags, index) => {
      formData.append(`images`, fileWithDescriptionAndTags.file);
      formData.append(`descriptions`, fileWithDescriptionAndTags.description);
      formData.append(`tags`, fileWithDescriptionAndTags.tags);
    });

    try {
      const response = await fetch(
        `http://localhost:3001/api/photos/add/${option}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log(data);
      setMessage(data.message);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation: ",
        error
      );
    }
  };

  return (
    <div className="flex justify-center pb-16">
      <div className=" bg-[#404040] mr-28 ml-28 p-16 pl-20 pr-20 rounded-xl bg-[url('/img/noise_transparent.png')] bg-fixed w-fit">
        <div
          className={`flex flex-col ${
            filesWithDescriptions.length > 0 ? "gap-4" : ""
          } items-center`}
        >
          <button
            onClick={handleFileButtonClick}
            className="bg-dark-gray hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090] shadow-custom_shadow"
          >
            Wybierz plik
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
          {filesWithDescriptions.map((fileWithDescriptionAndTags, index) => (
            <div key={index + "zdj"} className="flex items-center gap-4">
              <img
                src={URL.createObjectURL(fileWithDescriptionAndTags.file)}
                alt={fileWithDescriptionAndTags.file.name}
                className="w-[3.33rem] h-20 object-cover rounded-xl hover:scale-105 shadow-custom_shadow cursor-pointer"
                onClick={() =>
                  handleImageClick(fileWithDescriptionAndTags.file)
                }
              />
              <div className="w-[60vw]">
                <p>{fileWithDescriptionAndTags.file.name}</p>
                <input
                  className="w-full bg-dark-gray p-4 rounded-xl border border-[#909090] mb-2 shadow-custom_shadow"
                  type="text"
                  placeholder="Opis"
                  onBlur={(event) => {
                    handleDescriptionChange(index, event.target.value);
                  }}
                />
                <input
                  className="w-full bg-dark-gray p-4 rounded-xl border border-[#909090] shadow-custom_shadow"
                  type="text"
                  placeholder="Tagi (oddzielone przecinkiem)"
                  onBlur={(event) => {
                    handleTagsChange(index, event.target.value);
                  }}
                />
              </div>
            </div>
          ))}

          {selectedImage && (
            <div
              className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10"
              onClick={handleCloseModal}
            >
              <div className="bg-white p-4 rounded-xl">
                <img
                  src={selectedImage}
                  alt="Wybrane zdjęcie"
                  className="max-h-[90vh] max-w-[90vw] h-auto object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <button onClick={handleCloseModal}>Zamknij</button>
              </div>
            </div>
          )}

          <div>
            {filesWithDescriptions.length > 0 && (
              <>
                <div className="flex gap-8 mt-4">
                  <button
                    className="bg-dark-gray w-40 hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090] shadow-custom_shadow"
                    onClick={() => uploadImages(filesWithDescriptions, "top")}
                  >
                    Dodaj od góry
                  </button>
                  <button
                    className="bg-dark-gray w-40 hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090] shadow-custom_shadow"
                    onClick={() =>
                      uploadImages(filesWithDescriptions, "bottom")
                    }
                  >
                    Dodaj od dołu
                  </button>
                </div>

                <div className="text-center mt-8">{message}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddPhoto;
