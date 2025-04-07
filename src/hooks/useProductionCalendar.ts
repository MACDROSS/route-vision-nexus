
import { useState } from "react";
import { ProcessEvent, ProductionProcess } from "@/types/production";

export function useProductionCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<ProcessEvent[]>([]);
  const [processes, setProcesses] = useState<ProductionProcess[]>([
    { id: "1", name: "Assembly Line A", color: "#4CAF50", capacity: 100 },
    { id: "2", name: "Paint Process", color: "#2196F3", capacity: 80 },
    { id: "3", name: "Quality Control", color: "#FF9800", capacity: 120 },
  ]);

  const addEvent = (event: ProcessEvent) => {
    setEvents([...events, event]);
  };

  const removeEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const moveEvent = (eventId: string, newDate: Date) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, date: newDate } : event
    ));
  };

  // Get events for the selected date
  const selectedDateEvents = events.filter(
    event => selectedDate && 
    event.date.getDate() === selectedDate.getDate() && 
    event.date.getMonth() === selectedDate.getMonth() &&
    event.date.getFullYear() === selectedDate.getFullYear()
  );

  // Dates with events for highlighting in calendar
  const datesWithEvents = events.map(event => event.date);

  return {
    selectedDate,
    setSelectedDate,
    events,
    processes,
    setProcesses,
    addEvent,
    removeEvent,
    moveEvent,
    selectedDateEvents,
    datesWithEvents
  };
}
