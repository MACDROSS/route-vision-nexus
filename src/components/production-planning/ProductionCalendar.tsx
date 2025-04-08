
import { useProductionCalendar } from "@/hooks/useProductionCalendar";
import ProcessesPanel from "./ProcessesPanel";
import CalendarPanel from "./CalendarPanel";
import ProcessHierarchyView from "./ProcessHierarchyView";
import ProductionTimeline from "./ProductionTimeline";

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

      {/* Process Hierarchy View */}
      <ProcessHierarchyView 
        processes={processes} 
        className="lg:col-span-3 lg:row-span-1"
      />

      {/* Timeline View */}
      <ProductionTimeline 
        processes={processes}
        events={allEvents}
        className="lg:col-span-3"
      />

      {/* Calendar */}
      <CalendarPanel 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedDateEvents={selectedDateEvents}
        allEvents={allEvents}
        removeEvent={removeEvent}
        addEvent={addEvent}
        className="lg:col-span-3 lg:row-span-2"
      />
    </div>
  );
};

export default ProductionCalendar;
