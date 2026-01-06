"use client";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

const RemainingTime = () => {
  const MAX_SECONDS = 29 * 60 * 60 + 59 * 60 + 59;
  const [secondsLeft, setSecondsLeft] = useState(MAX_SECONDS);

  const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0",
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (
        now.getHours() === 0 &&
        now.getMinutes() === 0 &&
        now.getSeconds() === 0
      ) {
        setSecondsLeft(MAX_SECONDS);
        return;
      }

      setSecondsLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [hh, mm, ss] = formatTime(secondsLeft).split(":");

  return (
    <div className="border-surface flex w-full items-center justify-center gap-2 rounded-xl border p-4 shadow-sm lg:mb-5">
      <p className="flex items-center gap-2">
        <Clock size={16} className="text-primary" />
        <span className="text-muted text-sm font-medium">Time Remaining</span>
      </p>
      <span className="text-primary text-sm font-medium">
        {" "}
        {hh}:{mm}:{ss}
      </span>
    </div>
  );
};

export default RemainingTime;
