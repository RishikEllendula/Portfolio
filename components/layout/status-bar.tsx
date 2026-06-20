"use client";

import * as React from "react";
import { profile } from "@/lib/data";

function useLocalTime(timeZone = "Asia/Kolkata") {
  const [time, setTime] = React.useState<string | null>(null);

  React.useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

export function StatusBar() {
  const time = useLocalTime();

  return (
    <div className="hidden border-b border-border bg-background/95 font-mono text-[11px] text-muted sm:block">
      <div className="container-px mx-auto flex h-8 max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-success" />
          </span>
          <span>{profile.status}</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{profile.location}</span>
          <span className="text-border">|</span>
          <span suppressHydrationWarning>{time ? `${time} IST` : "—"}</span>
        </div>
      </div>
    </div>
  );
}
