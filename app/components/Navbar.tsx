import React from "react";
import Image from "next/image";
import logo from "@/public/logo.png"

type Props = {};

export default function Navbar({}: Props) {
  return (
    <div className="bg-blue-600 w-full h-15 flex justify-between items-center">
      <div className="">
        <Image src={logo} alt="logo?" width={100} height={100}/>
      </div>
    </div>
  );
}
