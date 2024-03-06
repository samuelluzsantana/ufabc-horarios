import React from "react";
import { FaStarOfLife as IStarlogo } from "react-icons/fa";

export default function Logo({ isHover = false, size = 30 }) {
  return (
    <IStarlogo
      size={size}
      className={`star-logo transition-colors duration-300 ${
        isHover ? "text-[#00007c]" : ""
      }`}
    />
  );
}
