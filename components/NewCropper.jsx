"use client";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { Slider, Button } from "@mui/material";
import Cropper from "react-easy-crop";
import { Stage, Layer, Rect, Circle, Star } from "react-konva";
import { getCroppedMaskedImage } from "@/utils/cropAndMask";

import {
  FaCloudUploadAlt,
  FaCircle,
  FaHeartbeat,
  FaHeartBroken,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { BiSolidPolygon } from "react-icons/bi";
import { IoMdDownload, IoMdStar, IoMdHeart } from "react-icons/io";
import { MdRectangle, MdOutlineTipsAndUpdates } from "react-icons/md";
import { BsFillHeartbreakFill } from "react-icons/bs";
import { FaHeartCrack } from "react-icons/fa6";
import Mask from "./Mask";

const NewCropper = () => {
  const defaultImage = "/doggy.jpg";
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const inputRef = useRef(null);

  const [currentShape, setCurrentShape] = useState("FaHeart");

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
      name: "MdRectangle",
      icon: <MdRectangle />,
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
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
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
    <div className="p-5 flex flex-row gap-x-5 w-full mx-auto shadow-2xl rounded-2xl">
      <ul className="grid grid-cols-2 gap-y-4 gap-x-2 w-full max-w-[250px] border-r-1 border-gray-300 pr-5">
        {allShapes.map((shape, index) => {
          return (
            <li
              key={index}
              onClick={() => setCurrentShape(shape.name)}
              className={`flex items-center justify-center text-7xl cursor-pointer ${
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
      <div className="flex flex-col gap-y-5 w-full">
        <div className="flex items-center justify-between gap-x-10 pb-5 border-b-1 border-gray-300">
          <div className="flex flex-row gap-x-2 items-center text-gray-500">
            <span className="flex items-center justify-center text-xl"><MdOutlineTipsAndUpdates /></span>
            <span className="">Zoom and drag to get the desired content inside shape.</span>
          </div>
          <div className="flex items-center justify-between gap-x-10">
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
            >
              {imageSrc ? "Change Photo" : "Upload Photo"}
            </Button>
            {imageSrc && (
              <Button
                variant="contained"
                onClick={() => handleDownload()}
                startIcon={<IoMdDownload />}
                color="success"
              >
                Download Photo
              </Button>
            )}
          </div>
        </div>

        <div className="relative w-full max-w-[800px] h-[400px] mx-auto overflow-hidden rounded-xl">
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
          />
          <div className="absolute top-0 left-0 pointer-events-none">
            <Stage width={800} height={400}>
              <Layer>
                <Rect width={800} height={400} fill="rgb(0,0,0,0.4" />
                <Mask width={800} height={400} shape={currentShape} />
              </Layer>
            </Stage>
          </div>
        </div>

        <div className="w-full max-w-[800px] mx-auto flex flex-row justify-between items-center gap-x-10 mt-2">
          <div className="flex flex-col gap-y-1 w-full">
            <div className="flex flex-row items-center justify-between w-full">
              <span className="font-semibold">Zoom</span>
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
