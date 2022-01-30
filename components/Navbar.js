import Image from "next/image";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

export default function Navbar() {
  return (
    // <div className="flex bg-glass shadow-inner h-16 content-center">
    //   <div className="flex items-center gap-4 hover:bg-emerald-300 hover:text-xl">
    //     <h1 className="flex text-center">HI</h1>
    //     <h2>hola</h2>
    //   </div>
    // </div>

    <div className="flex justify-between bg-gray-900 h-16 z-10 p-[calc((100vw-100-px)/2)]">
      <div className="relative bg-glass items-center py-4 h-full w-24 cursor-pointer rounded-2xl bg-red-700">
        <Link href="/">
          <Image src="/chslogo.png" layout="fill" />
        </Link>
      </div>
    </div>
  );
}
