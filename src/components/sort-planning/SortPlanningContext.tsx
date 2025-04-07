
import React, { createContext, useState, useContext } from 'react';
import { 
  SortPlanningContextType, 
  Facility, 
  Conveyor, 
  Bin, 
  Destination 
} from './types';
import { mockFacilities } from './mock-data';

// Create the context
const SortPlanningContext = createContext<SortPlanningContextType | undefined>(undefined);

// Custom hook to use this context
export const useSortPlanning = () => {
  const context = useContext(SortPlanningContext);
  if (!context) {
    throw new Error('useSortPlanning must be used within a SortPlanningProvider');
  }
  return context;
};

// Provider component
export const SortPlanningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [facilities, setFacilities] = useState<Facility[]>(mockFacilities);

  const findBinById = (binId: string): { bin: Bin | undefined, conveyorId: string | undefined } => {
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

  const findConveyorById = (conveyorId: string): { conveyor: Conveyor | undefined, facilityId: string | undefined } => {
    for (const facility of facilities) {
      const conveyor = facility.conveyors.find(c => c.id === conveyorId);
      if (conveyor) {
        return { conveyor, facilityId: facility.id };
      }
    }
    return { conveyor: undefined, facilityId: undefined };
  };

  // Add a destination to a bin
  const addDestinationToBin = (destinationId: string, binId: string) => {
    const { bin } = findBinById(binId);
    if (!bin) return;
    
    // Find the destination from any other bin that may contain it
    let destinationToAdd: Destination | undefined;
    
    setFacilities(current => {
      const newFacilities = [...current];
      
      // Search for the destination in all bins
      for (const facility of newFacilities) {
        for (const conveyor of facility.conveyors) {
          for (const b of conveyor.bins) {
            const destIndex = b.destinations.findIndex(d => d.id === destinationId);
            
            if (destIndex !== -1) {
              // We found the destination, now remove it from its current bin
              destinationToAdd = b.destinations[destIndex];
              b.destinations = b.destinations.filter(d => d.id !== destinationId);
              break;
            }
          }
          
          if (destinationToAdd) break;
        }
        if (destinationToAdd) break;
      }
      
      // Now add the destination to the target bin
      if (destinationToAdd) {
        for (const facility of newFacilities) {
          for (const conveyor of facility.conveyors) {
            const targetBin = conveyor.bins.find(b => b.id === binId);
            if (targetBin) {
              targetBin.destinations.push(destinationToAdd);
              break;
            }
          }
        }
      }
      
      return newFacilities;
    });
  };

  // Remove a destination from a bin
  const removeDestinationFromBin = (destinationId: string, binId: string) => {
    setFacilities(current => {
      const newFacilities = [...current];
      
      for (const facility of newFacilities) {
        for (const conveyor of facility.conveyors) {
          const bin = conveyor.bins.find(b => b.id === binId);
          if (bin) {
            bin.destinations = bin.destinations.filter(d => d.id !== destinationId);
            break;
          }
        }
      }
      
      return newFacilities;
    });
  };

  // Add a bin to a conveyor
  const addBinToConveyor = (binId: string, conveyorId: string) => {
    const { bin, conveyorId: sourceCvId } = findBinById(binId);
    if (!bin || sourceCvId === conveyorId) return;
    
    setFacilities(current => {
      const newFacilities = [...current];
      
      // First remove bin from its current conveyor
      for (const facility of newFacilities) {
        for (const conveyor of facility.conveyors) {
          if (conveyor.id === sourceCvId) {
            conveyor.bins = conveyor.bins.filter(b => b.id !== binId);
            break;
          }
        }
      }
      
      // Then add bin to target conveyor
      for (const facility of newFacilities) {
        for (const conveyor of facility.conveyors) {
          if (conveyor.id === conveyorId) {
            conveyor.bins.push(bin);
            break;
          }
        }
      }
      
      return newFacilities;
    });
  };

  // Remove a bin from a conveyor
  const removeBinFromConveyor = (binId: string, conveyorId: string) => {
    setFacilities(current => {
      const newFacilities = [...current];
      
      for (const facility of newFacilities) {
        for (const conveyor of facility.conveyors) {
          if (conveyor.id === conveyorId) {
            conveyor.bins = conveyor.bins.filter(b => b.id !== binId);
            break;
          }
        }
      }
      
      return newFacilities;
    });
  };

  // Add a conveyor to a facility
  const addConveyorToFacility = (conveyorId: string, facilityId: string) => {
    const { conveyor, facilityId: sourceFacId } = findConveyorById(conveyorId);
    if (!conveyor || sourceFacId === facilityId) return;
    
    setFacilities(current => {
      const newFacilities = [...current];
      
      // First remove conveyor from its current facility
      for (const facility of newFacilities) {
        if (facility.id === sourceFacId) {
          facility.conveyors = facility.conveyors.filter(c => c.id !== conveyorId);
          break;
        }
      }
      
      // Then add conveyor to target facility
      for (const facility of newFacilities) {
        if (facility.id === facilityId) {
          facility.conveyors.push(conveyor);
          break;
        }
      }
      
      return newFacilities;
    });
  };

  // Remove a conveyor from a facility
  const removeConveyorFromFacility = (conveyorId: string, facilityId: string) => {
    setFacilities(current => {
      const newFacilities = [...current];
      
      for (const facility of newFacilities) {
        if (facility.id === facilityId) {
          facility.conveyors = facility.conveyors.filter(c => c.id !== conveyorId);
          break;
        }
      }
      
      return newFacilities;
    });
  };

  // Move a bin within a conveyor
  const moveBin = (dragIndex: number, hoverIndex: number, conveyorId: string) => {
    setFacilities(current => {
      const newFacilities = [...current];
      
      for (const facility of newFacilities) {
        for (const conveyor of facility.conveyors) {
          if (conveyor.id === conveyorId) {
            const dragBin = conveyor.bins[dragIndex];
            conveyor.bins.splice(dragIndex, 1);
            conveyor.bins.splice(hoverIndex, 0, dragBin);
            break;
          }
        }
      }
      
      return newFacilities;
    });
  };

  // Move a conveyor within a facility
  const moveConveyor = (dragIndex: number, hoverIndex: number, facilityId: string) => {
    setFacilities(current => {
      const newFacilities = [...current];
      
      for (const facility of newFacilities) {
        if (facility.id === facilityId) {
          const dragConveyor = facility.conveyors[dragIndex];
          facility.conveyors.splice(dragIndex, 1);
          facility.conveyors.splice(hoverIndex, 0, dragConveyor);
          break;
        }
      }
      
      return newFacilities;
    });
  };

  // Move a destination within a bin
  const moveDestination = (dragIndex: number, hoverIndex: number, binId: string) => {
    setFacilities(current => {
      const newFacilities = [...current];
      
      for (const facility of newFacilities) {
        for (const conveyor of facility.conveyors) {
          const bin = conveyor.bins.find(b => b.id === binId);
          if (bin) {
            const dragDest = bin.destinations[dragIndex];
            bin.destinations.splice(dragIndex, 1);
            bin.destinations.splice(hoverIndex, 0, dragDest);
            break;
          }
        }
      }
      
      return newFacilities;
    });
  };

  return (
    <SortPlanningContext.Provider value={{
      facilities,
      addDestinationToBin,
      removeDestinationFromBin,
      addBinToConveyor,
      removeBinFromConveyor,
      addConveyorToFacility,
      removeConveyorFromFacility,
      moveBin,
      moveConveyor,
      moveDestination
    }}>
      {children}
    </SortPlanningContext.Provider>
  );
};
