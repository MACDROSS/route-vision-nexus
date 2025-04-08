
export interface Product {
  id: string;
  name: string;
  position: string; // Format: "x,y,z" for 3D positioning
  dimensions: string; // Format: "width x length x height"
  weight: number; // in pounds
  color: string; // for visualization
  sku: string; // product identifier
}

export interface LoadPlan {
  id: string;
  name: string;
  truckId: string;
  createdAt: Date;
  status: 'active' | 'scheduled' | 'completed' | 'template';
  spaceUtilization: number; // percentage
  products: Product[];
}
