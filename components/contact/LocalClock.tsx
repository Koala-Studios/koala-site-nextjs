"use client";

import { useEffect, useState } from "react";

type LocalClockProps = {
  timeZone?: string;
  className?: string;
};

function formatTime(timeZone: string) {
  return new Date().toLocaleTimeString("en-CA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  });
}

/** Live studio clock; renders nothing until mounted to avoid hydration drift. */
export function LocalClock({
  timeZone = "America/Toronto",
  className,
}: LocalClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatTime(timeZone));
    const frame = window.requestAnimationFrame(update);
    const interval = window.setInterval(update, 30_000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, [timeZone]);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--"}
    </span>
  );
}
