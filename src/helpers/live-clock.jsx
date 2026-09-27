"use client";

import { useEffect, useState } from "react";

const LiveClock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      hours = hours % 12 || 12;

      setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // cleanup (important)
  }, []);

  return <span>{time}</span>;
};

export default LiveClock;
