"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { FaHeart, FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="sticky top-0 left-0 bg-[var(--background)] z-50 w-full flex items-center justify-center shadow-md py-5 border-t-1 border-gray-300">
      <div className="w-full max-w-7xl mx-7 flex flex-row items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <div className="flex flex-row items-center gap-x-2">
            <span className="flex items-center justify-center text-xl">
              <FaHeart />
            </span>
            <span className="text-xl font-semibold">{t("title")}</span>
          </div>
          <p className="">
            {t("description")}
          </p>
        </div>
        <div className="flex flex-col gap-y-4 items-end">
          <div className="flex items-center justify-center w-fit gap-x-5">
            <Link
              href={"/"}
              className="flex items-center justify-center text-2xl"
            >
              <FaHome />
            </Link>
            <Link
              href={"mailto:sudip15622@gmail.com"}
              className="flex items-center justify-center text-2xl"
            >
              <MdEmail />
            </Link>
          </div>
          <div className="flex items-center justify-center w-fit gap-x-5">
            <Link href={"/"} className="flex items-center justify-center">
              {t("privacyPolicy")}
            </Link>
            <Link href={"/"} className="flex items-center justify-center">
              {t("termsOfUse")}
            </Link>
            <Link href={"/"} className="flex items-center justify-center">
              {t("contactUs")}
            </Link>
          </div>
          <div>&copy; {t("copyRight")}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
