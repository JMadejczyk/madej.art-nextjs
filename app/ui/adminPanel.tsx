"use client";
import { useState, useContext } from "react";
import Login from "./login";
import { useRouter } from "next/navigation";

export default function AdminPanel() {
  const router = useRouter();

  const handleLogout = () => {
    fetch("http://localhost:3001/api/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        router.push("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("Wysłano żądanie wylogowania");
  };
  return (
    <div>
      <h1>Panel administratora</h1>
      <h2>Witaj</h2>
      <button onClick={handleLogout}>Wyloguj</button>
    </div>
  );
}
