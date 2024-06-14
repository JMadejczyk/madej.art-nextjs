"use client";
import { useState } from "react";
// import UserContext, { UserProvider } from "../lib/userContext";
// import AdminPanel from "../ui/adminPanel";
import Login from "../../ui/admin/login";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
dotenv.config();
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Admin() {
  const router = useRouter();

  fetch(`${apiUrl}/api/auth`, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (data.message === "User authenticated") {
        router.push("/dashboard");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return <Login />;
}
