"use client";
import { useState } from "react";
// import UserContext, { UserProvider } from "../lib/userContext";
// import AdminPanel from "../ui/adminPanel";
import Login from "../../ui/login";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  fetch("http://localhost:3001/api/auth", {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.message === "User authenticated") {
        router.push("/dashboard");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return <Login />;
}
