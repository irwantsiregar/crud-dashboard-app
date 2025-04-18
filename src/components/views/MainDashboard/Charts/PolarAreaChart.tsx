import React from "react";
import dynamic from "next/dynamic";
import { TSeries } from "@/types/Charts";
import { Skeleton } from "@heroui/react";
const ApexChart = dynamic(() => import("@/components/ui/Charts/ApexChart"), {
  ssr: false,
});

interface IPolarAreaChart {
  isLoading: boolean;
  seriesData: TSeries;
}

const PolarAreaChart = ({ isLoading, seriesData }: IPolarAreaChart) => {
  const [state, setState] = React.useState({
    series: [],
    options: {
      chart: {
        type: "polarArea",
      },
      stroke: {
        colors: ["#FDFDFD"],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 250,
              height: 350,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <Skeleton isLoaded={!isLoading} className="min-h-80 rounded-lg">
      <ApexChart
        options={state.options}
        series={seriesData}
        type="polarArea"
        height={300}
      />
    </Skeleton>
  );
};

export default PolarAreaChart;
