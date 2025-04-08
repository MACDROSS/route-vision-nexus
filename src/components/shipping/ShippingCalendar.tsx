
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import useCalendarData from "./calendar/useCalendarData";
import CalendarView from "./calendar/CalendarView";
import DateDetail from "./calendar/DateDetail";

interface ShippingCalendarProps {
  className?: string;
  fullView?: boolean;
}

const ShippingCalendar = ({ className, fullView = false }: ShippingCalendarProps) => {
  const {
    selectedDate,
    setSelectedDate,
    datesWithAvailability,
    selectedDateGoods,
    selectedDateTransport,
    totalGoods,
    totalTransport,
    getAvailabilityForDate
  } = useCalendarData();

  return (
    <Card className={`${className} ${fullView ? "min-h-[calc(100vh-16rem)]" : ""}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <CalendarDays className="mr-2 h-5 w-5" />
          <span>Shipping Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <CalendarView 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            datesWithAvailability={datesWithAvailability}
            getAvailabilityForDate={getAvailabilityForDate}
          />
        </div>

        <div className="lg:w-1/2">
          {selectedDate && (
            <DateDetail
              selectedDate={selectedDate}
              selectedDateGoods={selectedDateGoods}
              selectedDateTransport={selectedDateTransport}
              totalGoods={totalGoods}
              totalTransport={totalTransport}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingCalendar;
