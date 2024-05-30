import { useRef } from "react";
const AddPhoto = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
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
          <input type="file" ref={fileInputRef} className="hidden" />
          <input
            className="w-[60vw] bg-dark-gray p-4 rounded-xl border border-[#909090]"
            type="text"
            placeholder="Tytuł"
          />
          <input
            className="w-[60vw] bg-dark-gray p-4 rounded-xl border border-[#909090]"
            type="text"
            placeholder="Opis"
          />
          <input
            className="w-[60vw] bg-dark-gray p-4 rounded-xl border border-[#909090]"
            type="text"
            placeholder="Tagi (oddzielone przecinkami)"
          />
          <button className="bg-dark-gray w-28 hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090]">
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddPhoto;
