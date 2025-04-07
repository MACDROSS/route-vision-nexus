import { useState } from "react";
import { ProcessEvent, ProductionProcess } from "@/types/production";

export function useProductionCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<ProcessEvent[]>([]);
  const [processes, setProcesses] = useState<ProductionProcess[]>([
    { id: "1", name: "Assembly Line A", color: "#4CAF50", capacity: 100 },
    { id: "2", name: "Paint Process", color: "#2196F3", capacity: 80 },
    { id: "3", name: "Quality Control", color: "#FF9800", capacity: 120 },
    { id: "process-1-step-1", name: "Material Preparation", color: "#9C27B0", capacity: 90, stepNumber: 1 },
    { id: "process-1-step-2", name: "Component Assembly", color: "#9C27B0", capacity: 85, stepNumber: 2, dependsOn: "process-1-step-1" },
    { id: "process-1-step-3", name: "Quality Testing", color: "#9C27B0", capacity: 100, stepNumber: 3, dependsOn: "process-1-step-2" },
  ]);

  const addEvent = (event: ProcessEvent) => {
    setEvents([...events, event]);
  };

  const removeEvent = (eventId: string) => {
    const eventsToRemove = new Set([eventId]);
    let size = 0;
    
    while (eventsToRemove.size > size) {
      size = eventsToRemove.size;
      events.forEach(event => {
        if (event.dependsOn && eventsToRemove.has(event.dependsOn)) {
          eventsToRemove.add(event.id);
        }
      });
    }
    
    setEvents(events.filter(event => !eventsToRemove.has(event.id)));
  };

  const moveEvent = (eventId: string, newDate: Date) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, date: newDate } : event
    ));
  };

  const selectedDateEvents = events.filter(
    event => selectedDate && 
    event.date.getDate() === selectedDate.getDate() && 
    event.date.getMonth() === selectedDate.getMonth() &&
    event.date.getFullYear() === selectedDate.getFullYear()
  );

  const sortedSelectedDateEvents = [...selectedDateEvents].sort((a, b) => {
    if (a.stepNumber && b.stepNumber) {
      return a.stepNumber - b.stepNumber;
    }
    return 0;
  });

  return {
    selectedDate,
    setSelectedDate,
    events,
    processes,
    setProcesses,
    addEvent,
    removeEvent,
    moveEvent,
    selectedDateEvents: sortedSelectedDateEvents,
    allEvents: events,
  };
}
