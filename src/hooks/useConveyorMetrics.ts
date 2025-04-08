
import { useState, useEffect } from 'react';
import { ConveyorMetrics, BottleneckEvent, ConveyorAlert } from '@/types/production';

// Function to generate sample metrics data
const generateSampleMetricsData = (): ConveyorMetrics[] => {
  const now = new Date();
  
  // Generate metric history for the last 24 hours
  const generateHistory = (baseEfficiency: number, baseUtilization: number, baseThroughput: number) => {
    return Array.from({ length: 24 }).map((_, i) => {
      const hoursAgo = 24 - i;
      // Add some variance to the metrics to make it look realistic
      const variance = (Math.sin(i * 0.5) * 0.1) + (Math.random() * 0.05);
      return {
        timestamp: new Date(now.getTime() - hoursAgo * 60 * 60 * 1000),
        throughput: Math.max(0, Math.round(baseThroughput * (1 + variance))),
        utilization: Math.min(100, Math.max(0, baseUtilization * (1 + variance))),
        efficiency: Math.min(100, Math.max(0, baseEfficiency * (1 + variance))),
      };
    });
  };
  
  // Generate some bottleneck events
  const generateBottlenecks = (conveyorName: string, count: number): BottleneckEvent[] => {
    return Array.from({ length: count }).map((_, i) => {
      const hoursAgo = Math.floor(Math.random() * 24);
      const duration = 10 + Math.floor(Math.random() * 50);
      const impact = 5 + Math.floor(Math.random() * 40);
      
      return {
        id: `bottleneck-${conveyorName}-${i}`,
        location: `${conveyorName} - Section ${Math.floor(Math.random() * 5) + 1}`,
        timestamp: new Date(now.getTime() - hoursAgo * 60 * 60 * 1000),
        duration,
        impact,
        status: Math.random() > 0.3 ? 'resolved' : 'active',
        reason: getRandomReason()
      };
    });
  };
  
  const getRandomReason = () => {
    const reasons = [
      'Belt misalignment',
      'Motor overheating',
      'Sensor failure',
      'Object jam',
      'Power fluctuation',
      'Speed mismatch',
      'Control system error',
      'Worn components',
      'Lubrication issue',
      'Overload condition'
    ];
    return reasons[Math.floor(Math.random() * reasons.length)];
  };
  
  // Generate alerts based on metrics
  const generateAlerts = (conveyorId: string, conveyorName: string, metrics: any): ConveyorAlert[] => {
    const alerts: ConveyorAlert[] = [];
    
    // Check for low efficiency
    if (metrics.efficiency < 80) {
      alerts.push({
        id: `alert-${conveyorId}-1`,
        severity: metrics.efficiency < 60 ? 'high' : 'medium',
        message: `Low efficiency detected on ${conveyorName}`,
        timestamp: new Date(now.getTime() - Math.floor(Math.random() * 12) * 60 * 60 * 1000),
        read: false,
        metricId: 'efficiency',
        metricName: 'Efficiency',
        thresholdValue: 80,
        actualValue: metrics.efficiency
      });
    }
    
    // Check for high downtime
    if (metrics.downtime > 120) {
      alerts.push({
        id: `alert-${conveyorId}-2`,
        severity: metrics.downtime > 180 ? 'critical' : 'high',
        message: `Excessive downtime on ${conveyorName}`,
        timestamp: new Date(now.getTime() - Math.floor(Math.random() * 8) * 60 * 60 * 1000),
        read: Math.random() > 0.5,
        metricId: 'downtime',
        metricName: 'Downtime',
        thresholdValue: 120,
        actualValue: metrics.downtime
      });
    }
    
    // Check for low MTBF
    if (metrics.mtbf < 100) {
      alerts.push({
        id: `alert-${conveyorId}-3`,
        severity: metrics.mtbf < 50 ? 'high' : 'medium',
        message: `${conveyorName} requires maintenance - low MTBF`,
        timestamp: new Date(now.getTime() - Math.floor(Math.random() * 24) * 60 * 60 * 1000),
        read: Math.random() > 0.3,
        metricId: 'mtbf',
        metricName: 'Mean Time Between Failures',
        thresholdValue: 100,
        actualValue: metrics.mtbf
      });
    }
    
    return alerts;
  };
  
  // Sample conveyor data
  const conveyors = [
    {
      id: 'conveyor-1',
      name: 'Main Assembly Line',
      throughput: 450,
      utilization: 85,
      downtime: 45,
      mtbf: 140,
      mttr: 15,
      efficiency: 92
    },
    {
      id: 'conveyor-2',
      name: 'Packaging Line',
      throughput: 620,
      utilization: 78,
      downtime: 30,
      mtbf: 180,
      mttr: 12,
      efficiency: 88
    },
    {
      id: 'conveyor-3',
      name: 'Material Handling System',
      throughput: 340,
      utilization: 92,
      downtime: 120,
      mtbf: 60,
      mttr: 25,
      efficiency: 74
    },
    {
      id: 'conveyor-4',
      name: 'Quality Inspection Line',
      throughput: 380,
      utilization: 65,
      downtime: 20,
      mtbf: 210,
      mttr: 8,
      efficiency: 95
    },
    {
      id: 'conveyor-5',
      name: 'Distribution Sorter',
      throughput: 570,
      utilization: 88,
      downtime: 60,
      mtbf: 90,
      mttr: 18,
      efficiency: 82
    }
  ];
  
  // Enhance conveyor data with history, bottlenecks and alerts
  return conveyors.map(conveyor => {
    // Number of bottlenecks based on efficiency - lower efficiency means more bottlenecks
    const bottleneckCount = Math.floor((100 - conveyor.efficiency) / 10) + 1;
    const bottlenecks = generateBottlenecks(conveyor.name, bottleneckCount);
    const metricHistory = generateHistory(conveyor.efficiency, conveyor.utilization, conveyor.throughput);
    const alerts = generateAlerts(conveyor.id, conveyor.name, conveyor);
    
    return {
      ...conveyor,
      bottlenecks,
      metricHistory,
      alerts
    };
  });
};

export function useConveyorMetrics() {
  const [metrics, setMetrics] = useState<ConveyorMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConveyor, setSelectedConveyor] = useState<string | null>(null);

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = generateSampleMetricsData();
      setMetrics(data);
      setSelectedConveyor(data[0]?.id || null);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Get selected conveyor data
  const selectedConveyorData = selectedConveyor 
    ? metrics.find(m => m.id === selectedConveyor) 
    : null;

  // Get all active bottlenecks across all conveyors
  const activeBottlenecks = metrics.flatMap(conveyor => 
    conveyor.bottlenecks.filter(b => b.status === 'active')
      .map(b => ({ ...b, conveyorName: conveyor.name, conveyorId: conveyor.id }))
  );

  // Get all unread alerts
  const activeAlerts = metrics.flatMap(conveyor => 
    (conveyor.alerts || [])
      .filter(a => !a.read)
      .map(a => ({ ...a, conveyorName: conveyor.name, conveyorId: conveyor.id }))
  );

  // Mark an alert as read
  const markAlertAsRead = (alertId: string) => {
    setMetrics(currentMetrics => 
      currentMetrics.map(conveyor => ({
        ...conveyor,
        alerts: (conveyor.alerts || []).map(alert => 
          alert.id === alertId ? { ...alert, read: true } : alert
        )
      }))
    );
  };

  // Mark a bottleneck as resolved
  const resolveBottleneck = (bottleneckId: string) => {
    setMetrics(currentMetrics => 
      currentMetrics.map(conveyor => ({
        ...conveyor,
        bottlenecks: conveyor.bottlenecks.map(bottleneck => 
          bottleneck.id === bottleneckId ? { ...bottleneck, status: 'resolved' } : bottleneck
        )
      }))
    );
  };

  // Calculate overall efficiency across all conveyors
  const overallEfficiency = metrics.length > 0
    ? metrics.reduce((acc, curr) => acc + curr.efficiency, 0) / metrics.length
    : 0;

  // Calculate total throughput
  const totalThroughput = metrics.reduce((acc, curr) => acc + curr.throughput, 0);

  return {
    metrics,
    isLoading,
    selectedConveyor,
    setSelectedConveyor,
    selectedConveyorData,
    activeBottlenecks,
    activeAlerts,
    markAlertAsRead,
    resolveBottleneck,
    overallEfficiency,
    totalThroughput
  };
}
