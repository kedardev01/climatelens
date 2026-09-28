import React, { useState, useEffect } from 'react';
import {
  LEARNING_MODULES,
  VULNERABILITY_MATRICES,
  INITIAL_TELEMETRY_LOGS
} from '../data/climateData';
import { LearningModule, VulnerabilityMatrix, TelemetryLog } from '../types';
import {
  BookOpen,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Flame,
  Droplets,
  HeartPulse,
  Trees,
  DollarSign,
  Activity,
  Zap,
  Users,
  Building2,
  Cpu,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface ClimateViewProps {
  onOpenModule: (module: LearningModule) => void;
}

export const ClimateView: React.FC<ClimateViewProps> = ({ onOpenModule }) => {
  const [climateSubTab, setClimateSubTab] = useState<'journey' | 'emissions'>('journey');
  const [activeVulnerability, setActiveVulnerability] = useState<string | null>(null);
  const [completedChecklist, setCompletedChecklist] = useState<Record<string, boolean>>({
    'ind-1': true,
    'ind-2': false,
    'com-1': true,
    'sys-1': false
  });

  // Telemetry auto-stream logs
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_TELEMETRY_LOGS);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toISOString().slice(11, 19) + ' UTC';
      const sampleMessages = [
        { type: 'DATA' as const, message: 'Atmospheric methane sensor delta: +0.2 ppb.' },
        { type: 'SYS' as const, message: 'Copernicus Sentinel-5P orbital sync verified.' },
        { type: 'WARN' as const, message: 'Soil moisture deficiency index active in Subdivision 18.' },
        { type: 'DATA' as const, message: 'Solar irradiance radiometer measured 1,361 W/m².' }
      ];
      const rand = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
      const newLog: TelemetryLog = {
        id: Date.now().toString(),
        timestamp: timeStr,
        type: rand.type,
        message: rand.message
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 7)]);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const toggleCheck = (id: string) => {
    setCompletedChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Sector breakdown data
  const sectorData = [
    { name: 'Energy & Power', pct: 76, color: '#0284c7' },
    { name: 'Agriculture', pct: 13, color: '#059669' },
    { name: 'Industrial Processes', pct: 8, color: '#d97706' },
    { name: 'Waste Management', pct: 3, color: '#e11d48' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/95 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">Understand Climate Change</h2>
          </div>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed font-normal">
            A science-backed guide to the causes, planetary impacts, greenhouse gases, and strategic mitigation pathways grounded in IPCC AR6 and WMO observations.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0">
          <button
            onClick={() => setClimateSubTab('journey')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              climateSubTab === 'journey'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Educational Journey
          </button>
          <button
            onClick={() => setClimateSubTab('emissions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              climateSubTab === 'emissions'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Emissions Intelligence
          </button>
        </div>
      </div>

      {climateSubTab === 'journey' ? (
        <>
          {/* 1. Guided Learning Journey Cards */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider font-data">
                Guided Learning Journey
              </h3>
              <span className="text-xs text-slate-500 font-data font-bold">4 INTERACTIVE MODULES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {LEARNING_MODULES.map((mod) => (
                <div
                  key={mod.id}
                  onClick={() => onOpenModule(mod)}
                  className="glass-panel p-5 rounded-3xl border border-slate-200 hover:border-sky-400 bg-white/95 hover:bg-sky-50/40 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-2xl font-black font-data text-sky-600 group-hover:text-sky-700">
                        {mod.number}
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-sky-700 group-hover:bg-sky-100 group-hover:border-sky-300 transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                      {mod.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {mod.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-data font-bold text-sky-700">
                    <span>LAUNCH LESSON</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Vulnerability Matrices Section */}
          <div className="space-y-3 pt-4">
            <div className="flex justify-between items-center px-1">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider font-data">
                  Planetary Vulnerability Matrices
                </h3>
                <p className="text-xs text-slate-500">Critical sectoral stress factors under +1.5°C to +2.0°C warming scenarios</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
              {VULNERABILITY_MATRICES.map((vuln) => {
                const isSelected = activeVulnerability === vuln.id;
                return (
                  <div
                    key={vuln.id}
                    onClick={() => setActiveVulnerability(isSelected ? null : vuln.id)}
                    className={`glass-panel p-4 rounded-3xl border transition-all cursor-pointer bg-white/95 ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-300/40'
                        : 'border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                        {vuln.title}
                      </span>
                      <span
                        className="text-[9px] font-data uppercase px-2 py-0.5 rounded-full font-bold"
                        style={{
                          backgroundColor: `${vuln.color}15`,
                          color: vuln.color,
                          border: `1px solid ${vuln.color}40`
                        }}
                      >
                        {vuln.severity}
                      </span>
                    </div>

                    <div className="text-base font-extrabold font-data text-slate-900 my-1">
                      {vuln.metric}
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                      {vuln.description}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] font-data text-slate-500 font-semibold">
                      2030: {vuln.projection2030}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Strategic Mitigation Pathways */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 space-y-5 bg-white/95 shadow-sm">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 uppercase tracking-wider font-data">
                Strategic Mitigation Pathways
              </h3>
              <p className="text-xs text-slate-500">
                Actionable vectors across individual, community, and systemic energy grids to curb greenhouse acceleration.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Individual Level */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-sky-100 text-sky-700 border border-sky-200">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">Individual Level</h4>
                    <span className="text-[10px] font-data text-slate-500 font-semibold">Direct Footprint Reduction</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {[
                    { id: 'ind-1', text: 'Electrify residential cooking & rooftop solar adoption (-2.4t CO2e/yr)' },
                    { id: 'ind-2', text: 'Transition to plant-rich dietary choices & food waste elimination (-1.1t CO2e/yr)' },
                    { id: 'ind-3', text: 'Prioritize mass rail transit over short-haul domestic flights' }
                  ].map((item) => (
                    <label
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className="flex items-start gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none p-2 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!completedChecklist[item.id]}
                        onChange={() => {}}
                        className="mt-0.5 accent-sky-600 rounded"
                      />
                      <span className={completedChecklist[item.id] ? 'line-through text-slate-400 font-medium' : 'font-medium'}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Community Level */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">Community Level</h4>
                    <span className="text-[10px] font-data text-slate-500 font-semibold">Decentralized Resilience</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {[
                    { id: 'com-1', text: 'Install neighborhood rainwater harvesting and groundwater percolation pits' },
                    { id: 'com-2', text: 'Develop urban Miyawaki micro-forests to mitigate urban heat islands' },
                    { id: 'com-3', text: 'Organize community compost digesters to prevent organic landfill methane' }
                  ].map((item) => (
                    <label
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className="flex items-start gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none p-2 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!completedChecklist[item.id]}
                        onChange={() => {}}
                        className="mt-0.5 accent-emerald-600 rounded"
                      />
                      <span className={completedChecklist[item.id] ? 'line-through text-slate-400 font-medium' : 'font-medium'}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* System Level */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-100 text-amber-800 border border-amber-200">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">System Level</h4>
                    <span className="text-[10px] font-data text-slate-500 font-semibold">Infrastructure & Policy</span>
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  {[
                    { id: 'sys-1', text: 'Grid modernization: 500 GW non-fossil renewable capacity by 2030' },
                    { id: 'sys-2', text: 'Cap-and-trade carbon pricing mechanism for heavy industry & cement' },
                    { id: 'sys-3', text: 'Mandatory green building codes (ECBC) for commercial construction' }
                  ].map((item) => (
                    <label
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className="flex items-start gap-2.5 text-xs text-slate-700 hover:text-slate-900 cursor-pointer select-none p-2 rounded-xl hover:bg-slate-100 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={!!completedChecklist[item.id]}
                        onChange={() => {}}
                        className="mt-0.5 accent-amber-600 rounded"
                      />
                      <span className={completedChecklist[item.id] ? 'line-through text-slate-400 font-medium' : 'font-medium'}>
                        {item.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Emissions & Telemetry Intelligence */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: India GHG Emissions Over Time */}
            <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-slate-200/90 space-y-5 bg-white/95 shadow-sm">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider font-data">
                    India's GHG Emissions Over Time (MtCO2e)
                  </h3>
                  <p className="text-xs text-slate-500">Aggregated greenhouse gas emissions (excluding LULUCF)</p>
                </div>
                <div className="font-data text-xs text-sky-800 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 font-bold">
                  CURRENT: 3,450 MtCO2e
                </div>
              </div>

              {/* Emissions SVG Chart */}
              <div className="h-64 w-full bg-slate-50 rounded-2xl p-4 relative border border-slate-200">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" />
                  <line x1="0" y1="90" x2="800" y2="90" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" />
                  <line x1="0" y1="140" x2="800" y2="140" stroke="rgba(0, 0, 0, 0.05)" strokeWidth="1" />

                  <defs>
                    <linearGradient id="emissionsGradLight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Area */}
                  <path
                    d="M 0 170 L 160 155 L 320 135 L 480 95 L 640 60 L 800 35 L 800 190 L 0 190 Z"
                    fill="url(#emissionsGradLight)"
                  />
                  {/* Line */}
                  <path
                    d="M 0 170 L 160 155 L 320 135 L 480 95 L 640 60 L 800 35"
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="3.5"
                  />

                  {/* Data Points */}
                  {[
                    { x: 0, y: 170, val: '1,200 Mt' },
                    { x: 160, y: 155, val: '1,450 Mt' },
                    { x: 320, y: 135, val: '1,800 Mt' },
                    { x: 480, y: 95, val: '2,550 Mt' },
                    { x: 640, y: 60, val: '3,100 Mt' },
                    { x: 800, y: 35, val: '3,450 Mt' }
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r="5" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
                  ))}
                </svg>

                <div className="flex justify-between text-[11px] font-data text-slate-500 pt-2 font-medium">
                  <span>1990</span>
                  <span>1997</span>
                  <span>2005</span>
                  <span>2012</span>
                  <span>2019</span>
                  <span className="text-sky-700 font-bold">2024</span>
                </div>
              </div>
            </div>

            {/* Right: Sector Contribution Donut Breakdown */}
            <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-slate-200/90 space-y-5 bg-white/95 shadow-sm">
              <div className="pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider font-data">
                  Sector Contribution
                </h3>
                <p className="text-xs text-slate-500">National inventory breakdown</p>
              </div>

              {/* Progress bars */}
              <div className="space-y-3.5">
                {sectorData.map((s) => (
                  <div key={s.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-800">{s.name}</span>
                      <span className="font-data text-slate-900">{s.pct}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${s.pct}%`, backgroundColor: s.color }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 text-[11px] text-slate-700 leading-relaxed font-normal">
                <span className="text-sky-800 font-bold">Energy Dominance:</span> Power generation and industrial heat account for 76% of national emissions. Accelerated solar & wind capacity expansion is essential.
              </div>
            </div>
          </div>

          {/* Bottom Grid: Heat Trapping Explainer + Live Telemetry Logs Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Heat Trapping Effect Info Panel */}
            <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-slate-200/90 space-y-4 bg-white/95 shadow-sm">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <Flame className="w-5 h-5 text-amber-500" />
                <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                  The Heat Trapping Effect
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Solar radiation passes through the clear atmosphere. Most radiation is absorbed by the Earth's surface and warms it. Some solar radiation is reflected by Earth and the atmosphere. Infrared radiation is emitted from the Earth's surface and trapped by greenhouse gas molecules, re-radiating heat in all directions and warming the lower atmosphere.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-data block font-semibold">CO2 Lifetime</span>
                  <span className="text-sm font-extrabold text-slate-900 font-data mt-0.5">300–1,000 Yrs</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-data block font-semibold">Radiative Forcing</span>
                  <span className="text-sm font-extrabold text-rose-600 font-data mt-0.5">+2.72 W/m²</span>
                </div>
              </div>
            </div>

            {/* Live Telemetry Stream Terminal */}
            <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-slate-200/90 space-y-4 bg-white/95 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-sky-700" />
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 font-data">
                    Live Telemetry Stream
                  </h3>
                </div>
                <span className="text-[10px] font-data text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  STREAMING
                </span>
              </div>

              <div className="space-y-2 font-data text-xs max-h-56 overflow-y-auto">
                {logs.map((l) => (
                  <div key={l.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2">
                    <span className="text-slate-500 text-[10px] shrink-0 mt-0.5">{l.timestamp}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                        l.type === 'ALERT'
                          ? 'bg-rose-100 text-rose-800'
                          : l.type === 'WARN'
                          ? 'bg-amber-100 text-amber-800'
                          : l.type === 'DATA'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {l.type}
                    </span>
                    <span className="text-slate-800 text-[11px] leading-tight font-medium">{l.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
