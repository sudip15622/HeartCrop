"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { IoMdCheckmark } from "react-icons/io";
import { FaHeart, FaCaretDown } from "react-icons/fa";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropDownRef = useRef(null);

  useEffect(() => {
        function handleClickOutside(event) {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [isOpen]);

  // Language codes only, names will be translated below
  const languages = [
    { code: "en" },
    { code: "de" },
    { code: "es" },
    { code: "fr" },
    { code: "pt" },
    { code: "it" },
    { code: "hi" },
  ];

  // Get current language from pathname
  const currentLang =
    languages.find((lang) => pathname.startsWith(`/${lang.code}`)) ||
    languages[0];

  const redirectedPathName = (locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <nav className="sticky top-0 left-0 bg-[var(--background)] z-50 w-full flex items-center justify-center shadow-md">
      <div className="w-full max-w-7xl mx-7 my-4 flex flex-row items-center justify-between">
        <Link href={"/"} className="flex flex-row items-center gap-x-2"> 
          <span className="flex items-center justify-center text-xl">
            <FaHeart />
          </span>
          <span className="text-xl font-semibold">{t("title")}</span>
        </Link>

        {/* Language Selector */}
        <div className="relative" ref={dropDownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-[120px] shadow-md rounded-[6px] py-2 px-3"
          >
            <span>{t(`languages.${currentLang.code}`)}</span>
            <span
              className={`flex items-center justify-center text-xl transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <FaCaretDown />
            </span>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-[120px] bg-white rounded-md shadow-lg z-50 border border-gray-200">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={redirectedPathName(lang.code)}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 text-sm flex flex-row items-center justify-between`}
                >
                  <span>{t(`languages.${lang.code}`)}</span>
                  {currentLang.code === lang.code && (
                    <span className="flex items-center justify-center text-[18px]">
                      <IoMdCheckmark />
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
