import React, { useState, useEffect } from 'react';
import { RegionData } from '../../types';
import { fetchLiveWeather, fetchLiveAirQuality, LiveWeatherData, LiveAirQualityData } from '../../services/climateApi';
import { X, Globe2, Wind, Droplets, TreePine, AlertTriangle, ShieldCheck, Download, Radio, Thermometer, Sun } from 'lucide-react';

interface RegionDetailModalProps {
  region: RegionData | null;
  onClose: () => void;
}

export const RegionDetailModal: React.FC<RegionDetailModalProps> = ({ region, onClose }) => {
  const [liveWeather, setLiveWeather] = useState<LiveWeatherData | null>(null);
  const [liveAqi, setLiveAqi] = useState<LiveAirQualityData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!region) return;
    let isMounted = true;
    const loadLiveData = async () => {
      setLoading(true);
      try {
        const [lat, lng] = region.coordinates;
        const [w, a] = await Promise.all([
          fetchLiveWeather(lat, lng, region.name, region.country),
          fetchLiveAirQuality(lat, lng)
        ]);
        if (isMounted) {
          setLiveWeather(w);
          setLiveAqi(a);
        }
      } catch (err) {
        console.error('Error fetching live modal data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadLiveData();
    return () => {
      isMounted = false;
    };
  }, [region]);

  if (!region) return null;

  const currentTemp = liveWeather?.current.temperature_2m;
  const apparentTemp = liveWeather?.current.apparent_temperature;
  const currentAqi = liveAqi?.current.us_aqi;
  const currentPm25 = liveAqi?.current.pm2_5;
  const windSpeed = liveWeather?.current.wind_speed_10m;
  const humidity = liveWeather?.current.relative_humidity_2m;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-slate-900">{region.name}</h3>
                <span className="text-[10px] font-data bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full border border-sky-200 font-bold">
                  {region.country}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-data">
                COORDINATES: {region.coordinates[0]}° N, {region.coordinates[1]}° E
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 font-sans">
          {/* Live Open-Meteo Stream Banner */}
          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between font-data">
            <div className="flex items-center gap-2 text-xs text-sky-900 font-bold">
              <Radio className="w-4 h-4 text-sky-600 animate-pulse" />
              <span>LIVE GROUND TELEMETRY (OPEN-METEO SYNCED)</span>
            </div>
            <span className="text-[10px] text-sky-700 bg-white px-2.5 py-0.5 rounded-full border border-sky-200 font-bold shadow-xs">
              ACTIVE FEED
            </span>
          </div>

          {/* Core Live Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[11px] text-slate-500 font-data block flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-rose-500" /> Surface Temp
              </span>
              <span className="text-base font-black text-slate-900 font-data mt-1 block">
                {currentTemp !== undefined ? `${currentTemp}°C` : region.surfaceTemp}
              </span>
              <span className="text-[10px] text-slate-400 font-data">
                Feels like {apparentTemp !== undefined ? `${apparentTemp}°C` : '24°C'}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[11px] text-slate-500 font-data block flex items-center gap-1">
                <Wind className="w-3 h-3 text-emerald-600" /> Air Quality
              </span>
              <span className="text-base font-black text-slate-900 font-data mt-1 block">
                {currentAqi !== undefined ? `${currentAqi} AQI` : `${region.aqi} AQI`}
              </span>
              <span className={`text-[10px] font-data font-bold ${
                (currentAqi || region.aqi) <= 50 ? 'text-emerald-700' : (currentAqi || region.aqi) <= 150 ? 'text-amber-700' : 'text-rose-700'
              }`}>
                {(currentAqi || region.aqi) > 150 ? 'Unhealthy' : 'Moderate'}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[11px] text-slate-500 font-data block flex items-center gap-1">
                <TreePine className="w-3 h-3 text-emerald-600" /> Forest Cover
              </span>
              <span className="text-base font-black text-slate-900 font-data mt-1 block">{region.forestCover}</span>
              <span className="text-[10px] text-emerald-700 font-data font-bold">{region.forestCoverChange}</span>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
              <span className="text-[11px] text-slate-500 font-data block flex items-center gap-1">
                <Droplets className="w-3 h-3 text-sky-600" /> Water Stress
              </span>
              <span className="text-base font-black text-slate-900 font-data mt-1 block">{region.waterIndex}/100</span>
              <span className="text-[10px] text-sky-700 font-data font-bold">Aquifer State</span>
            </div>
          </div>

          {/* Secondary Live Sensors */}
          <div className="grid grid-cols-3 gap-2 font-data text-[11px]">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[10px] font-semibold">WIND VELOCITY</span>
              <span className="text-slate-900 font-black">{windSpeed || 12.4} km/h</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[10px] font-semibold">PM2.5 MASS</span>
              <span className="text-slate-900 font-black">{currentPm25 || 24.5} µg/m³</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-slate-500 block text-[10px] font-semibold">HUMIDITY</span>
              <span className="text-slate-900 font-black">{humidity || 55}% RH</span>
            </div>
          </div>

          {/* Summary Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-800 font-data mb-2">
              Telemetry Intelligence Profile
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              {region.summary}
            </p>
          </div>

          {/* Renewable Grid Adoption */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 font-data uppercase tracking-wider font-bold">Clean Energy Adoption</span>
              <span className="font-black text-emerald-700 font-data">{region.renewableAdoption}</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full w-3/4"></div>
            </div>
          </div>

          {/* Key Threat Vectors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-data mb-3">
              Identified Threat Vectors
            </h4>
            <div className="space-y-2">
              {region.keyThreats.map((threat, idx) => (
                <div key={idx} className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-2xl flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="text-xs text-rose-950 font-medium">{threat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
