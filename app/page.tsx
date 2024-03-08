import Header from "@/app/ui/header";
import Photos_layout from "./ui/photos";

export default function Home() {
  return (
    //  bg-[#353535]
    <main className="min-h-screen h-auto bg-light-gray bg-[url('/img/noise_transparent.png')] bg-fixed">
      <Header />
      <Photos_layout
        json_file_localization={"/data/portraits.json"}
        photos_folder={"/portraits"}
      />
    </main>
  );
}
