
import { Facility } from './types';
import { findBinById, findConveyorById } from './SortPlanningUtils';

// Define action types
export type SortPlanningAction = 
  | { type: 'ADD_DESTINATION_TO_BIN'; destinationId: string; binId: string }
  | { type: 'REMOVE_DESTINATION_FROM_BIN'; destinationId: string; binId: string }
  | { type: 'ADD_BIN_TO_CONVEYOR'; binId: string; conveyorId: string }
  | { type: 'REMOVE_BIN_FROM_CONVEYOR'; binId: string; conveyorId: string }
  | { type: 'ADD_CONVEYOR_TO_FACILITY'; conveyorId: string; facilityId: string }
  | { type: 'REMOVE_CONVEYOR_FROM_FACILITY'; conveyorId: string; facilityId: string }
  | { type: 'MOVE_BIN'; dragIndex: number; hoverIndex: number; conveyorId: string }
  | { type: 'MOVE_CONVEYOR'; dragIndex: number; hoverIndex: number; facilityId: string }
  | { type: 'MOVE_DESTINATION'; dragIndex: number; hoverIndex: number; binId: string };

// Main reducer function
export const sortPlanningReducer = (facilities: Facility[], action: SortPlanningAction): Facility[] => {
  switch (action.type) {
    case 'ADD_DESTINATION_TO_BIN': {
      const { destinationId, binId } = action;
      const newFacilities = [...facilities];
      let destinationToAdd;
      
      // Find the destination and remove it from its current bin
      for (const facility of newFacilities) {
        for (const conveyor of facility.conveyors) {
          for (const bin of conveyor.bins) {
            const destIndex = bin.destinations.findIndex(d => d.id === destinationId);
            if (destIndex !== -1) {
              destinationToAdd = bin.destinations[destIndex];
              bin.destinations = bin.destinations.filter(d => d.id !== destinationId);
              break;
            }
          }
          if (destinationToAdd) break;
        }
        if (destinationToAdd) break;
      }
      
      // Add the destination to the target bin
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
    }

    case 'REMOVE_DESTINATION_FROM_BIN': {
      const { destinationId, binId } = action;
      return facilities.map(facility => ({
        ...facility,
        conveyors: facility.conveyors.map(conveyor => ({
          ...conveyor,
          bins: conveyor.bins.map(bin => 
            bin.id === binId 
              ? { ...bin, destinations: bin.destinations.filter(d => d.id !== destinationId) }
              : bin
          )
        }))
      }));
    }

    case 'ADD_BIN_TO_CONVEYOR': {
      const { binId, conveyorId } = action;
      const { bin, conveyorId: sourceCvId } = findBinById(binId, facilities);
      if (!bin || sourceCvId === conveyorId) return facilities;
      
      const newFacilities = [...facilities];
      
      // Remove bin from source conveyor
      for (const facility of newFacilities) {
        for (const conveyor of facility.conveyors) {
          if (conveyor.id === sourceCvId) {
            conveyor.bins = conveyor.bins.filter(b => b.id !== binId);
            break;
          }
        }
      }
      
      // Add bin to target conveyor
      for (const facility of newFacilities) {
        for (const conveyor of facility.conveyors) {
          if (conveyor.id === conveyorId) {
            conveyor.bins.push(bin);
            break;
          }
        }
      }
      
      return newFacilities;
    }

    case 'REMOVE_BIN_FROM_CONVEYOR': {
      const { binId, conveyorId } = action;
      return facilities.map(facility => ({
        ...facility,
        conveyors: facility.conveyors.map(conveyor => 
          conveyor.id === conveyorId
            ? { ...conveyor, bins: conveyor.bins.filter(b => b.id !== binId) }
            : conveyor
        )
      }));
    }

    case 'ADD_CONVEYOR_TO_FACILITY': {
      const { conveyorId, facilityId } = action;
      const { conveyor, facilityId: sourceFacId } = findConveyorById(conveyorId, facilities);
      if (!conveyor || sourceFacId === facilityId) return facilities;
      
      const newFacilities = [...facilities];
      
      // Remove conveyor from source facility
      for (const facility of newFacilities) {
        if (facility.id === sourceFacId) {
          facility.conveyors = facility.conveyors.filter(c => c.id !== conveyorId);
          break;
        }
      }
      
      // Add conveyor to target facility
      for (const facility of newFacilities) {
        if (facility.id === facilityId) {
          facility.conveyors.push(conveyor);
          break;
        }
      }
      
      return newFacilities;
    }

    case 'REMOVE_CONVEYOR_FROM_FACILITY': {
      const { conveyorId, facilityId } = action;
      return facilities.map(facility => 
        facility.id === facilityId
          ? { ...facility, conveyors: facility.conveyors.filter(c => c.id !== conveyorId) }
          : facility
      );
    }

    case 'MOVE_BIN': {
      const { dragIndex, hoverIndex, conveyorId } = action;
      return facilities.map(facility => ({
        ...facility,
        conveyors: facility.conveyors.map(conveyor => {
          if (conveyor.id === conveyorId) {
            const newBins = [...conveyor.bins];
            const dragBin = newBins[dragIndex];
            newBins.splice(dragIndex, 1);
            newBins.splice(hoverIndex, 0, dragBin);
            return { ...conveyor, bins: newBins };
          }
          return conveyor;
        })
      }));
    }

    case 'MOVE_CONVEYOR': {
      const { dragIndex, hoverIndex, facilityId } = action;
      return facilities.map(facility => {
        if (facility.id === facilityId) {
          const newConveyors = [...facility.conveyors];
          const dragConveyor = newConveyors[dragIndex];
          newConveyors.splice(dragIndex, 1);
          newConveyors.splice(hoverIndex, 0, dragConveyor);
          return { ...facility, conveyors: newConveyors };
        }
        return facility;
      });
    }

    case 'MOVE_DESTINATION': {
      const { dragIndex, hoverIndex, binId } = action;
      return facilities.map(facility => ({
        ...facility,
        conveyors: facility.conveyors.map(conveyor => ({
          ...conveyor,
          bins: conveyor.bins.map(bin => {
            if (bin.id === binId) {
              const newDestinations = [...bin.destinations];
              const dragDest = newDestinations[dragIndex];
              newDestinations.splice(dragIndex, 1);
              newDestinations.splice(hoverIndex, 0, dragDest);
              return { ...bin, destinations: newDestinations };
            }
            return bin;
          })
        }))
      }));
    }

    default:
      return facilities;
  }
};
