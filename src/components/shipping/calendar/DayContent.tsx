
import { DayContentProps } from "react-day-picker";

interface DayContentWithAvailabilityProps extends DayContentProps {
  goodsCount: number;
  transportCount: number;
}

const DayContent = ({ date, goodsCount, transportCount }: DayContentWithAvailabilityProps) => {
  const hasContent = goodsCount > 0 || transportCount > 0;
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {date.getDate()}
      {hasContent && (
        <div className="absolute -bottom-1 left-0 right-0 flex justify-center gap-1">
          {goodsCount > 0 && (
            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
          )}
          {transportCount > 0 && (
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default DayContent;
