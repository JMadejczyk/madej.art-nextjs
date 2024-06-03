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
      <div className="min-h-[90vh] h-auto bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed flex justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-center text-2xl">Panel logowania</h1>
          <div>
            <input
              className="w-full bg-dark-gray p-4 rounded-xl border border-[#909090] mb-2 shadow-custom_shadow"
              type="text"
              placeholder="Nazwa użytkownika"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="w-full bg-dark-gray p-4 rounded-xl border border-[#909090] mb-2 shadow-custom_shadow"
              type="password"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="bg-dark-gray w-32 hover:bg-[#404040] hover:scale-105 p-3 rounded-xl border border-[#909090] shadow-custom_shadow"
            onClick={handleLogin}
          >
            Zaloguj
          </button>
        </div>
      </div>
    </>
  );
}
