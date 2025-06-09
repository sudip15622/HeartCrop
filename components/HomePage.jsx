"use client";
import React from "react";
import NewCropper from "./NewCropper";

const HomePage = () => {
  return (
    <main>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl font-semibold text-center">
          Crop a heart shape photo online
        </h1>
        <NewCropper />
      </section>
    </main>
  );
};

export default HomePage;
