
import StatCards from "../StatCards";
import DeliveryBarChart from "../charts/DeliveryBarChart";
import EfficiencyLineChart from "../charts/EfficiencyLineChart";

interface OverviewTabProps {
  deliveryData: Array<{
    name: string;
    onTime: number;
    delayed: number;
  }>;
  efficiencyData: Array<{
    name: string;
    value: number;
  }>;
}

const OverviewTab = ({ deliveryData, efficiencyData }: OverviewTabProps) => {
  return (
    <>
      <StatCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeliveryBarChart data={deliveryData} />
        <EfficiencyLineChart data={efficiencyData} />
      </div>
    </>
  );
};

export default OverviewTab;
