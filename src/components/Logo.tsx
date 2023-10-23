import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="flex gap-1 items-end">
      {/* <h1 className="text-2xl font-bold">LOGO</h1> */}
      <Image
        src={"/images/logo/logo-icon.png"}
        alt="logo"
        width={100}
        height={100}
        className="object-contain"
      />
      <Image
        src={"/images/logo/logo-text.png"}
        alt="logo"
        width={80}
        height={80}
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;
