/**
 * Globe.gl Specialized Geospatial & Climate Layers Data Service
 * Powers 3D points, rings, arcs, and labels for Globe.gl
 */

export interface GlobePoint {
  lat: number;
  lng: number;
  name: string;
  category: 'Observation Hub' | 'Glacial Monitor' | 'Clean Energy Park' | 'Megacity Vulnerability';
  color: string;
  radius: number;
  altitude: number;
  metric: string;
  status: string;
}

export interface GlobeRing {
  lat: number;
  lng: number;
  name: string;
  type: 'Heatwave Anomaly' | 'Glacial Surge' | 'Cyclonic Depression' | 'Particulate Trapping' | 'Flood Alert';
  maxR: number;
  propagationSpeed: number;
  repeatPeriod: number;
  color: string;
}

export interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  name: string;
  type: 'Monsoon Moisture Flow' | 'Atmospheric Jet Stream' | 'Clean Tech Corridor';
  color: [string, string];
  stroke: number;
}

export interface GlobeLabel {
  lat: number;
  lng: number;
  text: string;
  size: number;
  color: string;
  subtext: string;
}

// 1. Global & Subcontinental Observation Points
export const GLOBE_OBSERVATION_POINTS: GlobePoint[] = [
  {
    lat: 34.1526,
    lng: 77.5771,
    name: 'Leh Cryosphere Observatory (Ladakh UT)',
    category: 'Glacial Monitor',
    color: '#00e5ff',
    radius: 0.7,
    altitude: 0.04,
    metric: 'Siachen Melt: -15m/yr',
    status: 'Active High-Altitude Station'
  },
  {
    lat: 28.6139,
    lng: 77.209,
    name: 'New Delhi National Met Center (IMD)',
    category: 'Megacity Vulnerability',
    color: '#ff5252',
    radius: 0.8,
    altitude: 0.035,
    metric: 'Real-time AQI: High Trapping',
    status: 'Continuous Telemetry'
  },
  {
    lat: 19.076,
    lng: 72.8777,
    name: 'Mumbai Coastal Oceanographic Station',
    category: 'Observation Hub',
    color: '#00d1ff',
    radius: 0.75,
    altitude: 0.03,
    metric: 'Sea Level Surge: +3.2mm/yr',
    status: 'Tide Gauge Active'
  },
  {
    lat: 23.85,
    lng: 69.8,
    name: 'Khavda Mega Renewable Park (Gujarat)',
    category: 'Clean Energy Park',
    color: '#05e777',
    radius: 0.85,
    altitude: 0.04,
    metric: '30 GW Clean Capacity',
    status: 'Operational Super-Grid'
  },
  {
    lat: 14.1,
    lng: 77.2,
    name: 'Pavagada Ultra Mega Solar Park (Karnataka)',
    category: 'Clean Energy Park',
    color: '#05e777',
    radius: 0.8,
    altitude: 0.035,
    metric: '2,050 MW Solar Output',
    status: 'Grid Synced'
  },
  {
    lat: 28.218,
    lng: 94.7278,
    name: 'Siang River Hydrological Post (Arunachal)',
    category: 'Observation Hub',
    color: '#00e5ff',
    radius: 0.7,
    altitude: 0.04,
    metric: 'Catchment Flow: Peak Normal',
    status: 'Eastern Frontier Sentinel'
  },
  {
    lat: 78.2232,
    lng: 15.6267,
    name: 'Svalbard Arctic Cryosphere Station',
    category: 'Glacial Monitor',
    color: '#00e5ff',
    radius: 0.9,
    altitude: 0.05,
    metric: 'Arctic Amplification: +3.8°C',
    status: 'Circumpolar Baseline'
  },
  {
    lat: 19.5362,
    lng: -155.5763,
    name: 'Mauna Loa Atmospheric Observatory (Hawaii)',
    category: 'Observation Hub',
    color: '#ffb703',
    radius: 0.85,
    altitude: 0.045,
    metric: 'CO2 Concentration: 426.8 ppm',
    status: 'Global Benchmark'
  },
  {
    lat: -3.4653,
    lng: -62.2159,
    name: 'Amazon Rainforest Biome Tower (ATTO)',
    category: 'Observation Hub',
    color: '#05e777',
    radius: 0.85,
    altitude: 0.04,
    metric: 'Carbon Sink Stability: Monitored',
    status: 'Tower Height 325m'
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    name: 'Tokyo Bay Meteorological Supercenter',
    category: 'Megacity Vulnerability',
    color: '#00d1ff',
    radius: 0.75,
    altitude: 0.03,
    metric: 'Pacific Typhoon Shield Active',
    status: 'Full Doppler Sync'
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    name: 'Met Office Climate Informatics (London/Exeter)',
    category: 'Observation Hub',
    color: '#70d6ff',
    radius: 0.7,
    altitude: 0.03,
    metric: 'North Atlantic Oscillation Index',
    status: 'Global Modeling Node'
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    name: 'Sydney Coral & Coastal Sentinel',
    category: 'Observation Hub',
    color: '#ff70a6',
    radius: 0.7,
    altitude: 0.03,
    metric: 'Great Barrier Reef Thermal Stress',
    status: 'Satellite Ground Truth'
  }
];

// 2. Active Climate Anomaly Rings (Pulsing live ripples)
export const GLOBE_ACTIVE_RINGS: GlobeRing[] = [
  {
    lat: 35.5,
    lng: 76.8,
    name: 'Karakoram Siachen Cryosphere Pulse',
    type: 'Glacial Surge',
    maxR: 3.5,
    propagationSpeed: 1.5,
    repeatPeriod: 1400,
    color: '#00e5ff'
  },
  {
    lat: 27.5,
    lng: 73.0,
    name: 'Thar Desert Summer Thermal Ridge',
    type: 'Heatwave Anomaly',
    maxR: 4.8,
    propagationSpeed: 2.0,
    repeatPeriod: 1800,
    color: '#ff5533'
  },
  {
    lat: 14.5,
    lng: 86.0,
    name: 'Bay of Bengal Tropical Low Depression',
    type: 'Cyclonic Depression',
    maxR: 5.5,
    propagationSpeed: 2.2,
    repeatPeriod: 1600,
    color: '#00d1ff'
  },
  {
    lat: 28.6,
    lng: 77.2,
    name: 'Indo-Gangetic Particulate Trapping',
    type: 'Particulate Trapping',
    maxR: 3.8,
    propagationSpeed: 1.2,
    repeatPeriod: 2200,
    color: '#ffaa00'
  },
  {
    lat: 72.0,
    lng: -40.0,
    name: 'Greenland Ice Sheet Summer Melt Anomaly',
    type: 'Glacial Surge',
    maxR: 6.0,
    propagationSpeed: 1.8,
    repeatPeriod: 2000,
    color: '#70d6ff'
  },
  {
    lat: -5.0,
    lng: -60.0,
    name: 'Amazon Dry-Season Moisture Deficit',
    type: 'Heatwave Anomaly',
    maxR: 5.0,
    propagationSpeed: 1.5,
    repeatPeriod: 2400,
    color: '#ff9e00'
  }
];

// 3. 3D Climate Atmospheric Moisture & Flow Arcs
export const GLOBE_FLOW_ARCS: GlobeArc[] = [
  {
    startLat: 5.0,
    startLng: 65.0,
    endLat: 15.0,
    endLng: 74.5,
    name: 'Arabian Sea Monsoon Low-Level Jet (Findlater Jet)',
    type: 'Monsoon Moisture Flow',
    color: ['#00e5ff', '#0077b6'],
    stroke: 1.4
  },
  {
    startLat: 8.0,
    startLng: 88.0,
    endLat: 26.5,
    endLng: 92.5,
    name: 'Bay of Bengal Northeast Moisture Highway',
    type: 'Monsoon Moisture Flow',
    color: ['#00b4d8', '#05e777'],
    stroke: 1.4
  },
  {
    startLat: 23.85,
    startLng: 69.8,
    endLat: 28.61,
    endLng: 77.2,
    name: 'Khavda Clean Power Transmission Corridor',
    type: 'Clean Tech Corridor',
    color: ['#05e777', '#00e5ff'],
    stroke: 1.2
  },
  {
    startLat: 14.1,
    startLng: 77.2,
    endLat: 12.97,
    endLng: 77.59,
    name: 'Pavagada Clean Grid Wheeling to Bengaluru',
    type: 'Clean Tech Corridor',
    color: ['#05e777', '#70d6ff'],
    stroke: 1.2
  },
  {
    startLat: 19.5,
    startLng: -155.5,
    endLat: 28.61,
    endLng: 77.2,
    name: 'WMO Global Atmospheric Telemetry Sync',
    type: 'Atmospheric Jet Stream',
    color: ['#ffd166', '#00e5ff'],
    stroke: 0.9
  },
  {
    startLat: 51.5,
    startLng: -0.12,
    endLat: 28.61,
    endLng: 77.2,
    name: 'Copernicus & IMD Real-Time Modeling Relay',
    type: 'Clean Tech Corridor',
    color: ['#70d6ff', '#00e5ff'],
    stroke: 0.9
  },
  {
    startLat: 35.6,
    startLng: 139.6,
    endLat: 19.07,
    endLng: 72.87,
    name: 'Pan-Asian Cyclone Early Warning Telemetry',
    type: 'Atmospheric Jet Stream',
    color: ['#ff70a6', '#00d1ff'],
    stroke: 0.9
  }
];

// 4. Strategic HUD 3D Floating Labels
export const GLOBE_HUD_LABELS: GlobeLabel[] = [
  { lat: 28.61, lng: 77.2, text: 'New Delhi (IMD Met HQ)', size: 1.1, color: '#00e5ff', subtext: 'SOI Sovereign Center' },
  { lat: 34.15, lng: 77.58, text: 'Leh (Ladakh Cryosphere)', size: 1.0, color: '#00e5ff', subtext: 'Himalayan Glacial Hub' },
  { lat: 28.22, lng: 94.73, text: 'Arunachal Pradesh (Siang)', size: 1.0, color: '#00e5ff', subtext: 'Eastern Sovereign Frontier' },
  { lat: 19.08, lng: 72.88, text: 'Mumbai (Oceanographic)', size: 1.0, color: '#00e5ff', subtext: 'Western Seaboard Sentinel' },
  { lat: 13.08, lng: 80.27, text: 'Chennai (Coromandel Coast)', size: 0.95, color: '#00e5ff', subtext: 'Bay of Bengal Radar' },
  { lat: 51.51, lng: -0.13, text: 'London (Met Office)', size: 0.9, color: '#ffffff', subtext: 'Global Reference 0°' },
  { lat: 38.89, lng: -77.03, text: 'Washington D.C. (NOAA HQ)', size: 0.9, color: '#ffffff', subtext: 'Satellite Constellation' },
  { lat: 35.68, lng: 139.65, text: 'Tokyo (JMA Center)', size: 0.9, color: '#ffffff', subtext: 'Pacific Radar Grid' },
  { lat: -3.46, lng: -62.22, text: 'Amazon ATTO Tower', size: 0.9, color: '#05e777', subtext: 'Biosphere Canopy' },
  { lat: 78.22, lng: 15.63, text: 'Svalbard Arctic Sentinel', size: 0.9, color: '#70d6ff', subtext: 'Polar Core Archive' }
];
