import Image from "next/image";
import Header from "@/app/ui/header";
import Photos from "./ui/photos";

export default function Home() {
  return (
    <main className="h-screen min-h-screen bg-[#353535]">
      <Header />
      <Photos />
    </main>
  );
}
