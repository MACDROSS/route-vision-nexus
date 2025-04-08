
import React from "react";
import { format } from "date-fns";
import DateDetailSummary from "./DateDetailSummary";
import ItemsList from "./ItemsList";

interface SelectedDateGood {
  id: string;
  processName: string;
  quantity: number;
}

interface SelectedDateTransport {
  id: string;
  name: string;
  capacity: number;
}

interface DateDetailProps {
  selectedDate: Date;
  selectedDateGoods: SelectedDateGood[];
  selectedDateTransport: SelectedDateTransport[];
  totalGoods: number;
  totalTransport: number;
}

const DateDetail: React.FC<DateDetailProps> = ({
  selectedDate,
  selectedDateGoods,
  selectedDateTransport,
  totalGoods,
  totalTransport
}) => {
  return (
    <>
      <h3 className="font-medium mb-3">
        {format(selectedDate, 'MMMM d, yyyy')}
      </h3>
      
      <DateDetailSummary 
        totalGoods={totalGoods} 
        totalTransport={totalTransport} 
      />
      
      <div className="space-y-3">
        <ItemsList 
          title="Finished Goods" 
          count={selectedDateGoods.length}
          items={selectedDateGoods.map(good => ({
            id: good.id,
            name: good.processName,
            quantity: good.quantity
          }))}
        />
        
        <ItemsList 
          title="Transportation" 
          count={selectedDateTransport.length}
          items={selectedDateTransport.map(transport => ({
            id: transport.id,
            name: transport.name,
            quantity: transport.capacity
          }))}
        />
      </div>
    </>
  );
};

export default DateDetail;
