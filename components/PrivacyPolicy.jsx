"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const PrivacyPolicy = () => {
  const t = useTranslations("Privacy");
  const info = t.raw("information.points");
  const tech = t.raw("techInfo.points");
  const party = t.raw("thirdParty.points");

  return (
    <main className="flex flex-col gap-y-10">
      <section className="flex flex-col gap-y-2 w-full items-center text-center mb-4">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <p className="text-xl text-gray-500">
          {t("lastUpdated")}
        </p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("introduction.title")}</h2>
        <p className="text-gray-500">{t("introduction.description")}</p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("information.title")}</h2>
        <p className="text-gray-500">{t("information.description")}</p>
        <ul className="flex flex-col gap-y-2 text-gray-500 ml-6">
          <li className="list-disc">{info[0]}</li>
          <li className="list-disc">{info[1]}</li>
          <li className="list-disc">{info[2]}</li>
          <li className="list-disc">{info[3]}</li>
        </ul>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("techInfo.title")}</h2>
        <p className="text-gray-500">
          {t("techInfo.description")}
        </p>
        <ul className="flex flex-col gap-y-2 text-gray-500 ml-6">
          <li className="list-disc">{tech[0]}</li>
          <li className="list-disc">{tech[1]}</li>
          <li className="list-disc">{tech[2]}</li>
          <li className="list-disc">{tech[3]}</li>
        </ul>
        <p className="text-gray-500">
          {t("techInfo.descriptionEnd")}
        </p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("thirdParty.title")}</h2>
        <p className="text-gray-500">{t("thirdParty.description")}</p>
        <ul className="flex flex-col gap-y-2 text-gray-500 ml-6">
          <li className="list-disc">{party[0]}</li>
          <li className="list-disc">{party[1]}</li>
          <li className="list-disc">{party[2]}</li>
        </ul>
        <p className="text-gray-500">
          {t("thirdParty.descriptionEnd")}
        </p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("security.title")}</h2>
        <p className="text-gray-500">
          {t("security.description")}
        </p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("childrenPrivacy.title")}</h2>
        <p className="text-gray-500">
          {t("childrenPrivacy.description")}
        </p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("changes.title")}</h2>
        <p className="text-gray-500">
          {t("changes.description")}
        </p>
      </section>
      <section className="flex flex-col gap-y-4 p-10 rounded-xl shadow-md border-1 border-gray-300 w-full">
        <h2 className="text-2xl font-semibold">{t("contactUs.title")}</h2>
        <p className="text-gray-500">
          <span>
            {t("contactUs.description.text")}{" "}
          </span>
          <Link href={"/contact"} className="text-[rgb(25,118,210)]">
            {t("contactUs.description.link")}
          </Link>
          <span>.</span>
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
