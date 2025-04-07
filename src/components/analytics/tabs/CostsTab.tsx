
import CostTrendLineChart from "../charts/CostTrendLineChart";

interface CostsTabProps {
  costTrendData: Array<{
    month: string;
    fuel: number;
    maintenance: number;
    personnel: number;
  }>;
}

const CostsTab = ({ costTrendData }: CostsTabProps) => {
  return (
    <CostTrendLineChart data={costTrendData} />
  );
};

export default CostsTab;
