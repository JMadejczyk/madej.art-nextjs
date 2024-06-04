"use client";
import React from "react";
import { useState } from "react";
import AddTag from "./addTag";
import AddPhoto from "./addPhoto";

const Add = () => {
  const [choice, setChoice] = useState("photo");
  return (
    // {choice === "photo" && <AddPhoto />}
    // {choice === "tag" && <AddTag />}

    <div className="min-h-[80vh] h-auto  bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed">
      <div className="h-full w-full pb-16 gap-10 flex items-center flex-col">
        <h1>Wybierz co chcesz dodać:</h1>
        <div className="flex gap-6">
          <button
            onClick={() => setChoice("photo")}
            className="bg-dark-gray w-28 hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090] shadow-custom_shadow"
          >
            Zdjęcia
          </button>
          <button
            onClick={() => setChoice("tag")}
            className="bg-dark-gray w-28 hover:bg-[#404040] hover:scale-105 p-5 rounded-xl border border-[#909090] shadow-custom_shadow"
          >
            Tagi
          </button>
        </div>
      </div>
      {choice === "photo" && <AddPhoto />}
      {choice === "tag" && <AddTag />}
    </div>
  );
};

export default Add;
