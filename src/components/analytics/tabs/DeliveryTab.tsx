
import DeliveryBarChart from "../charts/DeliveryBarChart";

interface DeliveryTabProps {
  deliveryData: Array<{
    name: string;
    onTime: number;
    delayed: number;
  }>;
}

const DeliveryTab = ({ deliveryData }: DeliveryTabProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <DeliveryBarChart 
        data={deliveryData} 
        title="Delivery Performance by Month" 
        height="h-96"
      />
    </div>
  );
};

export default DeliveryTab;
