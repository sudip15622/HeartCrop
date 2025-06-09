"use client";
import React, { useEffect, useState } from "react";
// import { useTheme } from "@/contexts/themeContext";

// import { IoSunny } from "react-icons/io5";
// import { BsMoonStarsFill } from "react-icons/bs";
import { FaHeart, FaCaretDown } from "react-icons/fa";

const Navbar = () => {
//   const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 left-0 bg-[var(--background)] z-50 w-full flex items-center justify-center shadow-md">
      <div className="w-full max-w-7xl mx-7 my-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-x-2">
          <span className="flex items-center justify-center text-xl">
            <FaHeart />
          </span>
          <span className="text-xl font-semibold">HeartCrop</span>
        </div>
        {/* <button onClick={() => toggleTheme()} className="flex items-center justify-center text-xl">
            {theme === "dark" ? <IoSunny /> : <BsMoonStarsFill />}
        </button> */}
        <button className="flex items-center justify-between w-[120px] shadow-md rounded-xs py-1 px-2">
            <span className="">English</span>
            <span className="flex items-center justify-center text-xl"><FaCaretDown /></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
