import { CountUp } from "./CountUp";

/** Preserve units and nonnumeric labels; only animate a single quantitative value. */
export function MetricValue({ value }: { value: string }) {
  const match = value.match(/^([^\d]*)(\d[\d,]*(?:\.\d+)?)([^\d]*)$/);
  if (!match) return <>{value}</>;
  return <CountUp value={Number(match[2].replaceAll(",", ""))} prefix={match[1]} suffix={match[3]} decimals={match[2].split(".")[1]?.length ?? 0} grouped={match[2].includes(",")} />;
}
