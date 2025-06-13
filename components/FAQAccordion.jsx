"use client";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

import { FaAngleDown } from "react-icons/fa6";

export default function FAQAccordion() {
  const t = useTranslations("Home");
  const f = t.raw("faqs.qna");
  const [openIndex, setOpenIndex] = useState(null);
  const refs = useRef([]);

  const faqs = [
    {
      question: f[0].question,
      answer: f[0].answer,
    },
    {
      question: f[1].question,
      answer: f[1].answer,
    },
    {
      question: f[2].question,
      answer: f[2].answer,
    },
    {
      question: f[3].question,
      answer: f[3].answer,
    },
    {
      question: f[4].question,
      answer: f[4].answer,
    },
  ];

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
    <div className="flex flex-col gap-y-2 mt-10 w-full">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="border-b border-gray-300 w-full">
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
