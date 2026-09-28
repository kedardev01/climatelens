export type TabType =
  | 'overview'
  | 'analytics'
  | 'war-impact'
  | 'ai-impact'
  | 'live-earth'
  | 'climate'
  | 'environment'
  | 'energy'
  | 'india';

export type SubTabType = 'disasters' | 'analytics' | 'awareness' | 'reports' | 'archive';

export interface WarConflictImpact {
  id: string;
  name: string;
  region: string;
  period: string;
  totalCO2eMt: number;
  civilianCountryEquivalent: string;
  directWarfareMt: number;
  firesAndDestructionMt: number;
  reconstructionDebtMt: number;
  displacementAndLogisticsMt: number;
  keyEcologicalImpacts: string[];
  waterAndSoilDamage: string;
  summary: string;
}

export interface AIDataCenterMetric {
  year: number;
  globalTWh: number;
  aiSpecificTWh: number;
  coolingWaterBillionLiters: number;
  co2Megatons: number;
  equivalentHouseholdsMillion: number;
}

export interface ClimateTimeSeriesPoint {
  year: number;
  tempAnomaly: number;
  co2Ppm: number;
  ch4Ppb: number;
  n2oPpb: number;
  seaLevelRiseMm: number;
  oceanHeatZJ: number;
  arcticIceExtentMkm2: number;
  extremeEventsCount: number;
  disasterLossBillionUSD: number;
}

export interface GlobalKPI {
  id: string;
  name: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  statusType: 'error' | 'warning' | 'secondary' | 'primary';
  source: string;
  sparkline: number[];
  description: string;
}

export interface RegionData {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // lat, lng
  surfaceTemp: string;
  tempAnomaly: string;
  aqi: number;
  aqiStatus: 'Good' | 'Moderate' | 'Poor' | 'Severe';
  forestCover: string;
  forestCoverChange: string;
  waterIndex: number; // 0-100
  meanTemp: string;
  tempTrend: number[];
  renewableAdoption: string;
  keyThreats: string[];
  summary: string;
}

export interface LearningModule {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  fullContent: {
    overview: string;
    keyPoints: string[];
    dataPoints: { label: string; value: string }[];
    solutionPath: string;
  };
}

export interface VulnerabilityMatrix {
  id: string;
  title: string;
  metric: string;
  type: 'heat' | 'water' | 'food' | 'health' | 'ecosystems' | 'economy';
  severity: 'high' | 'critical' | 'moderate';
  color: string;
  description: string;
  projection2030: string;
  affectedPopulation: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  type: 'SYS' | 'DATA' | 'WARN' | 'ALERT';
  message: string;
}

export interface EmissionsSector {
  name: string;
  percentage: number;
  color: string;
  subSectors: { name: string; percentage: number }[];
}
