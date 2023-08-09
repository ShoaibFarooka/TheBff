"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  return (
    <div className="fixed top-0 left-0 bg-transparent backdrop-blur text-white w-screen flex justify-between items-center p-5 px-[10%] md:px-[20%]" style={{zIndex: 999}}>
      <h1 className="text-2xl font-bold">LOGO</h1>
      {/* menu */}
      <ul className="hidden md:flex">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Programs</a>
        </li>
        <li>
          <a href="#">Pricing</a>
        </li>

        <li>
          <a href="#">Blogs</a>
        </li>
      </ul>
      <button className="hidden md:flex rounded-xl px-4 py-2 text-[#FED25B] border-2 border-[#FED25B] bg-[#FED25B] bg-opacity-20 hover:text-black hover:bg-opacity-100">
        Login/Signup
      </button>

      {/* Hamburger */}
      <div onClick={handleClick} className="md:hidden z-10">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu */}
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-black flex flex-col justify-center items-center"
        }
      >
        <li className="py-6 text-2xl">
          <a href="#">Home</a>
        </li>
        <li className="py-6 text-2xl">
          <a href="#">Programs</a>
        </li>
        <li className="py-6 text-2xl">
          <a href="#">Pricing</a>
        </li>

        <li className="py-6 text-2xl">
          <a href="#">Blogs</a>
        </li>
        <li>
          <button className="rounded-xl px-4 py-2 text-[#FED25B] border-2 border-[#FED25B] bg-[#FED25B] bg-opacity-20">
            Login/Signup
          </button>
        </li>
      </ul>
    </div>
  );
}
