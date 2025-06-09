"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { Stage, Layer, Image, Rect, Circle } from "react-konva";
import useImage from "use-image";
import { Slider, Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

const ImageCropper = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const inputRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 400 });
  // const [cursor, setCursor] = useState("default");
  const [circleRadius, setCircleRadius] = useState(100);
  const circleRef = useRef(null);
  const handleRef = useRef(null);
  const MIN_RADIUS = 20;

  const clampRadius = (newRadius, cx, cy) => {
    const { x: imgX, y: imgY, width, height } = imageProps;

    const maxLeft = cx - imgX;
    const maxRight = imgX + width - cx;
    const maxTop = cy - imgY;
    const maxBottom = imgY + height - cy;

    const maxRadius = Math.min(maxLeft, maxRight, maxTop, maxBottom);

    return Math.max(MIN_RADIUS, Math.min(newRadius, maxRadius));
  };

  useEffect(() => {
    const updateHandle = () => {
      const circle = circleRef.current;
      const handle = handleRef.current;
      if (circle && handle) {
        handle.position({
          x: circle.x() + circleRadius,
          y: circle.y(),
        });
        handle.getLayer().batchDraw();
      }
    };

    const listener = () => requestAnimationFrame(updateHandle);
    const circleNode = circleRef.current;

    circleNode?.on("dragmove", listener);
    return () => {
      circleNode?.off("dragmove", listener);
    };
  }, [circleRadius]);

  const handleMouseOver = (e) => {
    e.target.getStage().container().style.cursor = "move";
  };

  const handleMouseOut = (e) => {
    e.target.getStage().container().style.cursor = "default";
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const defaultSrc = "/doggy.jpg";

  const [image] = useImage(imageSrc ? imageSrc : defaultSrc, "anonymous");

  // Calculate image position and scale to contain within the stage
  const imageProps = useMemo(() => {
    if (!image)
      return { x: 0, y: 0, width: stageSize.width, height: stageSize.height };

    const imageAspect = image.width / image.height;
    const stageAspect = stageSize.width / stageSize.height;

    let width, height, x, y;

    if (imageAspect > stageAspect) {
      // Image is wider than stage - fit to width
      width = stageSize.width;
      height = width / imageAspect;
      x = 0;
      y = (stageSize.height - height) / 2;
    } else {
      // Image is taller than stage - fit to height
      height = stageSize.height;
      width = height * imageAspect;
      x = (stageSize.width - width) / 2;
      y = 0;
    }

    return { x, y, width, height };
  }, [image, stageSize]);

  const handleDownload = () => {
    if (!image) return;

    const radius = circleRadius;
    const circleX = circleRef.current.x();
    const circleY = circleRef.current.y();

    // Define export resolution (higher = better quality)
    const exportSize = 500;

    const canvas = document.createElement("canvas");
    canvas.width = exportSize;
    canvas.height = exportSize;
    const ctx = canvas.getContext("2d");

    // Clip a circle
    ctx.beginPath();
    ctx.arc(exportSize / 2, exportSize / 2, exportSize / 2, 0, Math.PI * 2);
    ctx.clip();

    // Scale between canvas and image
    const { x: imgX, y: imgY, width, height } = imageProps;
    const scaleX = image.width / width;
    const scaleY = image.height / height;

    const srcX = (circleX - radius - imgX) * scaleX;
    const srcY = (circleY - radius - imgY) * scaleY;
    const srcW = radius * 2 * scaleX;
    const srcH = radius * 2 * scaleY;

    ctx.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, exportSize, exportSize);

    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "cropped-image.png";
    link.href = dataURL;
    link.click();
  };

  const [imageScale, setImageScale] = useState(1);

  // Mouse wheel zoom
  const handleWheel = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const oldScale = imageScale;
    const pointer = e.target.getStage().getPointerPosition();

    const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;

    setImageScale(Math.max(0.1, Math.min(5, newScale)));
  };

  return (
    <div className="w-fit mx-auto mt-10 flex flex-col gap-y-5">
      <div className="flex items-center justify-end gap-x-10 pb-5 border-b-1 border-gray-300">
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
          >
            Download Photo
          </Button>
        )}
      </div>
      <div className="w-fit rounded-xl overflow-hidden">
        <Stage width={stageSize.width} height={stageSize.height} onWheel={handleWheel}>
          <Layer>
            {/* Background Image */}
            {image && (
              <Image
                image={image}
                {...imageProps}
                scaleX={imageScale}
                scaleY={imageScale}
                draggable
              />
            )}
          </Layer>

          {/* Overlay with erasing circle */}
          <Layer>
            {/* Dark Overlay */}
            <Rect
              width={stageSize.width}
              height={stageSize.height}
              fill="rgba(0,0,0,0.6)"
            />

            {/* Erasing Circle */}
            <Circle
              ref={circleRef}
              x={stageSize.width / 2}
              y={stageSize.height / 2}
              radius={circleRadius}
              fill="black"
              globalCompositeOperation="destination-out"
              // draggable
              stroke="white"
              strokeWidth={2}
              onDragMove={(e) => {
                const { x, y } = e.target.position();
                const r = circleRadius;
                const { x: imgX, y: imgY, width, height } = imageProps;

                const clampedX = Math.max(
                  imgX + r,
                  Math.min(x, imgX + width - r)
                );
                const clampedY = Math.max(
                  imgY + r,
                  Math.min(y, imgY + height - r)
                );

                e.target.position({ x: clampedX, y: clampedY });
              }}
            />

            <Circle
              ref={handleRef}
              radius={8}
              fill="white"
              stroke="black"
              strokeWidth={1}
              draggable
              x={circleRef.current?.x() + circleRadius || 0}
              y={circleRef.current?.y() || 0}
              dragBoundFunc={(pos) => {
                const cx = circleRef.current?.x() || 0;
                const cy = circleRef.current?.y() || 0;
                const dx = pos.x - cx;
                const dy = pos.y - cy;
                const newRadius = Math.max(20, Math.sqrt(dx * dx + dy * dy));
                setCircleRadius(newRadius);
                return {
                  x: cx + newRadius,
                  y: cy,
                };
              }}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default ImageCropper;
