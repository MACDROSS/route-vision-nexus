
import { SortPlanningAction } from './SortPlanningReducer';

// Action creators for each action type
export const addDestinationToBin = (destinationId: string, binId: string): SortPlanningAction => ({
  type: 'ADD_DESTINATION_TO_BIN',
  destinationId,
  binId
});

export const removeDestinationFromBin = (destinationId: string, binId: string): SortPlanningAction => ({
  type: 'REMOVE_DESTINATION_FROM_BIN',
  destinationId,
  binId
});

export const addBinToConveyor = (binId: string, conveyorId: string): SortPlanningAction => ({
  type: 'ADD_BIN_TO_CONVEYOR',
  binId,
  conveyorId
});

export const removeBinFromConveyor = (binId: string, conveyorId: string): SortPlanningAction => ({
  type: 'REMOVE_BIN_FROM_CONVEYOR',
  binId,
  conveyorId
});

export const addConveyorToFacility = (conveyorId: string, facilityId: string): SortPlanningAction => ({
  type: 'ADD_CONVEYOR_TO_FACILITY',
  conveyorId,
  facilityId
});

export const removeConveyorFromFacility = (conveyorId: string, facilityId: string): SortPlanningAction => ({
  type: 'REMOVE_CONVEYOR_FROM_FACILITY',
  conveyorId,
  facilityId
});

export const moveBin = (dragIndex: number, hoverIndex: number, conveyorId: string): SortPlanningAction => ({
  type: 'MOVE_BIN',
  dragIndex,
  hoverIndex,
  conveyorId
});

export const moveConveyor = (dragIndex: number, hoverIndex: number, facilityId: string): SortPlanningAction => ({
  type: 'MOVE_CONVEYOR',
  dragIndex,
  hoverIndex,
  facilityId
});

export const moveDestination = (dragIndex: number, hoverIndex: number, binId: string): SortPlanningAction => ({
  type: 'MOVE_DESTINATION',
  dragIndex,
  hoverIndex,
  binId
});
