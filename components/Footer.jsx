"use client";
import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

import { FaHeart, FaHome } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();

  return (
    <footer className="bg-[var(--background)] z-50 w-full flex items-center justify-center py-5 border-t-1 border-gray-300">
      <div className="w-full max-w-7xl mx-7 flex lg:flex-row flex-col gap-y-4 items-center lg:justify-between gap-x-10">
        <div className="flex flex-col gap-y-2 lg:items-start items-center">
          <div className="flex flex-row items-center gap-x-2">
            <span className="flex items-center justify-center text-xl">
              <FaHeart />
            </span>
            <span className="text-xl font-semibold">{t("title")}</span>
          </div>
          <p className="lg:text-start text-center">{t("description")}</p>
        </div>
        <div className="flex flex-col gap-y-4 lg:items-end items-center">
          <div className="flex items-center justify-center w-fit gap-x-5">
            <Link
              href={`/${locale}`}
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
          <div className="flex items-center justify-center w-fit gap-x-5 flex-wrap">
            <Link
              href={`/${locale}/privacy`}
              className="flex items-center justify-center"
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="flex items-center justify-center"
            >
              {t("termsOfUse")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="flex items-center justify-center"
            >
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
