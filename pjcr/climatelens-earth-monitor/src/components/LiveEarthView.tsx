import React, { useState, useEffect } from 'react';
import { EarthGlobe3D } from './EarthGlobe3D';
import { REGIONS_DATA, HISTORICAL_TIMELINE } from '../data/climateData';
import { RegionData } from '../types';
import {
  fetchLiveWeather,
  fetchLiveAirQuality,
  LiveWeatherData,
  LiveAirQualityData
} from '../services/climateApi';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Layers,
  Thermometer,
  CloudRain,
  Wind,
  Activity,
  Flame,
  Globe2,
  Sliders,
  Radio,
  Eye,
  ChevronRight,
  MapPin,
  X,
  Sun,
  Compass,
  ShieldCheck
} from 'lucide-react';

interface LiveEarthViewProps {
  onSelectRegion: (region: RegionData) => void;
  onOpenReportModal: () => void;
}

export const LiveEarthView: React.FC<LiveEarthViewProps> = ({
  onSelectRegion,
  onOpenReportModal
}) => {
  const [selectedLayer, setSelectedLayer] = useState('Temperature');
  const [displaySettings, setDisplaySettings] = useState({
    atmosphere: true,
    clouds: true,
    nightLights: false
  });
  const [selectedRegion, setSelectedRegion] = useState<RegionData>(REGIONS_DATA[0]); // Brazil default
  const [timelineIndex, setTimelineIndex] = useState(6); // 2024
  const [isPlaying, setIsPlaying] = useState(false);

  const [liveWeather, setLiveWeather] = useState<LiveWeatherData | null>(null);
  const [liveAqi, setLiveAqi] = useState<LiveAirQualityData | null>(null);
  const [isLoadingTelemetry, setIsLoadingTelemetry] = useState(false);

  const currentTimeline = HISTORICAL_TIMELINE[timelineIndex];

  // Fetch live telemetry whenever selected region changes
  useEffect(() => {
    let isMounted = true;
    const fetchRegionData = async () => {
      setIsLoadingTelemetry(true);
      try {
        const [lat, lng] = selectedRegion.coordinates;
        const [weather, aqi] = await Promise.all([
          fetchLiveWeather(lat, lng, selectedRegion.name, selectedRegion.country),
          fetchLiveAirQuality(lat, lng)
        ]);
        if (isMounted) {
          setLiveWeather(weather);
          setLiveAqi(aqi);
        }
      } catch (err) {
        console.error('Failed to load telemetry:', err);
      } finally {
        if (isMounted) setIsLoadingTelemetry(false);
      }
    };
    fetchRegionData();
    return () => {
      isMounted = false;
    };
  }, [selectedRegion]);

  // Auto-play timeline simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimelineIndex((prev) => {
          if (prev >= HISTORICAL_TIMELINE.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const globalMetricLayers = [
    { id: 'Political', label: 'Political Map (SOI)', icon: ShieldCheck, color: 'text-[#00e5ff]' },
    { id: 'Temperature', label: 'Thermal Heatmap', icon: Thermometer, color: 'text-red-400' },
    { id: 'CO2 Emissions', label: 'CO2 & Emissions', icon: Flame, color: 'text-yellow-400' },
    { id: 'Rainfall', label: 'Precipitation Radar', icon: CloudRain, color: 'text-blue-400' },
    { id: 'Wind Patterns', label: 'Wind Jet Stream', icon: Wind, color: 'text-emerald-400' },
    { id: 'AQI Index', label: 'Air Quality (AQI)', icon: Activity, color: 'text-orange-400' },
    { id: 'Natural', label: 'Natural Satellite', icon: Globe2, color: 'text-cyan-400' }
  ];

  const handleGlobeRegionSelect = (region: RegionData) => {
    setSelectedRegion(region);
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] rounded-3xl overflow-hidden glass-panel border border-slate-200/90 flex flex-col justify-between p-4 md:p-6 animate-fadeIn shadow-sm bg-slate-50">
      {/* 3D WebGL Earth Background */}
      <div className="absolute inset-0 z-0">
        <EarthGlobe3D
          selectedLayer={selectedLayer}
          displaySettings={displaySettings}
          simulationYear={currentTimeline.year}
          onSelectRegion={handleGlobeRegionSelect}
          selectedRegionId={selectedRegion.id}
          className="w-full h-full"
          showClickTelemetry={true}
        />
      </div>

      {/* Top Floating Row: Global Metrics Selector + Location Search & Display Settings */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start gap-4 pointer-events-none">
        {/* Left: Global Metrics Filter */}
        <div className="glass-panel p-4 rounded-3xl border border-slate-200/90 space-y-2 pointer-events-auto max-w-lg w-full sm:w-auto bg-white/95 shadow-sm">
          <span className="text-[10px] font-data text-slate-500 uppercase tracking-widest block font-bold">
            Planetary Map Layer Variation
          </span>
          <div className="flex flex-wrap gap-1.5">
            {globalMetricLayers.map((layer) => {
              const Icon = layer.icon;
              const isActive = selectedLayer === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{layer.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Display Settings Toggles */}
        <div className="flex flex-wrap items-center gap-3 pointer-events-auto">
          <div className="glass-panel px-4 py-2.5 rounded-2xl border border-slate-200 flex items-center gap-4 text-xs font-semibold bg-white/95 shadow-xs">
            <span className="text-[10px] font-data text-slate-500 uppercase tracking-widest hidden sm:inline font-bold">
              Display
            </span>
            <label className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 cursor-pointer">
              <input
                type="checkbox"
                checked={displaySettings.atmosphere}
                onChange={(e) => setDisplaySettings({ ...displaySettings, atmosphere: e.target.checked })}
                className="accent-sky-600 rounded"
              />
              <span>Atmosphere</span>
            </label>
            <label className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 cursor-pointer">
              <input
                type="checkbox"
                checked={displaySettings.clouds}
                onChange={(e) => setDisplaySettings({ ...displaySettings, clouds: e.target.checked })}
                className="accent-sky-600 rounded"
              />
              <span>Clouds</span>
            </label>
            <label className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 cursor-pointer">
              <input
                type="checkbox"
                checked={displaySettings.nightLights}
                onChange={(e) => setDisplaySettings({ ...displaySettings, nightLights: e.target.checked })}
                className="accent-sky-600 rounded"
              />
              <span>Night Lights</span>
            </label>
          </div>

          {/* System Status Pill */}
          <div className="glass-panel px-3.5 py-2.5 rounded-2xl border border-slate-200 font-data text-xs flex items-center gap-3 bg-white/95 shadow-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-800 font-bold">API: OPEN-METEO LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle/Bottom Floating Row: Region Inspector Card (Left) & Controls */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 items-end mt-16 sm:mt-24 pointer-events-none">
        {/* Left Inspector Card: Selected Region with Live API Data */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-3xl border border-slate-200/90 space-y-3.5 pointer-events-auto bg-white/95 shadow-sm">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-data text-slate-500 uppercase tracking-widest block font-semibold">
                  Location Atmospheric Telemetry
                </span>
                <h3 className="font-extrabold text-base text-slate-900">{selectedRegion.name}</h3>
                <span className="text-xs text-slate-500 font-medium">{selectedRegion.country}</span>
              </div>
            </div>
            <select
              value={selectedRegion.id}
              onChange={(e) => {
                const found = REGIONS_DATA.find((r) => r.id === e.target.value);
                if (found) setSelectedRegion(found);
              }}
              className="bg-slate-50 border border-slate-200 text-xs text-sky-700 font-bold px-3 py-1.5 rounded-xl font-data focus:outline-none cursor-pointer"
            >
              {REGIONS_DATA.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Real-Time Metrics from Open-Meteo */}
          <div className="grid grid-cols-2 gap-2 text-xs font-data">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-500 block flex items-center gap-1 font-medium">
                <Thermometer className="w-3 h-3 text-rose-500" /> Live Surface Temp
              </span>
              <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
                {liveWeather ? `${liveWeather.current.temperature_2m}°C` : selectedRegion.surfaceTemp}
              </span>
              <span className="text-[10px] text-slate-500">
                Feels like {liveWeather?.current.apparent_temperature || 24}°C
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-500 block flex items-center gap-1 font-medium">
                <Activity className="w-3 h-3 text-emerald-600" /> Air Quality (AQI)
              </span>
              <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
                {liveAqi ? `${liveAqi.current.us_aqi} AQI` : `${selectedRegion.aqi} AQI`}
              </span>
              <span className={`text-[10px] font-semibold ${
                (liveAqi?.current.us_aqi || 50) > 150 ? 'text-rose-600' : 'text-emerald-700'
              }`}>
                {(liveAqi?.current.us_aqi || 50) > 150 ? 'High Pollution' : 'Moderate / Good'}
              </span>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-500 block flex items-center gap-1 font-medium">
                <Wind className="w-3 h-3 text-teal-600" /> Wind Velocity
              </span>
              <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
                {liveWeather ? `${liveWeather.current.wind_speed_10m} km/h` : '12.4 km/h'}
              </span>
              <span className="text-[10px] text-teal-700 font-semibold">Ground sensor</span>
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 shadow-2xs">
              <span className="text-[10px] text-slate-500 block flex items-center gap-1 font-medium">
                <Sun className="w-3 h-3 text-amber-500" /> Solar / UV Index
              </span>
              <span className="text-sm font-extrabold text-slate-900 block mt-0.5">
                {liveWeather ? `${liveWeather.current.uv_index} / 12` : '5.2 / 12'}
              </span>
              <span className="text-[10px] text-sky-700 font-semibold">Atmospheric flux</span>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
            {selectedRegion.summary}
          </p>

          <button
            onClick={() => onSelectRegion(selectedRegion)}
            className="w-full py-2.5 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
          >
            <span>View Detailed Vulnerability Profile</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right/Bottom: Timeline Simulation Slider */}
        <div className="lg:col-span-8 glass-panel p-5 rounded-3xl border border-slate-200/90 space-y-3 pointer-events-auto bg-white/95 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-2xl bg-sky-600 text-white flex items-center justify-center hover:bg-sky-700 transition-all shadow-xs cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <div>
                <span className="text-[10px] font-data text-slate-500 uppercase tracking-widest block font-bold">
                  Climate Timeline Simulation
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold font-data text-slate-900">
                    Year {currentTimeline.year}
                  </span>
                  <span className="text-xs text-slate-500 font-data font-semibold">
                    CO2: {currentTimeline.co2} ppm // Anomaly: {currentTimeline.tempAnomaly > 0 ? `+${currentTimeline.tempAnomaly}` : currentTimeline.tempAnomaly}°C
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setTimelineIndex(0);
                setIsPlaying(false);
              }}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
              title="Reset Timeline"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline Slider */}
          <div className="space-y-2 pt-1">
            <input
              type="range"
              min="0"
              max={HISTORICAL_TIMELINE.length - 1}
              value={timelineIndex}
              onChange={(e) => {
                setTimelineIndex(parseInt(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
            />
            <div className="flex justify-between text-[11px] font-data text-slate-500 font-medium">
              {HISTORICAL_TIMELINE.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTimelineIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`hover:text-slate-900 transition-colors cursor-pointer ${
                    timelineIndex === idx ? 'text-sky-700 font-bold underline' : ''
                  }`}
                >
                  {item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Milestone Event Description */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
            <span className="text-sky-800 font-bold font-data shrink-0">Historical Milestone:</span>
            <span className="truncate">{currentTimeline.event}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
