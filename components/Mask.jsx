"use client";
import React from "react";
import { Circle, Star, Rect, RegularPolygon, Shape } from "react-konva";

const Mask = ({ width, height, shape }) => {
  const centerX = width / 2;
  const centerY = height / 2;

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

    case "MdRectangle":
      return (
        <Rect
          x={centerX / 2}
          y={0}
          width={height}
          height={height}
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

    // Add more shapes here

    default:
      return null;
  }
};

export default Mask;
