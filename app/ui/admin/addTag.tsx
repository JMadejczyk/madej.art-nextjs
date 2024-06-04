import { useRef, useState } from "react";

const AddTag = () => {
  const [info, setInfo] = useState("");
  const ref = useRef<HTMLInputElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;

  const handleAddOrRemoveTag = async (action: "add" | "remove") => {
    const tagName = ref.current.value;
    try {
      const response = await fetch(
        `http://localhost:3001/api/photos/${action}/tag`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: tagName }),
        }
      );
      const data = await response.json();
      setInfo(data.message);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      ref.current.value = "";
    } catch (error) {
      console.error(error);
    }
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
            ref={ref}
          />
          <button
            onClick={() => handleAddOrRemoveTag("add")}
            className="bg-dark-gray w-28 hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090]"
          >
            Dodaj
          </button>
          <button
            onClick={() => handleAddOrRemoveTag("remove")}
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
