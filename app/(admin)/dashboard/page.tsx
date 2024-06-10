"use client";
import { useState } from "react";
// import UserContext, { UserProvider } from "../lib/userContext";
// import AdminPanel from "../ui/adminPanel";
import Login from "../../ui/admin/login";
import AdminPanel from "../../ui/admin/adminPanel";
import dotenv from "dotenv";
dotenv.config();
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Admin() {
  const [haveAccess, setHaveAccess] = useState(false);

  fetch(`${apiUrl}/api/auth/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === "User authenticated") {
        setHaveAccess(true);
      } else {
        setHaveAccess(false);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return haveAccess ? <AdminPanel /> : <Login />;
}
