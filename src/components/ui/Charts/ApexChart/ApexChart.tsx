import { IApexChart } from "@/types/Charts";
import _ApexCharts from "react-apexcharts";

const ApexChart = (props: IApexChart) => {
  const { className, options, series, type, height, width } = props;

  return (
    <_ApexCharts
      aria-label="ApexChartLayerFeature"
      className={className}
      options={options}
      series={series}
      type={type}
      height={height}
      width={width}
    />
  );
};

export default ApexChart;
