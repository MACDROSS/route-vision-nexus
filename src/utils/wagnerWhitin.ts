/**
 * Wagner-Whitin algorithm implementation for production planning
 * 
 * The algorithm finds the optimal production lot sizes to minimize 
 * the sum of setup and holding costs over a planning horizon.
 */

export const optimize = (
  demands: number[], 
  setupCost: number, 
  holdingCostPerUnit: number
): { production: number[], inventory: number[], cost: number } => {
  const n = demands.length;
  
  // Create cost table and decision table
  const cost = Array(n + 1).fill(0);  // Cost[j] = minimum cost for periods 1...j
  const lastProduction = Array(n + 1).fill(0); // Tracks when to produce
  
  // Dynamic programming - fill tables
  for (let j = 1; j <= n; j++) {
    let minCost = Number.MAX_VALUE;
    let bestLastProduction = 0;
    
    // Try each possible last production period
    for (let i = 1; i <= j; i++) {
      let holdingCost = 0;
      
      // Calculate holding cost for production in period i for demands up to j
      for (let k = i; k < j; k++) {
        holdingCost += holdingCostPerUnit * demands[k] * (j - k);
      }
      
      // Total cost = cost up to period i-1 + setup cost + holding cost
      const totalCost = (i > 1 ? cost[i - 1] : 0) + setupCost + holdingCost;
      
      // Keep track of minimum cost
      if (totalCost < minCost) {
        minCost = totalCost;
        bestLastProduction = i;
      }
    }
    
    cost[j] = minCost;
    lastProduction[j] = bestLastProduction;
  }
  
  // Reconstruct the optimal solution
  const production = Array(n).fill(0);
  const inventory = Array(n).fill(0);
  
  // Backtrack to find production periods
  let j = n;
  while (j > 0) {
    const i = lastProduction[j];
    
    // Calculate production quantity for period i
    let productionQuantity = 0;
    for (let k = i - 1; k < j; k++) {
      productionQuantity += demands[k];
    }
    
    production[i - 1] = productionQuantity;
    
    // Update j to process earlier periods
    j = i - 1;
  }
  
  // Calculate inventory levels
  let currentInventory = 0;
  for (let i = 0; i < n; i++) {
    currentInventory = currentInventory + production[i] - demands[i];
    inventory[i] = currentInventory;
  }
  
  return {
    production,
    inventory,
    cost: cost[n]
  };
};
