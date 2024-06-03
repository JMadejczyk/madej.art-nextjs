"use client";
import { useState } from "react";
// import UserContext, { UserProvider } from "../lib/userContext";
// import AdminPanel from "../ui/adminPanel";
import Login from "../../ui/admin/login";
import AdminPanel from "../../ui/admin/adminPanel";

export default function Admin() {
  const [haveAccess, setHaveAccess] = useState(false);

  fetch("http://localhost:3001/api/auth/", {
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
