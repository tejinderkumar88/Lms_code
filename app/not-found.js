import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto not-found">
      <h2 className="not-found">Page Found</h2>
      <p>Could not find requested resource</p>
  
      <div className="flex flex-col align-items-center justify-content-center not-found-wrap ">
          <Image
            src={"/404.jpg"}
            alt="404"
            width={400}
            height={400}
            className="not_found_img"
          />
      </div>
      <Link href="/" className="btnnotfound">
          Return Home
        </Link>
    </div>
  );
}
