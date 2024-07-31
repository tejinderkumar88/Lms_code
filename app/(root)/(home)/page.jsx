import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="homepage text-center">
      <Image
        src="/logo.svg"
        className="img-fluid"
        alt="Logo"
        width={500}
        height={500}
      />
    </div>
  );
};

export default page;
