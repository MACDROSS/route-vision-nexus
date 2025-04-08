
import React, { createContext, useContext, useReducer } from 'react';
import { SortPlanningContextType, Facility } from './types';
import { mockFacilities } from './mock-data';
import { sortPlanningReducer } from './SortPlanningReducer';
import { 
  addDestinationToBin, 
  removeDestinationFromBin,
  addBinToConveyor,
  removeBinFromConveyor,
  addConveyorToFacility,
  removeConveyorFromFacility,
  moveBin,
  moveConveyor,
  moveDestination
} from './SortPlanningActions';

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
  const [facilities, dispatch] = useReducer(sortPlanningReducer, mockFacilities);

  // Create context value object with all the actions
  const contextValue: SortPlanningContextType = {
    facilities,
    addDestinationToBin: (destinationId, binId) => 
      dispatch(addDestinationToBin(destinationId, binId)),
    removeDestinationFromBin: (destinationId, binId) => 
      dispatch(removeDestinationFromBin(destinationId, binId)),
    addBinToConveyor: (binId, conveyorId) => 
      dispatch(addBinToConveyor(binId, conveyorId)),
    removeBinFromConveyor: (binId, conveyorId) => 
      dispatch(removeBinFromConveyor(binId, conveyorId)),
    addConveyorToFacility: (conveyorId, facilityId) => 
      dispatch(addConveyorToFacility(conveyorId, facilityId)),
    removeConveyorFromFacility: (conveyorId, facilityId) => 
      dispatch(removeConveyorFromFacility(conveyorId, facilityId)),
    moveBin: (dragIndex, hoverIndex, conveyorId) => 
      dispatch(moveBin(dragIndex, hoverIndex, conveyorId)),
    moveConveyor: (dragIndex, hoverIndex, facilityId) => 
      dispatch(moveConveyor(dragIndex, hoverIndex, facilityId)),
    moveDestination: (dragIndex, hoverIndex, binId) => 
      dispatch(moveDestination(dragIndex, hoverIndex, binId))
  };

  return (
    <SortPlanningContext.Provider value={contextValue}>
      {children}
    </SortPlanningContext.Provider>
  );
};
