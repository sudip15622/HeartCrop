import { createCanvas, loadImage } from "canvas";

export const getCroppedMaskedImage = async (
  imageSrc,
  crop,
  shape = "FaCircle",
  outputSize = 400
) => {
  const image = await loadImage(imageSrc);

  const canvas = createCanvas(outputSize, outputSize);
  const ctx = canvas.getContext("2d");

  // Draw cropped image
  ctx.save();
  ctx.translate(outputSize / 2, outputSize / 2);
  ctx.translate(-outputSize / 2, -outputSize / 2);
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    outputSize,
    outputSize
  );
  ctx.restore();

  // Apply mask
  ctx.globalCompositeOperation = "destination-in";
  ctx.beginPath();

  switch (shape) {
    case "FaCircle":
      ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
      break;

    case "MdRectangle":
      ctx.rect(0, 0, outputSize, outputSize);
      break;

    case "FaStar":
      const drawStar = (cx, cyPre, spikes, outerRadiusPre, innerRadiusPre) => {
        let outerRadius = outerRadiusPre + 10;
        let innerRadius = innerRadiusPre + 10;
        let cy = cyPre + 20;
        let rot = (Math.PI / 2) * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;

        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = cx + Math.cos(rot) * outerRadius;
          y = cy + Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;

          x = cx + Math.cos(rot) * innerRadius;
          y = cy + Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
      };
      drawStar(
        outputSize / 2,
        outputSize / 2,
        5,
        outputSize / 2,
        outputSize / 4
      );
      break;

    case "BiSolidPolygon":
      const sides = 8;
      const angle = (Math.PI * 2) / sides;
      const r = outputSize / 2;
      for (let i = 0; i < sides; i++) {
        const x = outputSize / 2 + r * Math.cos(i * angle);
        const y = outputSize / 2 + r * Math.sin(i * angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      break;

    case "FaHeart":
      // Create a Path2D from the full SVG path
      const heartPath = new Path2D(
        "M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
      );

      const scale = outputSize / 512;
      ctx.save();
      ctx.translate(outputSize / 2, outputSize / 2);
      ctx.scale(scale, scale);
      ctx.translate(-256, -256); // since the original heart is centered at (256,256)
      ctx.fill(heartPath);
      ctx.restore();
      return canvas.toDataURL("image/png");

    default:
      ctx.rect(0, 0, outputSize, outputSize);
      break;
  }

  ctx.fill();
  return canvas.toDataURL("image/png");
};
