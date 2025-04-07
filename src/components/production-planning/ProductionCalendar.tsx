
import { useProductionCalendar } from "@/hooks/useProductionCalendar";
import ProcessesPanel from "./ProcessesPanel";
import CalendarPanel from "./CalendarPanel";

const ProductionCalendar = () => {
  const {
    selectedDate,
    setSelectedDate,
    processes,
    setProcesses,
    addEvent,
    removeEvent,
    selectedDateEvents,
    allEvents,
  } = useProductionCalendar();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
      {/* Processes panel */}
      <ProcessesPanel processes={processes} setProcesses={setProcesses} />

      {/* Calendar */}
      <CalendarPanel 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedDateEvents={selectedDateEvents}
        allEvents={allEvents}
        removeEvent={removeEvent}
        addEvent={addEvent}
      />
    </div>
  );
};

export default ProductionCalendar;
