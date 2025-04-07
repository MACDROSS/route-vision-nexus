
import { useState } from "react";
import { optimize } from "@/utils/wagnerWhitin";
import ParametersForm from "./optimization/ParametersForm";
import ResultsPanel from "./optimization/ResultsPanel";
import ImplementationNotes from "./optimization/ImplementationNotes";

const OptimizationPanel = () => {
  const [periods, setPeriods] = useState(6);
  const [demands, setDemands] = useState<number[]>([100, 150, 120, 200, 180, 160]);
  const [setupCost, setSetupCost] = useState(1000);
  const [holdingCost, setHoldingCost] = useState(5);
  const [results, setResults] = useState<{ production: number[], inventory: number[], cost: number } | null>(null);
  
  const handleOptimize = () => {
    const result = optimize(demands, setupCost, holdingCost);
    setResults(result);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ParametersForm 
        periods={periods}
        setPeriods={setPeriods}
        demands={demands}
        setDemands={setDemands}
        setupCost={setupCost}
        setSetupCost={setSetupCost}
        holdingCost={holdingCost}
        setHoldingCost={setHoldingCost}
        onOptimize={handleOptimize}
      />
      
      <ResultsPanel 
        results={results}
        demands={demands}
      />

      {results && (
        <div className="lg:col-span-2">
          <ImplementationNotes production={results.production} />
        </div>
      )}
    </div>
  );
};

export default OptimizationPanel;
