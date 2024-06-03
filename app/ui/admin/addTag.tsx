import { useRef, useState } from "react";

const AddTag = () => {
  const [info, setInfo] = useState("");
  const tagElement = document.querySelector("#tag-name") as HTMLInputElement;

  const handleAddTag = () => {
    const tagName = tagElement.value;
    console.log(tagName);

    fetch("http://localhost:3001/api/photos/add/tag", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: tagName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInfo(data.message);
      })
      .catch((error) => {
        console.error(error);
      });
    tagElement.value = "";
  };

  const handleRemoveTag = () => {
    const tagName = tagElement.value;
    console.log(tagName);

    fetch("http://localhost:3001/api/photos/remove/tag", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: tagName }),
    })
      .then((response) => response.json())
      .then((data) => {
        setInfo(data.message);
      })
      .catch((error) => {
        console.error(error);
      });
    tagElement.value = "";
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex bg-[#404040] p-16 rounded-xl bg-[url('/img/noise_transparent.png')] bg-fixed flex-col items-center gap-12">
        <div className="flex gap-6">
          <input
            type="text"
            id="tag-name"
            placeholder="Nazwa tagu"
            className="bg-dark-gray p-5 rounded-xl border border-[#909090]"
          />
          <button
            onClick={() => handleAddTag()}
            className="bg-dark-gray w-28 hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090]"
          >
            Dodaj
          </button>
          <button
            onClick={() => handleRemoveTag()}
            className="bg-dark-gray w-28 hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090]"
          >
            Usuń
          </button>
        </div>

        <div className={`bg-[#404040] ${info ? "" : "hidden"}`}>{info}</div>
      </div>
    </div>
  );
};
export default AddTag;
