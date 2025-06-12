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

  const steps = [
    {
      title: "Upload Your Image",
      description:
        "Click the upload button and select the image you want to crop from your device.",
      icon: <IoCloudUploadOutline />,
    },
    {
      title: "Select desired shape",
      description:
        "You can choose the desired shape to crop like heart, circle, square, star, and so on.",
      icon: <PiShapesLight />,
    },
    {
      title: "Adjust the Crop",
      description:
        "Use the shaped crop tool to select the area you want to keep. Drag to reposition, and use the slider to resize.",
      icon: <IoCropOutline />,
    },
    {
      title: "Download Image",
      description:
        "Click the download button to save your perfectly cropped shaped image.",
      icon: <IoCloudDownloadOutline />,
    },
  ];
  const reasons = [
    {
      title: "100% Free & Private",
      description:
        "No registration required. Your images stay private and are processed entirely in your browser.",
      icon: <MdOutlineSecurity />,
    },
    {
      title: "Lightning Fast",
      description:
        "Instant processing with real-time preview. No waiting for uploads or server processing.",
      icon: <BsFillLightningChargeFill />,
    },
    {
      title: "Various Shape Cropping",
      description:
        "Versatile image cropping with perfect heart like shapes for profile pictures and thumbnails.",
      icon: <BiSolidShapes />,
    },
    {
      title: "High-Quality Output",
      description:
        "Export your cropped images in high resolution, perfect for social media and professional use.",
      icon: <FaImage />,
    },
    {
      title: "Secure & Reliable",
      description:
        "Your images never leave your device. Built with privacy and security in mind.",
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
        <p className="text-center mt-2 text-gray-500 mx-auto">
          Your images are processed entirely in your browser. Nothing is
          uploaded to any server.
        </p>
      </section>
      <section className="flex flex-col items-center">
        <h1 className="mb-5 text-center text-4xl font-semibold">
          How to Crop an Image into various shapes?
        </h1>
        <p className="text-xl text-gray-500">
          Create your perfect circular or starred or heart shaped image in just
          a few simple steps.
        </p>
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
          Why Choose Our Tool?
        </h1>
        <p className="text-xl text-gray-500">
          The smart choice for quick, easy, and secure photo cropping
        </p>
        <div className="flex flex-col gap-y-10 mt-10">
          {reasons.map((reason, index) => {
            return (
              <div
                key={index}
                className="shadow-xl rounded-xl border-1 border-gray-200 overflow-hidden"
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
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-500">
          Create your perfect circular or starred or heart shaped image in just
          few simple steps.
        </p>
        <FAQAccordion />
      </section>
    </main>
  );
};

export default HomePage;
