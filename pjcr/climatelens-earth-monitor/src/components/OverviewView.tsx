import React, { useState, useEffect } from 'react';
import { EarthGlobe3D } from './EarthGlobe3D';
import { GLOBAL_KPIS, GLOBAL_CLIMATE_INDICATORS } from '../data/climateData';
import { RegionData } from '../types';
import {
  fetchLiveWeather,
  fetchLiveAirQuality,
  getLiveGlobalClimateSummary,
  PRESET_OBSERVATION_HUBS,
  LiveWeatherData,
  LiveAirQualityData,
  GlobalLiveSummary
} from '../services/climateApi';
import {
  TrendingUp,
  Download,
  AlertTriangle,
  Info,
  Layers,
  Thermometer,
  CloudRain,
  Wind,
  Droplets,
  TreePine,
  Flame,
  ArrowUpRight,
  RefreshCw,
  Radio,
  Globe2,
  Sparkles,
  Activity,
  ShieldCheck
} from 'lucide-react';

interface OverviewViewProps {
  onOpenExport: () => void;
  onSelectRegion: (region: RegionData) => void;
  onSelectLayerTab?: (layer: string) => void;
}

interface HubLiveState {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  weather?: LiveWeatherData;
  aqi?: LiveAirQualityData;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onOpenExport,
  onSelectRegion,
  onSelectLayerTab
}) => {
  const [activeLayer, setActiveLayer] = useState('Political');
  const [hoveredPoint, setHoveredPoint] = useState<{ year: number; temp: number; event: string } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveClimateSummary, setLiveClimateSummary] = useState<GlobalLiveSummary>(getLiveGlobalClimateSummary());
  const [liveHubs, setLiveHubs] = useState<HubLiveState[]>(
    PRESET_OBSERVATION_HUBS.slice(0, 6).map((h) => ({ ...h }))
  );
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());

  const layers = [
    { id: 'Political', label: 'Political Map (SOI)', icon: ShieldCheck },
    { id: 'Temperature', label: 'Thermal Heatmap', icon: Thermometer },
    { id: 'CO2', label: 'CO2 & Emissions', icon: Flame },
    { id: 'Rainfall', label: 'Precipitation Radar', icon: CloudRain },
    { id: 'Air Quality', label: 'Air Quality (AQI)', icon: Wind },
    { id: 'Wind Patterns', label: 'Wind Jet Streams', icon: Activity },
    { id: 'Natural', label: 'Natural Satellite', icon: Globe2 }
  ];

  // Fetch real-time live telemetry for major hubs on mount & refresh
  const loadLiveTelemetry = async () => {
    setIsRefreshing(true);
    setLiveClimateSummary(getLiveGlobalClimateSummary());

    try {
      const updated = await Promise.all(
        PRESET_OBSERVATION_HUBS.slice(0, 6).map(async (hub) => {
          try {
            const [weather, aqi] = await Promise.all([
              fetchLiveWeather(hub.lat, hub.lng, hub.name, hub.country),
              fetchLiveAirQuality(hub.lat, hub.lng)
            ]);
            return { ...hub, weather, aqi };
          } catch {
            return { ...hub };
          }
        })
      );
      setLiveHubs(updated);
      setLastSyncTime(new Date().toLocaleTimeString());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadLiveTelemetry();
    const interval = setInterval(loadLiveTelemetry, 5 * 60 * 1000); // 5 mins
    return () => clearInterval(interval);
  }, []);

  const handleLayerChange = (layerId: string) => {
    setActiveLayer(layerId);
    if (onSelectLayerTab) onSelectLayerTab(layerId);
  };

  // Temperature anomaly chart data
  const tempChartData = [
    { year: 1880, anomaly: -0.16 },
    { year: 1900, anomaly: -0.15 },
    { year: 1920, anomaly: -0.21 },
    { year: 1940, anomaly: +0.08 },
    { year: 1960, anomaly: +0.02 },
    { year: 1980, anomaly: +0.22 },
    { year: 2000, anomaly: +0.58 },
    { year: 2010, anomaly: +0.72 },
    { year: 2015, anomaly: +0.94 },
    { year: 2020, anomaly: +1.02 },
    { year: 2023, anomaly: +1.18 },
    { year: 2024, anomaly: +1.28 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Live Ingest Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/90 border border-sky-200/80 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
          </div>
          <span className="font-data text-xs text-slate-800 font-bold tracking-wide">
            LIVE TELEMETRY INGESTION: Open-Meteo Forecast &amp; NOAA ESRL
          </span>
          <span className="hidden sm:inline-block font-data text-[10px] text-slate-500 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 font-semibold">
            SYNCHRONIZED AT {lastSyncTime}
          </span>
        </div>

        <button
          onClick={loadLiveTelemetry}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold border border-sky-200 transition-all cursor-pointer disabled:opacity-50 shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Syncing APIs...' : 'Refresh Live Feeds'}</span>
        </button>
      </div>

      {/* Top Main Section: 3D Earth Center + Overlay KPIs + Right Status Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center Area (Globe + Floating KPI Cards) */}
        <div className="lg:col-span-8 space-y-4">
          {/* 3D Globe Visualizer Frame */}
          <div className="relative h-[440px] md:h-[500px] rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md border border-slate-200 shadow-md flex flex-col justify-between p-4">
            {/* 3D Earth Component */}
            <div className="absolute inset-0 z-0">
              <EarthGlobe3D
                selectedLayer={activeLayer}
                onSelectRegion={onSelectRegion}
                className="w-full h-full"
                showClickTelemetry={true}
              />
            </div>

            {/* Top Bar inside Globe card: Layer Selectors */}
            <div className="relative z-10 flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/90 shadow-md">
                {layers.map((l) => {
                  const Icon = l.icon;
                  const isActive = activeLayer === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => handleLayerChange(l.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-sky-600 text-white shadow-sm font-bold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{l.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom HUD info inside globe frame */}
            <div className="relative z-10 flex justify-between items-end">
              <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/90 max-w-sm shadow-md">
                <div className="flex items-center gap-2 text-[10px] font-data text-sky-700 font-bold uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Active Layer: {activeLayer}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Interactive 3D WebGL Globe. Click anywhere on the sphere to raycast and query instant live weather &amp; AQI telemetry.
                </p>
              </div>

              <div className="hidden sm:block text-right bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200/90 font-data text-[11px] text-slate-500 shadow-md">
                <div>PROJECTION: EQUIRACTANGULAR / WGS 84</div>
                <div className="text-sky-600 font-semibold">API: OPEN-METEO ACTIVE</div>
              </div>
            </div>
          </div>

          {/* 4 Floating Planetary KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5">
            {/* Global Temperature Anomaly */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-rose-300 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-data">
                  Global Temp Anomaly
                </span>
                <span className="text-[10px] font-data bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 font-semibold">
                  NOAA/NASA
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-1.5">
                <span className="text-2xl font-extrabold font-data tracking-tight text-rose-600">
                  +{liveClimateSummary.globalTempAnomaly}°
                </span>
                <span className="text-sm font-semibold text-slate-400">C</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-rose-500" />
                <span className="truncate">+0.12°C vs last decade</span>
              </div>
            </div>

            {/* Atmospheric CO2 */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-amber-300 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-data">
                  Atmospheric CO₂
                </span>
                <span className="text-[10px] font-data bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 font-semibold">
                  NOAA ESRL
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-1.5">
                <span className="text-2xl font-extrabold font-data tracking-tight text-amber-600">
                  {liveClimateSummary.co2Ppm}
                </span>
                <span className="text-sm font-semibold text-slate-400">ppm</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                <span className="truncate">+{liveClimateSummary.co2ChangePpmPerYear} ppm / yr</span>
              </div>
            </div>

            {/* Ocean Warming Anomaly */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-sky-300 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-data">
                  Ocean Temp Anomaly
                </span>
                <span className="text-[10px] font-data bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 font-semibold">
                  Copernicus
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-1.5">
                <span className="text-2xl font-extrabold font-data tracking-tight text-sky-600">
                  +{liveClimateSummary.oceanTempAnomaly}°
                </span>
                <span className="text-sm font-semibold text-slate-400">C</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                <span className="truncate">Record high sea surface</span>
              </div>
            </div>

            {/* Sea Level Rise */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs relative overflow-hidden group hover:border-teal-300 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-data">
                  Sea Level Rise
                </span>
                <span className="text-[10px] font-data bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200 font-semibold">
                  NASA Altimetry
                </span>
              </div>
              <div className="flex items-baseline gap-1 my-1.5">
                <span className="text-2xl font-extrabold font-data tracking-tight text-teal-600">
                  +{liveClimateSummary.seaLevelRiseMm}
                </span>
                <span className="text-sm font-semibold text-slate-400">mm</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <TrendingUp className="w-3.5 h-3.5 text-teal-500" />
                <span className="truncate">+3.7 mm / year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Panel: Global Climate Status */}
        <div className="lg:col-span-4 bg-white/95 rounded-3xl p-5 border border-slate-200 shadow-sm space-y-5">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                Global Climate Status
              </h3>
              <p className="text-[11px] text-slate-500 font-data">Real-time Earth Observatory</p>
            </div>
            <span className="text-[10px] font-data text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold">
              OPEN-METEO SYNCED
            </span>
          </div>

          {/* Indicators List */}
          <div className="space-y-3">
            {GLOBAL_CLIMATE_INDICATORS.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-sky-300 hover:bg-sky-50/30 transition-all"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-semibold text-slate-800">{item.name}</span>
                  <span className="text-[10px] font-data px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {item.status}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold font-data text-slate-900">{item.value}</span>
                    <span className="text-xs text-slate-500">{item.unit}</span>
                  </div>
                  <span className="text-xs font-data text-slate-500 font-medium">{item.change}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Action: Download Report */}
          <button
            onClick={onOpenExport}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Comprehensive Report</span>
          </button>
        </div>
      </div>

      {/* Real-time Global City Weather & AQI Ticker */}
      <div className="bg-white/95 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-sky-600 animate-pulse" />
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Live Planetary Atmospheric Telemetry
            </h3>
          </div>
          <span className="text-[10px] font-data text-slate-500">
            Source: Open-Meteo WMO Surface Grid (Zero-Latency)
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {liveHubs.map((hub) => {
            const temp = hub.weather?.current.temperature_2m;
            const aqi = hub.aqi?.current.us_aqi;
            return (
              <div
                key={hub.id}
                className="bg-slate-50/90 p-3.5 rounded-2xl border border-slate-200/80 hover:border-sky-300 hover:bg-sky-50/30 transition-all font-data"
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900 text-xs truncate">{hub.name}</span>
                  <span className="text-[9px] text-slate-400 font-semibold">{hub.country}</span>
                </div>

                <div className="flex items-baseline justify-between mt-2">
                  <span className="text-xl font-black text-sky-700">
                    {temp !== undefined ? `${temp}°C` : '--'}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      (aqi || 50) > 150
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : (aqi || 50) > 100
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {aqi !== undefined ? `${aqi} AQI` : '--'}
                  </span>
                </div>

                <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between font-medium">
                  <span>Wind: {hub.weather?.current.wind_speed_10m || 10}km/h</span>
                  <span>{hub.weather?.current.relative_humidity_2m || 50}% RH</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Global Temperature Anomaly (1880-2024) Chart */}
      <div className="bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-900">Global Temperature Anomaly (1880–2024)</h3>
              <span className="text-[11px] font-data text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold">
                +1.28°C CRITICAL
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Deviation from pre-industrial baseline (1850–1900 mean). Grounded with NOAA NCEI and NASA GISTEMP.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-data text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 bg-sky-600"></span>
              <span className="font-medium">Observed Anomaly</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-t border-dashed border-rose-500"></span>
              <span className="font-medium">1.5°C Paris Limit</span>
            </div>
          </div>
        </div>

        {/* SVG Interactive Line Chart */}
        <div className="relative h-64 w-full bg-slate-50/70 rounded-2xl p-4 border border-slate-200/80">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 200" preserveAspectRatio="none">
            {/* Grid Lines */}
            <line x1="0" y1="50" x2="1000" y2="50" stroke="rgba(239, 68, 68, 0.4)" strokeDasharray="6 4" strokeWidth="1.5" />
            <line x1="0" y1="120" x2="1000" y2="120" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" />
            <line x1="0" y1="170" x2="1000" y2="170" stroke="rgba(148, 163, 184, 0.15)" strokeWidth="1" />

            {/* Threshold Label */}
            <text x="10" y="44" fill="#ef4444" fontSize="10" fontFamily="JetBrains Mono" fontWeight="bold">
              +1.5°C CRITICAL PARIS THRESHOLD
            </text>
            <text x="10" y="114" fill="#64748b" fontSize="10" fontFamily="JetBrains Mono">
              0.0°C BASELINE
            </text>

            {/* Area gradient under curve */}
            <defs>
              <linearGradient id="tempGradientLight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Chart Area */}
            <path
              d={`M 0 120 
                  L 0 135 
                  L 142 134 
                  L 285 140 
                  L 428 114 
                  L 571 118 
                  L 714 100 
                  L 857 65 
                  L 928 48 
                  L 970 36 
                  L 1000 30 
                  L 1000 180 
                  L 0 180 Z`}
              fill="url(#tempGradientLight)"
            />

            {/* Chart Line */}
            <path
              d={`M 0 135 
                  L 142 134 
                  L 285 140 
                  L 428 114 
                  L 571 118 
                  L 714 100 
                  L 857 65 
                  L 928 48 
                  L 970 36 
                  L 1000 30`}
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
            />

            {/* Data points */}
            {tempChartData.map((d, i) => {
              const x = (i / (tempChartData.length - 1)) * 1000;
              const y = 120 - d.anomaly * 70;
              return (
                <g key={i} className="cursor-pointer group">
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#ffffff"
                    stroke="#0284c7"
                    strokeWidth="2.5"
                    className="hover:r-6 transition-all"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="transparent"
                    onMouseEnter={() => setHoveredPoint({ year: d.year, temp: d.anomaly, event: `Observed anomaly in ${d.year}` })}
                    onMouseLeave={() => setHoveredPoint(null)}
                  />
                </g>
              );
            })}
          </svg>

          {/* Year labels along bottom */}
          <div className="flex justify-between text-[11px] font-data text-slate-500 pt-2 font-medium">
            <span>1880</span>
            <span>1920</span>
            <span>1960</span>
            <span>1980</span>
            <span>2000</span>
            <span>2020</span>
            <span className="text-sky-600 font-bold">2024</span>
          </div>

          {/* Hover tooltip */}
          {hoveredPoint && (
            <div className="absolute top-6 right-6 bg-white border border-sky-400 p-2.5 rounded-xl shadow-xl font-data text-xs pointer-events-none animate-fadeIn">
              <span className="text-sky-600 font-bold">Year {hoveredPoint.year}:</span>
              <span className="ml-1.5 text-slate-900 font-semibold">{hoveredPoint.temp > 0 ? `+${hoveredPoint.temp}` : hoveredPoint.temp}°C</span>
            </div>
          )}
        </div>

        {/* Explanatory callout: "What does this mean?" */}
        <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80 flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 font-data mb-1">
              What does this mean?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Every 0.1°C of warming amplifies extreme weather events: heatwaves become 2.8x more frequent, heavy precipitation events increase in intensity by 7%, and marine ecosystems face catastrophic coral bleaching. The Paris Agreement sets a target limit of 1.5°C to avoid irreversible ecological tipping points.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
