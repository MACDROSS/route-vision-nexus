
import { create } from 'zustand';
import { Facility, Arrival, Departure } from '@/types/facilities';
import { addDays, isSameDay, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { generateMockFacilityData } from './mockData';

interface FacilityStore {
  facilities: Facility[];
  arrivals: Arrival[];
  departures: Departure[];
  
  // Getter methods
  getFacility: (id: string) => Facility | undefined;
  getArrivalsForFacility: (facilityId: string, date: Date, viewMode: "daily" | "weekly") => Arrival[];
  getDeparturesForFacility: (facilityId: string, date: Date, viewMode: "daily" | "weekly") => Departure[];
}

// Create the store with sample data
export const useFacilityStore = create<FacilityStore>((set, get) => {
  // Generate mock data
  const { facilities, arrivals, departures } = generateMockFacilityData();
  
  return {
    facilities,
    arrivals,
    departures,
    
    getFacility: (id: string) => {
      return get().facilities.find(facility => facility.id === id);
    },
    
    getArrivalsForFacility: (facilityId: string, date: Date, viewMode: "daily" | "weekly") => {
      const arrivals = get().arrivals.filter(arrival => arrival.facilityId === facilityId);
      
      if (viewMode === "daily") {
        return arrivals.filter(arrival => 
          isSameDay(new Date(arrival.scheduledTime), date)
        );
      } else {
        // Weekly view
        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
        
        return arrivals.filter(arrival => {
          const arrivalDate = new Date(arrival.scheduledTime);
          return isWithinInterval(arrivalDate, { start: weekStart, end: weekEnd });
        });
      }
    },
    
    getDeparturesForFacility: (facilityId: string, date: Date, viewMode: "daily" | "weekly") => {
      const departures = get().departures.filter(departure => departure.facilityId === facilityId);
      
      if (viewMode === "daily") {
        return departures.filter(departure => 
          isSameDay(new Date(departure.scheduledTime), date)
        );
      } else {
        // Weekly view
        const weekStart = startOfWeek(date, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
        
        return departures.filter(departure => {
          const departureDate = new Date(departure.scheduledTime);
          return isWithinInterval(departureDate, { start: weekStart, end: weekEnd });
        });
      }
    }
  };
});
