
import ResourceUtilizationPieChart from "../charts/ResourceUtilizationPieChart";

interface ResourcesTabProps {
  resourceUtilizationData: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
}

const ResourcesTab = ({ resourceUtilizationData, colors }: ResourcesTabProps) => {
  return (
    <ResourceUtilizationPieChart 
      data={resourceUtilizationData} 
      colors={colors} 
    />
  );
};

export default ResourcesTab;
