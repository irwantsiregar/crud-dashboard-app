import { TSeries } from "@/types/Charts";
import { Skeleton } from "@heroui/react";
import dynamic from "next/dynamic";
import { useState } from "react";
const ApexChart = dynamic(() => import("@/components/ui/Charts/ApexChart"), {
  ssr: false,
});

interface IMixedChart {
  isLoading: boolean;
  seriesData: TSeries;
}

const MixedChart = ({ isLoading, seriesData }: IMixedChart) => {
  const [state, setState] = useState({
    series: [],
    noData: {
      text: "Loading...",
    },
    options: {
      markers: {
        size: 4,
        colors: "#EE4148",
        strokeColors: "#EE4148",
        shape: "circle",
      },
      chart: {
        height: 350,
        type: "bar",
        stacked: false,
      },
      colors: ["#4472C4", "#ED7D31", "#deeafe"],
      plotOptions: {
        bar: {
          borderRadius: 2,
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: -18,
        offsetX: 0,
        formatter: (val: number, { seriesIndex, w }: any) => {
          if (seriesIndex === 2) {
            w.config.dataLabels.offsetY = -10;
          }
          return seriesIndex !== 2 ? val : val > 0 ? `${val}%` : val;
        },
        style: {
          colors: ["#1F1F1F"],
        },
      },
      stroke: {
        width: [1, 1, 4],
      },
      xaxis: {
        tickPlacement: "on",
        categories: [],
      },
      yaxis: [
        {
          seriesName: "Products",
          labels: {
            show: false,
          },
          tooltip: {
            enabled: true,
          },
        },

        {
          seriesName: "Carts",
          labels: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },

        {
          seriesName: "Posts",
          max: 100,
          min: 0,
          labels: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: false,
          position: "topRight",
          offsetY: 30,
          offsetX: 110,
        },
        enabled: true,
        shared: false,
        intersect: false,
        theme: "dark",
        style: {
          fontSize: "9px",
        },
        onDatasetHover: {
          highlightDataSeries: true,
        },
        y: {
          formatter: (val: number, { seriesIndex }: any) =>
            seriesIndex !== 2 ? val : `${val}%`,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 0,
        offsetY: 10,
      },
    },
  });

  return (
    <Skeleton isLoaded={!isLoading} className="min-h-80 rounded-lg">
      <ApexChart
        options={state.options}
        series={seriesData}
        type="line"
        height={350}
        className="overflow-x-auto overflow-y-hidden"
      />
    </Skeleton>
  );
};

export default MixedChart;
