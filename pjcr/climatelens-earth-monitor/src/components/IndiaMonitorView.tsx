import React, { useState, useEffect, useMemo } from 'react';
import {
  ALL_INDIAN_STATES_AND_UTS,
  IndianStatePoliticalData,
  FREE_POLITICAL_MAP_PROVIDERS
} from '../services/politicalMapService';
import {
  NATIONAL_ICED_METRICS,
  ALL_STATES_ICED_DATA,
  StateIcedData,
  getStateIcedProfile,
  getSeciCategoryColor
} from '../services/nitiIcedService';
import {
  Thermometer,
  CloudRain,
  Activity,
  TreePine,
  Droplets,
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  MapPin,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Radio,
  RefreshCw,
  ShieldCheck,
  Zap,
  Wind,
  Search,
  Layers,
  Globe2,
  Filter,
  Info,
  CheckCircle2,
  Compass,
  Sun,
  Award,
  BarChart3,
  BatteryCharging,
  Gauge,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  fetchLiveWeather,
  fetchLiveAirQuality,
  LiveWeatherData,
  LiveAirQualityData
} from '../services/climateApi';
import { IndianVectorMap, IndiaMapLayer } from './IndianVectorMap';

type IndicatorType = 'SECI' | 'CleanEnergy' | 'Temp' | 'Rainfall' | 'AQI' | 'Forest' | 'Water';
type ZoneFilter =
  | 'All'
  | 'Front Runners (NITI)'
  | 'Achievers (NITI)'
  | 'Aspirants (NITI)'
  | 'Northern Cryosphere'
  | 'Western Arid'
  | 'Central Heartland'
  | 'Gangetic Plain'
  | 'Eastern Deltas'
  | 'Southern Peninsular'
  | 'North-Eastern Frontier'
  | 'Island Territory';

export const IndiaMonitorView: React.FC = () => {
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorType>('SECI');
  const [selectedStateId, setSelectedStateId] = useState<string>('gujarat');
  const [activeMapLayer, setActiveMapLayer] = useState<IndiaMapLayer>('seci');
  const [selectedZone, setSelectedZone] = useState<ZoneFilter>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSoiDetails, setShowSoiDetails] = useState<boolean>(false);
  const [liveWeather, setLiveWeather] = useState<LiveWeatherData | null>(null);
  const [liveAqi, setLiveAqi] = useState<LiveAirQualityData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [liveWeatherMap, setLiveWeatherMap] = useState<Record<string, LiveWeatherData>>({});
  const [liveAqiMap, setLiveAqiMap] = useState<Record<string, LiveAirQualityData>>({});

  // Find currently selected state
  const currentState: IndianStatePoliticalData = useMemo(() => {
    return ALL_INDIAN_STATES_AND_UTS.find((s) => s.id === selectedStateId) || ALL_INDIAN_STATES_AND_UTS[0];
  }, [selectedStateId]);

  // Current State NITI ICED profile
  const currentIcedProfile: StateIcedData | undefined = useMemo(() => {
    return getStateIcedProfile(selectedStateId);
  }, [selectedStateId]);

  // Filtered state list based on Zone/Category and Search Query
  const filteredStates = useMemo(() => {
    return ALL_INDIAN_STATES_AND_UTS.filter((state) => {
      const iced = ALL_STATES_ICED_DATA.find((i) => i.id === state.id);
      let matchesZone = true;
      if (selectedZone === 'Front Runners (NITI)') {
        matchesZone = iced?.seciCategory === 'Front Runner';
      } else if (selectedZone === 'Achievers (NITI)') {
        matchesZone = iced?.seciCategory === 'Achiever';
      } else if (selectedZone === 'Aspirants (NITI)') {
        matchesZone = iced?.seciCategory === 'Aspirant';
      } else if (selectedZone !== 'All') {
        matchesZone = state.zone === selectedZone;
      }

      const matchesSearch =
        state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.stateCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.climateZone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (iced?.keyInitiative && iced.keyInitiative.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesZone && matchesSearch;
    });
  }, [selectedZone, searchQuery]);

  // Fetch real-time telemetry from Open-Meteo for the selected state coordinates
  useEffect(() => {
    let isMounted = true;
    const fetchStateTelemetry = async () => {
      setIsLoading(true);
      try {
        const [lat, lng] = currentState.coordinates;
        const [w, a] = await Promise.all([
          fetchLiveWeather(lat, lng, currentState.name, 'India'),
          fetchLiveAirQuality(lat, lng)
        ]);
        if (isMounted) {
          setLiveWeather(w);
          setLiveAqi(a);
          setLiveWeatherMap((prev) => ({ ...prev, [currentState.id]: w }));
          setLiveAqiMap((prev) => ({ ...prev, [currentState.id]: a }));
        }
      } catch (err) {
        console.error('Error fetching state live data:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchStateTelemetry();
    return () => {
      isMounted = false;
    };
  }, [currentState]);

  const indicators = [
    { id: 'SECI', label: 'NITI Aayog SECI Score', icon: Award, color: '#00e5ff' },
    { id: 'CleanEnergy', label: 'Clean Energy Grid %', icon: Zap, color: '#38bdf8' },
    { id: 'Temp', label: 'Temperature Anomaly', icon: Thermometer, color: '#ff6b6b' },
    { id: 'Rainfall', label: 'Monsoon & Rainfall', icon: CloudRain, color: '#00d1ff' },
    { id: 'AQI', label: 'Air Quality (AQI)', icon: Activity, color: '#f59e0b' },
    { id: 'Forest', label: 'ISFR Forest Canopy %', icon: TreePine, color: '#10b981' },
    { id: 'Water', label: 'Aquifer / Water Index', icon: Droplets, color: '#6366f1' }
  ];

  const zones: ZoneFilter[] = [
    'All',
    'Front Runners (NITI)',
    'Achievers (NITI)',
    'Aspirants (NITI)',
    'Northern Cryosphere',
    'Western Arid',
    'Gangetic Plain',
    'Central Heartland',
    'Eastern Deltas',
    'Southern Peninsular',
    'North-Eastern Frontier',
    'Island Territory'
  ];

  // Helper function to return indicator display value for any state
  const getStateIndicatorValue = (state: IndianStatePoliticalData) => {
    const iced = ALL_STATES_ICED_DATA.find((i) => i.id === state.id);
    switch (selectedIndicator) {
      case 'SECI':
        return iced ? `#${iced.seciRank} (${iced.seciScore})` : 'N/A';
      case 'CleanEnergy':
        return iced ? `${iced.nonFossilSharePct}% Non-Fossil` : state.cleanEnergyShare.split(' ')[0];
      case 'Temp':
        return state.tempAnomaly;
      case 'Rainfall':
        return state.monsoonTrend.length > 16 ? state.monsoonTrend.slice(0, 16) + '…' : state.monsoonTrend;
      case 'AQI':
        return `AQI ${state.aqiBaseline}`;
      case 'Forest':
        return state.forestCanopyPct;
      case 'Water':
        return `${state.waterIndexValue}/100`;
      default:
        return state.surfaceTemp;
    }
  };

  const currentCategoryBadge = currentIcedProfile
    ? getSeciCategoryColor(currentIcedProfile.seciCategory)
    : { badgeBg: 'bg-slate-100', badgeText: 'text-slate-700', badgeBorder: 'border-slate-200', accentHex: '#0284c7' };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Sovereign & Compliance Header with NITI ICED Inspiration */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-white/95 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200 shadow-2xs">
              <Compass className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              India Climate &amp; Energy Dashboard (ICED 3.0 Standard)
            </h2>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
              Survey of India (SOI) &bull; NITI Aayog SECI
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed font-normal">
            Sub-continental climate intelligence, energy transition telemetry, and official sovereign cartography across all 28 States and 8 Union Territories — delineating the complete Northern Crown (UT Ladakh with Gilgit-Baltistan, Siachen Glacier, and Aksai Chin), Jammu &amp; Kashmir, Arunachal Pradesh along the McMahon Line, and Island archipelagos down to Indira Point (6°45'N).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowSoiDetails(!showSoiDetails)}
            className="px-4 py-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs font-bold flex items-center gap-2 text-sky-800 transition-all cursor-pointer shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>SOI &amp; MEA Compliance</span>
          </button>
          <div className="bg-slate-100 px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-data flex items-center gap-2 text-slate-800 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold">OPEN-METEO 24/7 LIVE INGEST</span>
          </div>
        </div>
      </div>

      {/* SOI Boundary Verification Modal / Banner */}
      {showSoiDetails && (
        <div className="p-6 rounded-3xl border border-sky-200 bg-sky-50/90 backdrop-blur-md space-y-3 animate-fadeIn shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-900">Survey of India (SOI) &amp; MEA Sovereign Cartographic Compliance</h3>
            </div>
            <button
              onClick={() => setShowSoiDetails(false)}
              className="text-xs text-slate-500 hover:text-slate-900 px-3 py-1 bg-white rounded-xl border border-slate-200 cursor-pointer shadow-2xs font-semibold"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 pt-1">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
              <span className="font-bold text-sky-800 block text-xs">1. Northern Sovereign Crown</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Depicts the entire Union Territory of Ladakh (including Gilgit, Baltistan, Siachen Glacier, Saltoro Ridge, Karakoram Pass, and the Aksai Chin plateau) and the Union Territory of Jammu &amp; Kashmir as integral parts of India.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
              <span className="font-bold text-sky-800 block text-xs">2. Eastern Sovereign Frontier</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Complete representation of the State of Arunachal Pradesh along the McMahon Line, spanning from Tawang in the west to Kibithu and Dong valley at the easternmost trijunction.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-1.5 shadow-2xs">
              <span className="font-bold text-sky-800 block text-xs">3. Coastline &amp; Island Territories</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Precise delimitation of Sir Creek / Kori Creek in Gujarat, the complete 7,516 km peninsular coastline, Lakshadweep archipelago, and Andaman &amp; Nicobar Islands down to Indira Point (6°45'N).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* NITI Aayog ICED 3.0 National Power & Climate KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 font-data space-y-1 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Total Grid Capacity</span>
          <div className="text-xl font-extrabold text-slate-900">446.2 GW</div>
          <span className="text-[9px] text-sky-700 block font-medium">Peak Demand: 250.2 GW</span>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 font-data space-y-1 shadow-xs">
          <span className="text-[10px] text-sky-800 uppercase tracking-wider block font-bold">Non-Fossil Fuel Share</span>
          <div className="text-xl font-extrabold text-sky-700">46.6%</div>
          <span className="text-[9px] text-slate-600 block font-medium">207.7 GW Clean Power</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 font-data space-y-1 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Solar &amp; Wind Capacity</span>
          <div className="text-xl font-extrabold text-amber-600">131.6 GW</div>
          <span className="text-[9px] text-slate-600 block font-medium">Solar: 85.5 GW • Wind: 46.2 GW</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 font-data space-y-1 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Carbon Intensity</span>
          <div className="text-xl font-extrabold text-emerald-600">-33.8%</div>
          <span className="text-[9px] text-slate-600 block font-medium">vs 2005 (Target 45% by 2030)</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 font-data space-y-1 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Electric Vehicles</span>
          <div className="text-xl font-extrabold text-sky-700">3.82 M</div>
          <span className="text-[9px] text-slate-600 block font-medium">12,146 Public Chargers</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 font-data space-y-1 shadow-xs">
          <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">Carbon Sink Stock</span>
          <div className="text-xl font-extrabold text-teal-700">7,204 MT</div>
          <span className="text-[9px] text-slate-600 block font-medium">ISFR Forest Carbon Stock</span>
        </div>
      </div>

      {/* Main Grid: Regional Geospatial View (Left 7 cols) + Region Profiler & State Directory (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Geospatial India Map */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-3xl border border-slate-200/90 space-y-4 flex flex-col justify-between bg-white/95 shadow-sm">
          <div className="space-y-3">
            {/* Top Indicator Switcher Tabs */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 flex-wrap">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide max-w-full">
                {indicators.map((ind) => {
                  const Icon = ind.icon;
                  const isActive = selectedIndicator === ind.id;
                  return (
                    <button
                      key={ind.id}
                      onClick={() => {
                        setSelectedIndicator(ind.id as IndicatorType);
                        if (ind.id === 'SECI') setActiveMapLayer('seci');
                        else if (ind.id === 'CleanEnergy') setActiveMapLayer('renewables');
                        else if (ind.id === 'AQI') setActiveMapLayer('aqi');
                        else if (ind.id === 'Forest') setActiveMapLayer('biospheres');
                        else setActiveMapLayer('states');
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-sky-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{ind.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Map Layer Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  onClick={() => setActiveMapLayer('seci')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                    activeMapLayer === 'seci' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  SECI Score
                </button>
                <button
                  onClick={() => setActiveMapLayer('renewables')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                    activeMapLayer === 'renewables' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Clean Grid
                </button>
                <button
                  onClick={() => setActiveMapLayer('states')}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                    activeMapLayer === 'states' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  States &amp; UTs
                </button>
              </div>
            </div>

            {/* Render Indian Vector Map with SOI Accuracy & ICED layers */}
            <IndianVectorMap
              activeLayer={activeMapLayer}
              selectedStateId={selectedStateId}
              onSelectState={(state) => setSelectedStateId(state.id)}
              indicator={selectedIndicator}
              liveWeatherMap={liveWeatherMap}
              liveAqiMap={liveAqiMap}
              showControls={true}
              heightClass="h-[520px]"
            />
          </div>
        </div>

        {/* Right: Region Profiler & State Directory (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active State Telemetry Card with NITI Aayog SECI Profile */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-200/90 space-y-4 bg-white/95 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-extrabold text-slate-900">{currentState.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                    {currentState.type}
                  </span>
                  {currentIcedProfile && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${currentCategoryBadge.badgeBg} ${currentCategoryBadge.badgeText} border ${currentCategoryBadge.badgeBorder}`}
                    >
                      {currentIcedProfile.seciCategory} &bull; #{currentIcedProfile.seciRank}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  Capital: <strong className="text-slate-900 font-bold">{currentState.capital}</strong> &bull; Area: {currentState.areaSqKm.toLocaleString()} km²
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-sky-700 font-bold">
                  {currentState.coordinates[0].toFixed(2)}°N, {currentState.coordinates[1].toFixed(2)}°E
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">{currentState.zone}</div>
              </div>
            </div>

            {/* NITI Aayog SECI 6-Parameter Performance Grid (if available) */}
            {currentIcedProfile && (
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2.5">
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-sky-100">
                  <span className="font-bold text-sky-900 flex items-center gap-1.5 uppercase font-data text-[11px]">
                    <Award className="w-4 h-4 text-sky-700" />
                    NITI Aayog SECI Index Breakdown
                  </span>
                  <span className="text-xs font-bold font-mono text-slate-900">
                    Score: {currentIcedProfile.seciScore} / 100
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-data">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block font-medium">DISCOM Health</span>
                    <span className="text-slate-900 font-bold text-xs">{currentIcedProfile.parameters.discomPerformance}/100</span>
                    <span className="text-[9px] text-slate-500 block">AT&amp;C Loss: {currentIcedProfile.discomLossPct}%</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block font-medium">Clean Energy Share</span>
                    <span className="text-emerald-700 font-bold text-xs">{currentIcedProfile.nonFossilSharePct}% Non-Fossil</span>
                    <span className="text-[9px] text-slate-500 block">{currentIcedProfile.renewableCapacityMW} MW Clean</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block font-medium">Access &amp; Reliability</span>
                    <span className="text-slate-900 font-bold text-xs">{currentIcedProfile.parameters.accessAffordabilityReliability}/100</span>
                    <span className="text-[9px] text-slate-500 block">{currentIcedProfile.perCapitaKWh} kWh/capita</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <span className="text-slate-500 block font-medium">New Initiatives / EVs</span>
                    <span className="text-sky-700 font-bold text-xs">{currentIcedProfile.evCount.toLocaleString()} EVs</span>
                    <span className="text-[9px] text-slate-500 block">{currentIcedProfile.evChargingStations} Charging Hubs</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 leading-tight">
                  <strong className="text-sky-900">Flagship Energy Project: </strong>
                  {currentIcedProfile.keyInitiative}
                </div>
              </div>
            )}

            {/* Live Open-Meteo Sensor Widget */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-800 font-bold flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
                  <span>Open-Meteo Live Ingest ({currentState.name})</span>
                </span>
                {isLoading ? (
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Syncing...
                  </span>
                ) : (
                  <span className="text-[10px] text-emerald-600 font-bold">Live 2026 Telemetry</span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[10px] text-slate-500 font-medium">Live Temp</div>
                  <div className="text-base font-extrabold text-slate-900 font-mono">
                    {liveWeather ? `${liveWeather.current.temperature_2m}°C` : currentState.surfaceTemp}
                  </div>
                  <div className="text-[9px] text-rose-600 font-semibold">{currentState.tempAnomaly}</div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[10px] text-slate-500 font-medium">Live AQI</div>
                  <div
                    className={`text-base font-extrabold font-mono ${
                      (liveAqi?.current?.us_aqi || currentState.aqiBaseline) > 150 ? 'text-rose-600' : 'text-sky-700'
                    }`}
                  >
                    {liveAqi ? `${liveAqi.current.us_aqi}` : currentState.aqiBaseline}
                  </div>
                  <div className="text-[9px] text-slate-500 font-medium">
                    PM2.5: {liveAqi ? `${liveAqi.current.pm2_5} µg/m³` : 'Baseline'}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="text-[10px] text-slate-500 font-medium">Clean Energy</div>
                  <div className="text-base font-extrabold text-sky-700 font-mono">
                    {currentState.cleanEnergyShare.split(' ')[0]}
                  </div>
                  <div className="text-[9px] text-emerald-700 font-medium">Forest: {currentState.forestCanopyPct}</div>
                </div>
              </div>
            </div>

            {/* Description & Vulnerabilities */}
            <div className="space-y-3 text-xs">
              <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200 font-normal">
                {currentState.description}
              </p>

              <div className="bg-rose-50/70 p-3.5 rounded-2xl border border-rose-100">
                <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Key Climate &amp; Ecological Vulnerabilities
                </span>
                <div className="space-y-1">
                  {currentState.keyVulnerabilities.map((vuln, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                      <span className="text-rose-600 font-bold">&bull;</span>
                      <span>{vuln}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* All 36 States & UTs Directory & Search */}
          <div className="glass-panel p-5 rounded-3xl border border-slate-200/90 space-y-3.5 bg-white/95 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-sky-600" />
                <span>NITI Aayog &amp; State Directory ({filteredStates.length} shown)</span>
              </h4>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search state, initiative, or capital (e.g. Gujarat, Khavda, Ladakh)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors shadow-2xs"
              />
            </div>

            {/* Category / Zone Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-hide text-[10px]">
              {zones.map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3 py-1 rounded-xl whitespace-nowrap transition-all cursor-pointer font-semibold ${
                    selectedZone === zone
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            {/* Scrollable State List */}
            <div className="max-h-[240px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {filteredStates.map((st) => {
                const iced = ALL_STATES_ICED_DATA.find((i) => i.id === st.id);
                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStateId(st.id)}
                    className={`p-3 rounded-2xl flex items-center justify-between text-xs cursor-pointer transition-all ${
                      selectedStateId === st.id
                        ? 'bg-sky-50 border border-sky-300 text-sky-900 shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 text-[10px] font-mono font-bold text-sky-700">{st.stateCode}</span>
                      <span className="font-semibold">{st.name}</span>
                      {iced && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-white text-slate-600 font-mono border border-slate-200 shadow-2xs">
                          Rank #{iced.seciRank}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-semibold text-slate-500">
                        {getStateIndicatorValue(st)}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
