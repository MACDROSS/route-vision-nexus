
import { Scenario } from "./types";
import { baselineScenario } from "./mock-data/baseline-scenario";
import { expandedEastScenario } from "./mock-data/expanded-east-scenario";
import { optimizedFleetScenario } from "./mock-data/optimized-fleet-scenario";
import { hybridScenario } from "./mock-data/hybrid-scenario";

// Export all scenarios in an array to maintain the same interface
export const scenariosData: Scenario[] = [
  baselineScenario,
  expandedEastScenario,
  optimizedFleetScenario,
  hybridScenario
];
