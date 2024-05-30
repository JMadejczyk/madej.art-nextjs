"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:3001/api/login/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setUser(data);
        // console.log(user);
        router.push("/dashboard");
        router.refresh();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("Wysłano żądanie logowania");
  };
  return (
    <>
      <div>
        <h1>Panel logowania</h1>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Zaloguj</button>
      </div>
    </>
  );
}
