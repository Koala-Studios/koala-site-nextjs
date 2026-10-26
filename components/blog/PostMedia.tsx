import Image from "next/image";
import type { CSSProperties } from "react";

import type { BlogBarChart, BlogLineChart, BlogMedia, BlogSource, BlogStatsFigure, BlogUnit } from "@/lib/content";

import styles from "./PostMedia.module.css";

/*
 * Charts, headline numbers and pictures for journal posts, drawn from the data in
 * lib/content/blog.ts. Labels are HTML so they stay readable at phone width; only
 * the lines are SVG. Every chart has a "See the numbers" table and names its source.
 */

function format(value: number, unit: BlogUnit = {}) {
  const number = value.toLocaleString("en-CA", {
    maximumFractionDigits: unit.decimals ?? 0,
    minimumFractionDigits: unit.decimals ?? 0,
  });
  return `${unit.prefix ?? ""}${number}${unit.suffix ?? ""}`;
}

function Source({ source }: { source: BlogSource }) {
  return (
    <p className={styles.source}>
      Source:{" "}
      {source.href ? (
        <a href={source.href} rel="noopener noreferrer" target="_blank">
          {source.label}
        </a>
      ) : (
        source.label
      )}
    </p>
  );
}

function Head({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <figcaption className={styles.head}>
      <span className={styles.title}>{title}</span>
      {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
    </figcaption>
  );
}

function Numbers({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <details className={styles.numbers}>
      <summary>See the numbers</summary>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, index) =>
                index === 0 ? (
                  <th key={index} scope="row">
                    {cell}
                  </th>
                ) : (
                  <td key={index}>{cell}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

function BarChart({ chart }: { chart: BlogBarChart }) {
  const max = Math.max(...chart.rows.map((row) => row.value));
  const anyHighlight = chart.rows.some((row) => row.highlight);

  return (
    <figure className={styles.chart}>
      <Head subtitle={chart.subtitle} title={chart.title} />
      <ul className={styles.bars}>
        {chart.rows.map((row) => (
          <li key={row.label} title={`${row.label}: ${format(row.value, chart.unit)}`}>
            <span className={styles.barLabel}>{row.label}</span>
            <span className={styles.barTrack}>
              <span
                className={`${styles.bar} ${anyHighlight && !row.highlight ? styles.barQuiet : ""}`}
                style={{ width: `${(row.value / max) * 100}%` }}
              />
              <span className={styles.barValue}>{format(row.value, chart.unit)}</span>
            </span>
          </li>
        ))}
      </ul>
      <Source source={chart.source} />
      <Numbers columns={["", chart.title]} rows={chart.rows.map((row) => [row.label, format(row.value, chart.unit)])} />
    </figure>
  );
}

/** Round the axis to clean steps: 1, 2 or 5 times a power of ten. */
function niceTicks(min: number, max: number) {
  const span = max - min || Math.abs(max) || 1;
  const raw = span / 4;
  const power = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 5, 10].map((m) => m * power).find((s) => s >= raw) ?? raw;
  const low = Math.floor(min / step) * step;
  const high = Math.ceil(max / step) * step;
  const ticks = [];
  for (let tick = low; tick <= high + step / 2; tick += step) ticks.push(Number(tick.toFixed(10)));
  return ticks;
}

const seriesClass = [styles.series1, styles.series2];

function LineChart({ chart }: { chart: BlogLineChart }) {
  const series = chart.series.slice(0, 2);
  const values = series.flatMap((line) => line.values);
  const ticks = niceTicks(Math.min(0, ...values), Math.max(...values));
  const low = ticks[0];
  const high = ticks[ticks.length - 1];
  const last = chart.x.length - 1;
  const xAt = (index: number) => (last === 0 ? 50 : (index / last) * 100);
  const yAt = (value: number) => 100 - ((value - low) / (high - low)) * 100;

  return (
    <figure className={styles.chart}>
      <Head subtitle={chart.subtitle} title={chart.title} />
      {series.length > 1 ? (
        <ul className={styles.legend}>
          {series.map((line, index) => (
            <li key={line.name}>
              <span className={`${styles.key} ${seriesClass[index]}`} />
              {line.name}
            </li>
          ))}
        </ul>
      ) : null}
      <div className={styles.plotWrap}>
        <div className={styles.plot}>
          {ticks.map((tick) => (
            <span className={styles.grid} key={tick} style={{ top: `${yAt(tick)}%` }}>
              <span className={styles.tick}>{format(tick, chart.unit)}</span>
            </span>
          ))}
          <svg aria-hidden="true" className={styles.lines} preserveAspectRatio="none" viewBox="0 0 100 100">
            {series.map((line, index) => (
              <polyline
                className={seriesClass[index]}
                key={line.name}
                points={line.values.map((value, i) => `${xAt(i)},${yAt(value)}`).join(" ")}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          {series.map((line, index) =>
            line.values.map((value, i) => (
              <span
                className={`${styles.dot} ${seriesClass[index]}`}
                key={`${line.name}-${i}`}
                style={{ left: `${xAt(i)}%`, top: `${yAt(value)}%` } as CSSProperties}
                title={`${line.name}, ${chart.x[i]}: ${format(value, chart.unit)}`}
              />
            )),
          )}
          {series.map((line) => (
            <span
              className={styles.endLabel}
              key={line.name}
              style={{ top: `${yAt(line.values[last])}%` }}
            >
              {format(line.values[last], chart.unit)}
            </span>
          ))}
        </div>
        <div className={styles.xAxis}>
          {chart.x.map((label, i) => (
            <span
              className={i === 0 || i === last || chart.x.length <= 6 ? "" : styles.xMinor}
              key={label}
              style={{ left: `${xAt(i)}%` }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
      <Source source={chart.source} />
      <Numbers
        columns={["", ...series.map((line) => line.name)]}
        rows={chart.x.map((label, i) => [label, ...series.map((line) => format(line.values[i], chart.unit))])}
      />
    </figure>
  );
}

function Stats({ figure }: { figure: BlogStatsFigure }) {
  return (
    <figure className={styles.statsFigure}>
      <dl className={styles.stats}>
        {figure.items.map((item) => (
          <div className={styles.stat} key={item.label}>
            <dt className={styles.statLabel}>{item.label}</dt>
            <dd className={styles.statValue}>{item.value}</dd>
          </div>
        ))}
      </dl>
      <Source source={figure.source} />
    </figure>
  );
}

/** One chart, row of numbers or picture in a journal post. */
export function PostMedia({ media }: { media: BlogMedia }) {
  switch (media.kind) {
    case "bar":
      return <BarChart chart={media} />;
    case "line":
      return <LineChart chart={media} />;
    case "stats":
      return <Stats figure={media} />;
    case "image":
      return (
        <figure className={styles.imageFigure}>
          <Image
            alt={media.alt}
            className={styles.image}
            height={media.height}
            sizes="(min-width: 1100px) 64rem, 100vw"
            src={media.src}
            width={media.width}
          />
          {media.caption || media.credit ? (
            <figcaption className={styles.caption}>
              {media.caption}
              {media.credit ? <span className={styles.credit}> {media.credit}</span> : null}
            </figcaption>
          ) : null}
        </figure>
      );
  }
}
