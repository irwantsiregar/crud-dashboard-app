import {
  Chart as _ChartJS,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

_ChartJS.register(
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface IChartJS {
  className?: string;
  seriesData: number | number[];
}

const ReChartJS = (props: IChartJS) => {
  const { className, seriesData } = props;

  const labels = [
    "Agus",
    "Sep",
    "Okt",
    "Nov",
    "Des",
    "Jan",
    "Feb",
    "Mar",
    "April",
  ];

  // Data want to show on chart
  const datasets = [12, 45, 67, 43, 89, 34, 67, 43];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Products & Recipes",
        data: seriesData,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Result Per Month",
        },
        display: true,
        min: 10,
        max: 100,
      },
      x: {
        title: {
          display: true,
          text: "Month Achievement",
        },
        display: true,
      },
    },
  };

  return (
    <Line
      data={data}
      options={options}
      aria-label="ChartJSLayerFeature"
      className={className}
    />
  );
};

export default ReChartJS;
