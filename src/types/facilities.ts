
export interface Facility {
  id: string;
  name: string;
  location: string;
  type: "distribution" | "manufacturing" | "warehouse" | "retail";
  capacity: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Arrival {
  id: string;
  facilityId: string;
  shipmentId: string;
  scheduledTime: Date | string;
  origin: string;
  carrier: string;
  itemCount: number;
  status: "scheduled" | "in-transit" | "arrived" | "delayed";
}

export interface Departure {
  id: string;
  facilityId: string;
  shipmentId: string;
  scheduledTime: Date | string;
  destination: string;
  carrier: string;
  itemCount: number;
  status: "scheduled" | "in-progress" | "departed" | "delayed";
}
