"use client";
import React from "react";
import { Circle, Star, Rect, RegularPolygon, Shape } from "react-konva";

const Mask = ({ width, height, x = 0, y = 0, shape }) => {
  // const centerX = width / 2;
  // const centerY = height / 2;
  // const width = stageWidth;
  // const height = stageHeight;
  // const centerX = (stageWidth - imageWidth) / 2 + imageWidth / 2;
  // const centerY = (stageHeight - imageHeight) / 2 + imageHeight / 2;
  const centerX = x + width / 2;
  const centerY = y + height / 2;

  switch (shape) {
    case "FaCircle":
      const radius = Math.min(width, height) / 2;
      return (
        <Circle
          x={centerX}
          y={centerY}
          radius={radius}
          fill="black"
          globalCompositeOperation="destination-out"
          stroke="white"
          strokeWidth={2}
        />
      );

    case "FaStar":
      const outerRadius = Math.min(width, height) / 2;
      const innerRadius = outerRadius / 2.25;
      return (
        <Star
          x={centerX}
          y={centerY + 20}
          numPoints={5}
          innerRadius={innerRadius + 10}
          outerRadius={outerRadius + 10}
          fill="black"
          globalCompositeOperation="destination-out"
          stroke="white"
          strokeWidth={2}
        />
      );

    case "FaSquareFull":
      const side = Math.min(width, height); // perfect square side length
      return (
        <Rect
          x={centerX - side / 2} // center horizontally
          y={centerY - side / 2} // center vertically
          width={side}
          height={side}
          fill="black"
          stroke="white"
          strokeWidth={2}
          globalCompositeOperation="destination-out"
        />
      );

    case "BiSolidPolygon":
      const polyRadius = Math.min(width, height) / 2;
      return (
        <RegularPolygon
          x={centerX}
          y={centerY}
          sides={8}
          radius={polyRadius}
          fill="red"
          stroke="black"
          strokeWidth={4}
          globalCompositeOperation="destination-out"
        />
      );

    case "FaHeart":
      return (
        <Shape
          sceneFunc={(ctx, shape) => {
            const scale = Math.min(width, height) / 512; // scale SVG to fit canvas
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.scale(scale, scale);
            ctx.translate(-256, -256); // center the SVG around (0,0) then translate

            const path = new Path2D(
              "M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
            );
            ctx.fill(path);
            ctx.restore();
          }}
          fill="black"
          globalCompositeOperation="destination-out"
          stroke="white"
          strokeWidth={2}
        />
      );

    case "FaHeartbeat":
      return (
        <Shape
          sceneFunc={(ctx, shape) => {
            const scale = Math.min(width, height) / 512; // scale SVG to fit canvas
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.scale(scale, scale);
            ctx.translate(-256, -256); // center the SVG

            const path = new Path2D(
              "M228.3 469.1L47.6 300.4c-4.2-3.9-8.2-8.1-11.9-12.4l87 0c22.6 0 43-13.6 51.7-34.5l10.5-25.2 49.3 109.5c3.8 8.5 12.1 14 21.4 14.1s17.8-5 22-13.3L320 253.7l1.7 3.4c9.5 19 28.9 31 50.1 31l104.5 0c-3.7 4.3-7.7 8.5-11.9 12.4L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9zM503.7 240l-132 0c-3 0-5.8-1.7-7.2-4.4l-23.2-46.3c-4.1-8.1-12.4-13.3-21.5-13.3s-17.4 5.1-21.5 13.3l-41.4 82.8L205.9 158.2c-3.9-8.7-12.7-14.3-22.2-14.1s-18.1 5.9-21.8 14.8l-31.8 76.3c-1.2 3-4.2 4.9-7.4 4.9L16 240c-2.6 0-5 .4-7.3 1.1C3 225.2 0 208.2 0 190.9l0-5.8c0-69.9 50.5-129.5 119.4-141C165 36.5 211.4 51.4 244 84l12 12 12-12c32.6-32.6 79-47.5 124.6-39.9C461.5 55.6 512 115.2 512 185.1l0 5.8c0 16.9-2.8 33.5-8.3 49.1z"
            );

            ctx.fill(path);
            ctx.restore();
          }}
          fill="black"
          globalCompositeOperation="destination-out"
          stroke="white"
          strokeWidth={2}
        />
      );

    case "FaHeartCrack":
      return (
        <Shape
          sceneFunc={(ctx, shape) => {
            const scale = Math.min(width, height) / 512;
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.scale(scale, scale);
            ctx.translate(-256, -256);
            const path = new Path2D(
              "M119.4 44.1c23.3-3.9 46.8-1.9 68.6 5.3l49.8 77.5-75.4 75.4c-1.5 1.5-2.4 3.6-2.3 5.8s1 4.2 2.6 5.7l112 104c2.9 2.7 7.4 2.9 10.5 .3s3.8-7 1.7-10.4l-60.4-98.1 90.7-75.6c2.6-2.1 3.5-5.7 2.4-8.8L296.8 61.8c28.5-16.7 62.4-23.2 95.7-17.6C461.5 55.6 512 115.2 512 185.1l0 5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.6 300.4C17.2 272.1 0 232.4 0 190.9l0-5.8c0-69.9 50.5-129.5 119.4-141z"
            );
            ctx.fill(path);
            ctx.restore();
          }}
          fill="black"
          globalCompositeOperation="destination-out"
          stroke="white"
          strokeWidth={2}
        />
      );

    case "BsFillHeartbreakFill":
      return (
        <Shape
          sceneFunc={(ctx, shape) => {
            const scale = Math.min(width, height) / 16;
            ctx.save();
            ctx.translate(centerX, centerY + 10);
            ctx.scale(scale, scale);
            ctx.translate(-8, -8);
            const path = new Path2D(
              "M8.931.586 7 3l1.5 4-2 3L8 15C22.534 5.396 13.757-2.21 8.931.586ZM7.358.77 5.5 3 7 7l-1.5 3 1.815 4.537C-6.533 4.96 2.685-2.467 7.358.77Z"
            );
            ctx.fill(path);
            ctx.restore();
          }}
          fill="black"
          globalCompositeOperation="destination-out"
          stroke="white"
          strokeWidth={1}
        />
      );

    // Add more shapes here

    default:
      return null;
  }
};

export default Mask;
