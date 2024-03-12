import Modal from "@/app/ui/modal";

export default function GalleriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Modal />
    </>
  );
}
