"use client";
import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";

const faqs = [
  {
    question: "What image formats are supported?",
    answer:
      "Our HeartCrop supports all major image formats for upload, including JPG, PNG, WebP, and more. You can download your cropped image in four formats: PNG (with transparency), JPEG (best for photos), WebP (modern format with good compression), and SVG (vector format, perfect for logos and icons).",
  },
  {
    question: "Which shapes are availabe here in HeartCrop?",
    answer:
      "Our HeartCrop provides you various shapes, where there are 4 types of heart shapes, like regular heart, broken heart, etc. And we also provide shapes like square, circle, star and polygon which you can select on the left of the tool section.",
  },
  {
    question: "Is there a size limit for uploaded images?",
    answer:
      "While there's no strict size limit, we recommend uploading images under 10MB for optimal performance. The tool maintains high quality while optimizing the output file size.",
  },
  {
    question: "Can I use this for social media profile pictures?",
    answer:
      "Absolutely! Our circular crop feature is perfect for profile pictures on social media platforms like Instagram, Twitter, LinkedIn, and Facebook. The shapes we provide are also great for thumbnails and posts.",
  },
  {
    question: "How do i get a transparent background?",
    answer:
      "When you crop an image using our tool, the output is automatically saved as a PNG with a transparent background outside the cropped area. This is perfect for logos and profile pictures.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const refs = useRef([]);

  useEffect(() => {
    faqs.forEach((_, i) => {
      const el = refs.current[i];
      if (el) {
        const scrollHeight = el.scrollHeight;
        el.style.setProperty("--accordion-height", `${scrollHeight}px`);
      }
    });
  }, [openIndex]);

  return (
    <div className="flex flex-col gap-y-2 mt-10 w-full max-w-4xl">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="border-b border-gray-300">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-4 text-left text-xl text-slate-900 cursor-pointer transition-all [&>svg]:transition-transform [&>svg]:duration-200"
            >
              {faq.question}
              <FaAngleDown className={isOpen ? "rotate-180" : ""} />
            </button>

            <div
              ref={(el) => (refs.current[index] = el)}
              className="overflow-hidden transition-[max-height] duration-200 ease-in-out text-base text-gray-600"
              style={{
                maxHeight: isOpen ? "var(--accordion-height)" : "0px",
              }}
            >
              <div className="pb-4">{faq.answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
