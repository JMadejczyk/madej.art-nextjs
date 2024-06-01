import { useRef, useState } from "react";
// import Image from "next/image";

interface FileWithDescription {
  file: File;
  description: string;
}

const AddPhoto = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filesWithDescriptions, setFilesWithDescriptions] = useState<
    FileWithDescription[]
  >([]);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFilesWithDescriptions(
        files.map((file) => ({ file, description: "" }))
      );
    }
  };

  const handleDescriptionChange = (index: number, description: string) => {
    setFilesWithDescriptions((prev) =>
      prev.map((fileWithDescription, i) =>
        i === index
          ? { ...fileWithDescription, description }
          : fileWithDescription
      )
    );
  };

  const handleImageClick = (file: File) => {
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex justify-center">
      <div className=" bg-[#404040] mr-28 ml-28 p-16 pl-20 pr-20 rounded-xl bg-[url('/img/noise_transparent.png')] bg-fixed w-fit">
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={handleFileButtonClick}
            className="bg-dark-gray hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090]"
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
          {filesWithDescriptions.map((fileWithDescription, index) => (
            <div key={index} className="flex items-center gap-4">
              <img
                src={URL.createObjectURL(fileWithDescription.file)}
                alt={fileWithDescription.file.name}
                className="w-20 h-20 object-cover rounded-xl"
                onClick={() => handleImageClick(fileWithDescription.file)}
              />
              <div>
                <p>{fileWithDescription.file.name}</p>
                <input
                  className="w-[60vw] bg-dark-gray p-4 rounded-xl border border-[#909090]"
                  type="text"
                  placeholder="Opis"
                  onBlur={(event) => {
                    handleDescriptionChange(index, event.target.value);
                  }}
                />
              </div>
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
            </div>
          ))}
          <button
            className="bg-dark-gray w-28 hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090]"
            onClick={() => console.log(filesWithDescriptions)}
          >
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddPhoto;
