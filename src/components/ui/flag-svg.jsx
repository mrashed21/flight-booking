"use client";

import ReactCountryFlag from "react-country-flag";

export default function FlagSvg({
  countryCode,
  className = "",
  style = {},
  title,
}) {
  const width = style.width || "1.65rem";
  const height = style.height || "1.2rem";

  return (
    <span
      className={`inline-flex items-center justify-center overflow-hidden rounded-[4px] shadow-sm flex-shrink-0 border border-black/5 bg-gray-100 ${className}`}
      style={{
        width,
        height,
        minWidth: width,
        minHeight: height,
        ...style,
      }}
    >
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
        title={title || countryCode}
      />
    </span>
  );
}
