import { ReactNode } from "react";

type ChartType =
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "candlestick"
  | "boxPlot"
  | "radar"
  | "polarArea"
  | "rangeBar"
  | "rangeArea"
  | "treemap"
  | undefined;

interface IApexChart {
  className?: string;
  noData?: Record<string, string | ReactNode>;
  height?: string | number;
  width?: string | number;
  options?: Record<string, unknown>;
  series: TSeries;
  type?: ChartType;
}

type TSeries = ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;

export type { IApexChart, TSeries, ChartType };
