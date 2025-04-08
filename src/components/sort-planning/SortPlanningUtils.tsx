
import { Bin, Conveyor, Facility } from './types';

// Helper function to find a bin by its ID
export const findBinById = (binId: string, facilities: Facility[]): { bin: Bin | undefined, conveyorId: string | undefined } => {
  for (const facility of facilities) {
    for (const conveyor of facility.conveyors) {
      const bin = conveyor.bins.find(b => b.id === binId);
      if (bin) {
        return { bin, conveyorId: conveyor.id };
      }
    }
  }
  return { bin: undefined, conveyorId: undefined };
};

// Helper function to find a conveyor by its ID
export const findConveyorById = (conveyorId: string, facilities: Facility[]): { conveyor: Conveyor | undefined, facilityId: string | undefined } => {
  for (const facility of facilities) {
    const conveyor = facility.conveyors.find(c => c.id === conveyorId);
    if (conveyor) {
      return { conveyor, facilityId: facility.id };
    }
  }
  return { conveyor: undefined, facilityId: undefined };
};
