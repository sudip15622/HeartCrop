"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const TermsOfUse = () => {
  const t = useTranslations("Terms");
  const uses = t.raw("serviceUse.points");
  const duty = t.raw("responsibilities.points");

  return (
    <main className="flex flex-col gap-y-10">
      <section className="flex flex-col gap-y-2 w-full items-center text-center mb-4">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <p className="text-xl text-gray-500">{t("lastUpdated")}</p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("acceptance.title")}</h2>
        <p className="text-gray-500">{t("acceptance.description")}</p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("serviceUse.title")}</h2>
        <p className="text-gray-500">{t("serviceUse.description")}</p>
        <ul className="flex flex-col gap-y-2 text-gray-500 ml-6">
          <li className="list-disc">{uses[0]}</li>
          <li className="list-disc">{uses[1]}</li>
          <li className="list-disc">{uses[2]}</li>
        </ul>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("responsibilities.title")}</h2>
        <p className="text-gray-500">{t("responsibilities.description")}</p>
        <ul className="flex flex-col gap-y-2 text-gray-500 ml-6">
          <li className="list-disc">{duty[0]}</li>
          <li className="list-disc">{duty[1]}</li>
          <li className="list-disc">{duty[2]}</li>
          <li className="list-disc">{duty[3]}</li>
        </ul>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("property.title")}</h2>
        <p className="text-gray-500">
          {t("property.description")}
        </p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("limitation.title")}</h2>
        <p className="text-gray-500">
          {t("limitation.description")}
        </p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("changes.title")}</h2>
        <p className="text-gray-500">
          {t("changes.description")}
        </p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("contactInfo.title")}</h2>
        <p className="text-gray-500">
          <span>
            {t("contactInfo.description.text")}{" "}
          </span>
          <Link href={"/contact"} className="text-[rgb(25,118,210)]">
            {t("contactInfo.description.link")}
          </Link>
          <span>.</span>
        </p>
      </section>
    </main>
  );
};

export default TermsOfUse;
