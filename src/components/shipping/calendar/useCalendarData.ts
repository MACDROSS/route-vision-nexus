
import { useState } from "react";
import { useProductionCalendar } from "@/hooks/useProductionCalendar";
import { useShippingStore } from "@/hooks/useShippingStore";
import { TransportOption } from "@/types/shipping";

interface CalendarData {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  datesWithAvailability: string[];
  selectedDateGoods: any[];
  selectedDateTransport: TransportOption[];
  totalGoods: number;
  totalTransport: number;
  getAvailabilityForDate: (date: Date) => { goodsCount: number; transportCount: number };
}

export const useCalendarData = (): CalendarData => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { allEvents } = useProductionCalendar();
  const { transportOptions } = useShippingStore();

  // Filter for last step in each process to get finished goods
  const getFinishedGoodsEvents = () => {
    // Group events by processId to find the ones that represent the final step
    const processGroups: Record<string, any[]> = {};
    
    allEvents.forEach(event => {
      const baseProcessId = event.processId.split('-')[0];
      if (!processGroups[baseProcessId]) {
        processGroups[baseProcessId] = [];
      }
      processGroups[baseProcessId].push(event);
    });

    // Find events that are the last step in each process
    const finishedGoodsEvents = [];
    for (const events of Object.values(processGroups)) {
      // Sort by step number descending
      const sortedEvents = [...events].sort((a, b) => 
        (b.stepNumber || 0) - (a.stepNumber || 0)
      );
      
      // The first event after sorting is the last step
      if (sortedEvents.length > 0) {
        finishedGoodsEvents.push(sortedEvents[0]);
      }
    }

    return finishedGoodsEvents;
  };

  const finishedGoodsEvents = getFinishedGoodsEvents();

  // Get all dates that have either finished goods or transportation
  const getDatesWithAvailability = () => {
    const dates = new Set<string>();
    
    // Add dates with finished goods
    finishedGoodsEvents.forEach(event => {
      const date = new Date(event.date);
      dates.add(new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString());
    });
    
    // Add dates with transportation
    transportOptions.forEach(option => {
      const date = new Date(option.availableDate);
      dates.add(new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString());
    });
    
    return Array.from(dates);
  };

  const datesWithAvailability = getDatesWithAvailability();

  // Count goods and transportation for a specific date
  const getAvailabilityForDate = (date: Date) => {
    // Count finished goods
    const goodsCount = finishedGoodsEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() && 
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    }).reduce((sum, event) => sum + event.quantity, 0);
    
    // Count transportation capacity
    const transportCount = transportOptions.filter(option => {
      const optionDate = new Date(option.availableDate);
      return optionDate.getDate() === date.getDate() && 
             optionDate.getMonth() === date.getMonth() &&
             optionDate.getFullYear() === date.getFullYear();
    }).reduce((sum, option) => sum + option.capacity, 0);
    
    return { goodsCount, transportCount };
  };

  // Filter events and transportation for the selected date
  const selectedDateGoods = finishedGoodsEvents.filter(event => {
    if (!selectedDate) return false;
    const eventDate = new Date(event.date);
    return eventDate.getDate() === selectedDate.getDate() && 
           eventDate.getMonth() === selectedDate.getMonth() &&
           eventDate.getFullYear() === selectedDate.getFullYear();
  });
  
  const selectedDateTransport = transportOptions.filter(option => {
    if (!selectedDate) return false;
    const optionDate = new Date(option.availableDate);
    return optionDate.getDate() === selectedDate.getDate() && 
           optionDate.getMonth() === selectedDate.getMonth() &&
           optionDate.getFullYear() === selectedDate.getFullYear();
  });

  // Total quantities for the selected date
  const totalGoods = selectedDateGoods.reduce((sum, event) => sum + event.quantity, 0);
  const totalTransport = selectedDateTransport.reduce((sum, option) => sum + option.capacity, 0);

  return {
    selectedDate,
    setSelectedDate,
    datesWithAvailability,
    selectedDateGoods,
    selectedDateTransport,
    totalGoods,
    totalTransport,
    getAvailabilityForDate
  };
};

export default useCalendarData;
