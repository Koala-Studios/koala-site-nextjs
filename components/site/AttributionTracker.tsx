"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureAttribution } from "@/lib/attribution";
import { captureOpenAIClickRef } from "@/lib/openai-click";

export function AttributionTracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  useEffect(() => { captureAttribution(); captureOpenAIClickRef(); }, [pathname, search]);
  return null;
}
