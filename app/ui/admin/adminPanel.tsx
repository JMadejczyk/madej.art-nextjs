"use client";
import { useState, useContext } from "react";
import Login from "./login";
import { useRouter } from "next/navigation";
import AddPanel from "./addPanel";
import ChangePanel from "./changePanel";
import dotenv from "dotenv";
dotenv.config();
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdminPanel() {
  const router = useRouter();
  const [show, setShow] = useState("panel");

  const handleLogout = () => {
    fetch(`${apiUrl}/api/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        router.push("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // console.log("Wysłano żądanie wylogowania");
  };
  return (
    <div className="min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed flex flex-col">
      {show !== "panel" && (
        <button
          onClick={() => setShow("panel")}
          className="bg-dark-gray w-24 hover:bg-[#404040] hover:scale-105 p-4 rounded-xl border border-[#909090] shadow-custom_shadow m-8 mb-10"
        >
          Wróć
        </button>
      )}

      {show === "panel" && (
        <div className="h-screen flex justify-center items-center">
          <div className="flex flex-col gap-4 items-center">
            <h1 className="text-center text-2xl">Panel Administratora</h1>
            <h2 className="text-xl">Witaj, co chcesz zrobić?</h2>
            <div className="flex gap-4">
              <button
                className="bg-dark-gray w-28 hover:bg-[#404040] hover:scale-105 p-3 rounded-xl border border-[#909090] shadow-custom_shadow"
                onClick={() => setShow("add")}
              >
                Dodaj
              </button>
              <button
                className="bg-dark-gray w-28 hover:bg-[#404040] hover:scale-105 p-3 rounded-xl border border-[#909090] shadow-custom_shadow"
                onClick={() => setShow("change")}
              >
                Zmień
              </button>

              <button
                className="bg-dark-gray w-28 hover:bg-[#404040] hover:scale-105 p-3 rounded-xl border border-[#909090] shadow-custom_shadow"
                onClick={handleLogout}
              >
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      )}
      {show === "add" && <AddPanel />}
      {show === "change" && <ChangePanel />}
    </div>
  );
}
