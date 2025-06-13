"use client";
import React from "react";
import NewCropper from "./NewCropper";
import { useTranslations } from "next-intl";
import FAQAccordion from "./FAQAccordion";

import {
  IoCloudUploadOutline,
  IoCropOutline,
  IoCloudDownloadOutline,
} from "react-icons/io5";
import { PiShapesLight } from "react-icons/pi";
import { MdOutlineSecurity } from "react-icons/md";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { BiSolidShapes } from "react-icons/bi";
import { FaImage, FaAngleDown } from "react-icons/fa6";
import { GrSecure } from "react-icons/gr";

const HomePage = () => {
  const t = useTranslations("Home");
  const s = t.raw("howToCrop.steps");
  const r = t.raw("whyChooseUs.reasons");

  const steps = [
    {
      title: s[0].title,
      description: s[0].description,
      icon: <IoCloudUploadOutline />,
    },
    {
      title: s[1].title,
      description: s[1].description,
      icon: <PiShapesLight />,
    },
    {
      title: s[2].title,
      description: s[2].description,
      icon: <IoCropOutline />,
    },
    {
      title: s[3].title,
      description: s[3].description,
      icon: <IoCloudDownloadOutline />,
    },
  ];
  const reasons = [
    {
      title: r[0].title,
      description: r[0].description,
      icon: <MdOutlineSecurity />,
    },
    {
      title: r[1].title,
      description: r[1].description,
      icon: <BsFillLightningChargeFill />,
    },
    {
      title: r[2].title,
      description: r[2].description,
      icon: <BiSolidShapes />,
    },
    {
      title: r[3].title,
      description: r[3].description,
      icon: <FaImage />,
    },
    {
      title: r[4].title,
      description: r[4].description,
      icon: <GrSecure />,
    },
  ];

  return (
    <main>
      <section className="flex flex-col">
        <h1 className="text-4xl font-semibold text-center mb-10">
          {t("title")}
        </h1>
        <NewCropper />
        <p className="text-center mt-2 text-gray-500 mx-auto">{t("info")}</p>
      </section>
      <section className="flex flex-col items-center">
        <h1 className="mb-5 text-center text-4xl font-semibold">
          {t("howToCrop.title")}
        </h1>
        <p className="text-xl text-gray-500">{t("howToCrop.description")}</p>
        <div className="grid grid-cols-2 gap-14 items-stretch justify-center mt-10">
          {steps.map((step, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-y-4 items-center justify-center text-center shadow-xl rounded-2xl border-1 border-gray-200 px-14 py-10"
              >
                <div className="text-3xl bg-[rgb(129,175,255)] w-16 h-16 flex items-center justify-center rounded-full">
                  {step.icon}
                </div>
                <h2 className="text-xl font-semibold">{step.title}</h2>
                <p className="text-xl text-gray-500">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col items-center">
        <h1 className="mb-5 text-center text-4xl font-semibold">
          {t("whyChooseUs.title")}
        </h1>
        <p className="text-xl text-gray-500">
          {t("whyChooseUs.description")}
        </p>
        <div className="flex flex-col gap-y-10 mt-10 w-full">
          {reasons.map((reason, index) => {
            return (
              <div
                key={index}
                className="shadow-xl rounded-xl border-1 border-gray-200 overflow-hidden w-full"
              >
                <div className="flex flex-row gap-x-4 items-center border-l-5 border-gray-200 p-10 ">
                  <div className="text-3xl bg-gray-100 w-16 h-16 flex items-center justify-center rounded-2xl">
                    {reason.icon}
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <h2 className="text-xl font-semibold">{reason.title}</h2>
                    <p className="text-xl text-gray-500">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col items-center">
        <h1 className="mb-5 text-center text-4xl font-semibold">
          {t("faqs.title")}
        </h1>
        <p className="text-xl text-gray-500">
          {t("faqs.description")}
        </p>
        <FAQAccordion />
      </section>
    </main>
  );
};

export default HomePage;
