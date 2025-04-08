
import { useState } from 'react';
import { mockLoadPlans } from './data';
import { LoadPlan } from '@/types/load-plans';

export const useLoadPlans = () => {
  const [loadPlans] = useState<LoadPlan[]>(mockLoadPlans);
  const [selectedLoadPlanId, setSelectedLoadPlanId] = useState<string | null>(mockLoadPlans[0]?.id || null);

  const selectedLoadPlan = loadPlans.find(plan => plan.id === selectedLoadPlanId) || null;

  return {
    loadPlans,
    selectedLoadPlan,
    setSelectedLoadPlanId
  };
};
