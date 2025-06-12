"use client";
import React from "react";
import NewCropper from "./NewCropper";
import { useTranslations } from "next-intl";

const HomePage = () => {
  const t = useTranslations("Home");
  return (
    <main>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl font-semibold text-center">
          {t("title")}
        </h1>
        <NewCropper />
      </section>

      
    </main>
  );
};

export default HomePage;
