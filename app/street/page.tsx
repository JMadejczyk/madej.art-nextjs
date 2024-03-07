import Header from "@/app/ui/header";
import Photos_layout from "../ui/photos";

export default function Home() {
  return (
    <main className="min-h-screen h-auto bg-[#353535]">
      <Header />
      <Photos_layout
        json_file_localization={"/data/street.json"}
        photos_folder={"/street"}
      />
    </main>
  );
}
