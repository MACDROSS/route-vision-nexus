
import ScenarioCard from "./ScenarioCard";

interface ScenariosListProps {
  scenarios: Array<{
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    creator: string;
    routes: number;
    vehicles: number;
  }>;
}

const ScenariosList = ({ scenarios }: ScenariosListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {scenarios.map((scenario) => (
        <ScenarioCard key={scenario.id} scenario={scenario} />
      ))}
    </div>
  );
};

export default ScenariosList;
