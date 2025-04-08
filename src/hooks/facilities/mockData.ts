
import { Facility, Arrival, Departure } from '@/types/facilities';
import { addDays, addHours, setHours, setMinutes } from 'date-fns';

// Generate a random time for today
const randomTime = (baseDate: Date, minHour = 6, maxHour = 22): Date => {
  const hour = Math.floor(Math.random() * (maxHour - minHour)) + minHour;
  const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, or 45 minutes
  
  return setMinutes(setHours(baseDate, hour), minute);
};

// Get a random status based on probability
const getRandomArrivalStatus = (): "scheduled" | "in-transit" | "arrived" | "delayed" => {
  const rand = Math.random();
  if (rand < 0.3) return "scheduled";
  if (rand < 0.6) return "in-transit";
  if (rand < 0.9) return "arrived";
  return "delayed";
};

const getRandomDepartureStatus = (): "scheduled" | "in-progress" | "departed" | "delayed" => {
  const rand = Math.random();
  if (rand < 0.3) return "scheduled";
  if (rand < 0.6) return "in-progress";
  if (rand < 0.9) return "departed";
  return "delayed";
};

// Sample carriers
const carriers = [
  "FedEx", "UPS", "DHL", "USPS", "Amazon Logistics", "XPO Logistics", "J.B. Hunt", "Swift"
];

// Sample origins/destinations
const locations = [
  "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Philadelphia, PA",
  "Phoenix, AZ", "San Antonio, TX", "San Diego, CA", "Dallas, TX", "Austin, TX",
  "Jacksonville, FL", "Fort Worth, TX", "Columbus, OH", "Indianapolis, IN", "Charlotte, NC",
  "San Francisco, CA", "Seattle, WA", "Denver, CO", "Boston, MA", "Portland, OR"
];

// Generate random shipment ID
const generateShipmentId = (): string => {
  const prefix = ["SH", "TL", "LTL", "AIR", "INT"][Math.floor(Math.random() * 5)];
  const number = Math.floor(Math.random() * 900000) + 100000;
  return `${prefix}-${number}`;
};

export const generateMockFacilityData = () => {
  // Create mock facilities
  const facilities: Facility[] = [
    {
      id: "fac-001",
      name: "Main Distribution Center",
      location: "Atlanta, GA",
      type: "distribution",
      capacity: 120000,
      coordinates: { lat: 33.7490, lng: -84.3880 }
    },
    {
      id: "fac-002",
      name: "West Coast Warehouse",
      location: "Los Angeles, CA",
      type: "warehouse",
      capacity: 85000,
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    {
      id: "fac-003",
      name: "Midwest Manufacturing Plant",
      location: "Chicago, IL",
      type: "manufacturing",
      capacity: 65000,
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    {
      id: "fac-004",
      name: "East Coast Fulfillment Center",
      location: "Philadelphia, PA",
      type: "warehouse",
      capacity: 95000,
      coordinates: { lat: 39.9526, lng: -75.1652 }
    },
    {
      id: "fac-005",
      name: "Southern Distribution Hub",
      location: "Dallas, TX",
      type: "distribution",
      capacity: 110000,
      coordinates: { lat: 32.7767, lng: -96.7970 }
    }
  ];

  // Generate arrivals and departures for the next 14 days
  const arrivals: Arrival[] = [];
  const departures: Departure[] = [];
  
  const today = new Date();
  
  // For each facility
  facilities.forEach(facility => {
    // Generate data for the next 14 days
    for (let i = 0; i < 14; i++) {
      const currentDate = addDays(today, i);
      
      // Generate 4-10 arrivals per day per facility
      const numArrivals = Math.floor(Math.random() * 7) + 4;
      for (let j = 0; j < numArrivals; j++) {
        arrivals.push({
          id: `arr-${facility.id}-${i}-${j}`,
          facilityId: facility.id,
          shipmentId: generateShipmentId(),
          scheduledTime: randomTime(currentDate),
          origin: locations[Math.floor(Math.random() * locations.length)],
          carrier: carriers[Math.floor(Math.random() * carriers.length)],
          itemCount: Math.floor(Math.random() * 2000) + 500,
          status: getRandomArrivalStatus()
        });
      }
      
      // Generate 4-10 departures per day per facility
      const numDepartures = Math.floor(Math.random() * 7) + 4;
      for (let j = 0; j < numDepartures; j++) {
        departures.push({
          id: `dep-${facility.id}-${i}-${j}`,
          facilityId: facility.id,
          shipmentId: generateShipmentId(),
          scheduledTime: randomTime(currentDate),
          destination: locations[Math.floor(Math.random() * locations.length)],
          carrier: carriers[Math.floor(Math.random() * carriers.length)],
          itemCount: Math.floor(Math.random() * 2000) + 500,
          status: getRandomDepartureStatus()
        });
      }
    }
  });
  
  return { facilities, arrivals, departures };
};
