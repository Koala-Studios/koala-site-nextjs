"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";

export function AttributionTracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  useEffect(() => { captureAttribution(); }, [pathname, search]);
  return null;
}
