"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { Slider, Button } from "@mui/material";
import Cropper from "react-easy-crop";
import { Stage, Layer, Rect, Circle, Star } from "react-konva";
import { getCroppedMaskedImage } from "@/utils/cropAndMask";
import { useTranslations } from "next-intl";
import useImage from "use-image";

import {
  FaCloudUploadAlt,
  FaCircle,
  FaHeartbeat,
  FaHeartBroken,
  FaSquareFull,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { BiSolidPolygon } from "react-icons/bi";
import { IoMdDownload } from "react-icons/io";
import { BsFillHeartbreakFill } from "react-icons/bs";
import { FaHeartCrack } from "react-icons/fa6";
import Mask from "./Mask";

const NewCropper = () => {
  const t = useTranslations("Home");
  const defaultImage = "/doggy.jpg";
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const inputRef = useRef(null);

  const [currentShape, setCurrentShape] = useState("FaHeart");

  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 }); // default fallback
  const [imageDimensions, setImageDimensions] = useState({
    width: 800,
    height: 400,
  }); // default fallback
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 }); // default fallback
  const [uploadedImage] = useImage(imageSrc ? imageSrc : defaultImage);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const height = 400;
        setDimensions({ width, height });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (uploadedImage) {
      const imgWidth = uploadedImage.width;
      const imgHeight = uploadedImage.height;
      const STAGE_WIDTH = dimensions.width;
      const STAGE_HEIGHT = dimensions.height;

      const scale = Math.min(STAGE_WIDTH / imgWidth, STAGE_HEIGHT / imgHeight);
      const width = imgWidth * scale;
      const height = imgHeight * scale;

      const x = (STAGE_WIDTH - width) / 2; // center horizontally
      const y = (STAGE_HEIGHT - height) / 2; // center vertically

      setImageDimensions({ width, height });
      setImagePosition({ x, y }); // <-- Add this
    }
  }, [uploadedImage, dimensions]);

  const allShapes = [
    {
      name: "FaHeart",
      icon: <FaHeart />,
    },
    {
      name: "FaHeartbeat",
      icon: <FaHeartbeat />,
    },
    {
      name: "FaHeartCrack",
      icon: <FaHeartCrack />,
    },
    {
      name: "BsFillHeartbreakFill",
      icon: <BsFillHeartbreakFill />,
    },
    {
      name: "FaCircle",
      icon: <FaCircle />,
    },
    {
      name: "FaSquareFull",
      icon: <FaSquareFull />,
    },
    {
      name: "FaStar",
      icon: <FaStar />,
    },
    {
      name: "BiSolidPolygon",
      icon: <BiSolidPolygon />,
    },
  ];

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // 1. Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert(
          "Unsupported file type. Please upload an image (jpg, png, webp, gif)."
        );
        return;
      }

      // 2. Validate file size (e.g., max 5MB)
      // const MAX_SIZE_MB = 5;
      // if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      //   alert("File is too large. Maximum allowed size is 5MB.");
      //   return;
      // }

      // 3. If all is good, read file
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const dataUrl = await getCroppedMaskedImage(
      imageSrc,
      croppedAreaPixels,
      currentShape
    );

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "masked-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-5 flex xl:flex-row flex-col gap-x-5 gap-y-5 w-full mx-auto shadow-2xl rounded-2xl">
      <ul className="grid xl:grid-cols-2 lg:grid-cols-8 grid-cols-4 gap-y-4 gap-x-2 w-full xl:max-w-[250px] xl:border-r-1 xl:border-t-0 border-t-1 pt-5 border-gray-300 pr-5 order-2 xl:order-1">
        {allShapes.map((shape, index) => {
          return (
            <li
              key={index}
              onClick={() => setCurrentShape(shape.name)}
              className={`flex items-center justify-center md:text-7xl text-4xl cursor-pointer ${
                shape.name === currentShape
                  ? "text-[rgb(25,118,210)]"
                  : "text-gray-400 hover:text-[rgb(129,175,255)]"
              }  transition-colors duration-200 ease-linear`}
            >
              {shape.icon}
            </li>
          );
        })}
      </ul>
      <div className="flex flex-col gap-y-5 w-full order-1 xl:order-2">
        <div className="flex sm:items-center sm:justify-end gap-x-10 pb-5 border-b-1 border-gray-300">
          {/* <div className="flex flex-row gap-x-2 items-center text-gray-500">
            <span className="flex items-center justify-center text-xl">
              <MdOutlineTipsAndUpdates />
            </span>
            <span className="">
              {t("tips")}
            </span>
          </div> */}
          <div className="flex sm:flex-row flex-col gap-y-4 items-center justify-between gap-x-10">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileChange}
            />
            <Button
              variant="contained"
              onClick={() => inputRef.current?.click()}
              startIcon={<FaCloudUploadAlt />}
              style={{ alignSelf: "start" }}
            >
              {imageSrc ? t("change") : t("upload")}
            </Button>
            {imageSrc && (
              <Button
                variant="contained"
                onClick={() => handleDownload()}
                startIcon={<IoMdDownload />}
                color="success"
                style={{ alignSelf: "start" }}
              >
                {t("download")}
              </Button>
            )}
          </div>
        </div>

        <div
          className="relative w-full h-[400px] max-w-[800px] mx-auto overflow-hidden rounded-xl hide-crop-shape"
          // style={{ aspectRatio: "2 / 1" }}
          ref={containerRef}
        >
          <Cropper
            image={imageSrc ? imageSrc : defaultImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            showGrid={false}
            onZoomChange={setZoom}
            onCropComplete={(croppedArea, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
            cropShape="rect"
            style={{ containerStyle: { width: "100%", height: "100%" } }}
          />
          <div className="absolute top-0 left-0 pointer-events-none flex items-center justify-center">
            <Stage width={dimensions.width} height={dimensions.height}>
              <Layer>
                <Rect
                  width={dimensions.width}
                  height={dimensions.height}
                  fill="rgba(0,0,0,0.5)"
                />
                <Mask
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                  x={imagePosition.x}
                  y={imagePosition.y}
                  shape={currentShape}
                />
              </Layer>
            </Stage>
          </div>
        </div>

        <div className="w-full max-w-[800px] mx-auto flex flex-row justify-between items-center gap-x-10 mt-2">
          <div className="flex flex-col gap-y-1 w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <span className="font-semibold">{t("zoom")}</span>
              <span>{zoom.toFixed(2)}x</span>
            </div>
            <Slider
              //   valueLabelDisplay="auto"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="zoom"
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCropper;
