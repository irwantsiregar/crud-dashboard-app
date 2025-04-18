import { TSeries } from "@/types/Charts";
import { Skeleton } from "@heroui/react";
import dynamic from "next/dynamic";
const ReChartJS = dynamic(() => import("@/components/ui/Charts/ChartJS"), {
  ssr: false,
});

interface ILineREChart {
  isLoading: boolean;
  seriesData: number | number[];
}

const LineChart2 = ({ isLoading, seriesData }: ILineREChart) => {
  return (
    <Skeleton isLoaded={!isLoading} className="min-h-80 rounded-lg">
      <ReChartJS seriesData={seriesData} />
    </Skeleton>
  );
};

export default LineChart2;
