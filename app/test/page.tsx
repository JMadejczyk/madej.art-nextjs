"use client";

const testPhotos = [
  {
    name: "Img0801_.jpg",
    width: 633,
    height: 950,
    desc: "portrait",
    blured:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAIAAAD3rtNaAAAACXBIWXMAACTpAAAk6QFQJOf4AAAA50lEQVR4nAHcACP/ABwZECMjGAsNBgABAAQEAAEBABYVDwAyLyQyNSkwMisiIx0PEQ4QEA06QDgAPj8zSE07XlFOYlNOS1FAVVpPSVNIADQ0H2BkWNvR393P2GVnV09URkdIPQAlIAmHh4P4+P/x8v9oaF0yNSM4OywAJyIPaWhl9/n/xcfiXFxTPD0rMjIkACIiFzY2Lsmutr6uuUdIQDI1JjQ1KAAlJB0kJBtVQDleRj8YGxIeHRUjIxoAEQ8JFhYQHRkUNSclGhoVHBoSIx0YAAcGBBMTEykiKCopMw0ODwoLCgsJCA6tNWyMzhuSAAAAAElFTkSuQmCC",
  },
  {
    name: "Img0814_.jpg",
    width: 800,
    height: 533,
    desc: "portrait",
    blured:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAHCAIAAAC+zks0AAAACXBIWXMAACTpAAAk6QFQJOf4AAAA5ElEQVR4nAHZACb/AAADABgdHjQ3PBkcHV1cYYyPnX6DkJGWpI2Upm92hwBPUlZfYGVvcXhGQUIqEgBNTE9naXFgYmpeYWtDSFIAtLbH0tLi9PT/u6++ZlJYtK29+/v/4uT009Xmt7vOAJufrL+/zsXE0sK60Onh/tjL5fTv/9XY57y+zpygsgCSk6Kysr+vrrthXmV9c4Grp8CvlJqyo6itscKTlKQAf4COn5+tsbC+WlVdRT1GfXmJj4aSnpulmJuqeHuIAGprdXx8hZSUoVxXXA8CAHJwdq2tvJKToICCkGpuetafc8fYnsUvAAAAAElFTkSuQmCC",
  },
];
import PhotoModal from "@/app/ui/modal";
export default function Page() {
  return (
    <PhotoModal
      photo={testPhotos[0]}
      json_file_localization={"/data/portraits.json"}
      photos_folder={"/portraits"}
    />
  );
}
