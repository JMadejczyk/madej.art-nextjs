"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function Modal() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  return (
    <>
      {modal && (
        <dialog className="fixed top-0 left-0 w-full h-full bg-dark-gray bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
          <div className="bg-[#ffffff] m-auto p-8">
            <div className="flex flex-col items-center">
              <h3>Modal content</h3>
              <Image
                src={`/portraits/Img0801_.jpg`}
                height={1200}
                width={1800}
                alt={"portrait"}
                placeholder="blur"
                blurDataURL={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAIAAAD3rtNaAAAACXBIWXMAACTpAAAk6QFQJOf4AAAA50lEQVR4nAHcACP/ABwZECMjGAsNBgABAAQEAAEBABYVDwAyLyQyNSkwMisiIx0PEQ4QEA06QDgAPj8zSE07XlFOYlNOS1FAVVpPSVNIADQ0H2BkWNvR393P2GVnV09URkdIPQAlIAmHh4P4+P/x8v9oaF0yNSM4OywAJyIPaWhl9/n/xcfiXFxTPD0rMjIkACIiFzY2Lsmutr6uuUdIQDI1JjQ1KAAlJB0kJBtVQDleRj8YGxIeHRUjIxoAEQ8JFhYQHRkUNSclGhoVHBoSIx0YAAcGBBMTEykiKCopMw0ODwoLCgsJCA6tNWyMzhuSAAAAAElFTkSuQmCC"
                }
                className={`m-auto max-h-full w-auto h-[1200px]  max-w-none`}
              />
              <br />
              <Link href={pathname}>
                <button type="button" className="bg-light-gray p-2">
                  Close Modal
                </button>
              </Link>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default Modal;
