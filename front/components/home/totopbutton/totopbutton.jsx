"use client";

import { IoArrowUp } from "react-icons/io5";

import { useState, useEffect } from "react";

export default function ToTopButton() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      className={`transition-all duration-500 bg-blue-600 fixed right-10 bottom-11 p-4 rounded-md shadow-sm shadow-black/20 text-white hover:bottom-12 hover:bg-black/30 max-sm:p-2 max-sm:right-5
            ${showScroll ? "opacity-100 z-30" : "opacity-0 z-[-1]"}
        `}
    >
      <IoArrowUp />
    </button>
  );
}
