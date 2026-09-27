"use client";

import { useEffect } from "react";
import { store } from "@/store";
import { Provider } from "react-redux";

const Providers = ({ children }) => {
  useEffect(() => {
    // Globally blur input[type="number"] on mouse wheel to prevent accidental value changes while scrolling
    const handleWheel = () => {
      if (
        document.activeElement &&
        document.activeElement.tagName === "INPUT" &&
        document.activeElement.type === "number"
      ) {
        document.activeElement.blur();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;

