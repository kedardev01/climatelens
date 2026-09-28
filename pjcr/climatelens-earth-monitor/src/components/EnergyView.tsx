import React, { useState } from 'react';
import {
  Zap,
  Sun,
  Wind,
  Droplets,
  Flame,
  TrendingUp,
  BatteryCharging,
  Sliders,
  CheckCircle2,
  Cpu,
  BarChart2
} from 'lucide-react';

export const EnergyView: React.FC = () => {
  const [targetYear, setTargetYear] = useState<number>(2030);

  const cleanEnergyMix = [
    { name: 'Solar PV', capacity: '75.3 GW', pct: 39.5, color: '#f59e0b', icon: Sun },
    { name: 'Large Hydro', capacity: '46.9 GW', pct: 24.6, color: '#0284c7', icon: Droplets },
    { name: 'Wind Energy', capacity: '45.1 GW', pct: 23.7, color: '#059669', icon: Wind },
    { name: 'Biomass & Cogeneration', capacity: '10.8 GW', pct: 5.7, color: '#ea580c', icon: Zap },
    { name: 'Nuclear Power', capacity: '7.5 GW', pct: 3.9, color: '#9333ea', icon: Cpu },
    { name: 'Small Hydro Power', capacity: '4.9 GW', pct: 2.6, color: '#0ea5e9', icon: Droplets }
  ];

  const stateLeaderboard = [
    { rank: '01', state: 'Rajasthan', totalClean: '26.8 GW', solarShare: '20.2 GW', windShare: '5.2 GW', badge: 'Top Solar Hub' },
    { rank: '02', state: 'Gujarat', totalClean: '24.5 GW', solarShare: '12.4 GW', windShare: '10.8 GW', badge: 'Hybrid Park Leader' },
    { rank: '03', state: 'Tamil Nadu', totalClean: '21.2 GW', solarShare: '7.8 GW', windShare: '10.2 GW', badge: 'Wind Pioneer' },
    { rank: '04', state: 'Karnataka', totalClean: '18.4 GW', solarShare: '9.2 GW', windShare: '6.1 GW', badge: 'Pavagada Complex' },
    { rank: '05', state: 'Maharashtra', totalClean: '14.9 GW', solarShare: '5.6 GW', windShare: '5.1 GW', badge: 'Rooftop Adoption' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/95 shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
              <Zap className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-slate-900">Energy Transition &amp; Grid Intelligence</h2>
          </div>
          <p className="text-xs text-slate-600 mt-1.5 max-w-2xl leading-relaxed font-normal">
            Real-time tracking of non-fossil capacity expansion, grid carbon intensity, and national roadmaps toward 500 GW of clean generation by 2030 and Net Zero by 2070.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-data block font-bold">NON-FOSSIL SHARE</span>
            <span className="text-xl font-black font-data text-emerald-700">44.3%</span>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-data block font-bold">GRID CARBON INTENSITY</span>
            <span className="text-xl font-black font-data text-sky-700">680 g/kWh</span>
          </div>
        </div>
      </div>

      {/* Grid Mix: Clean vs Fossil Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Clean Energy Breakdown */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-3xl border border-slate-200/90 space-y-5 bg-white/95 shadow-sm">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider font-data">
                Installed Clean Energy Portfolio (190.57 GW)
              </h3>
              <p className="text-xs text-slate-500">Ministry of New and Renewable Energy (MNRE) Database</p>
            </div>
            <span className="text-xs font-data text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
              +14.2% YoY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {cleanEnergyMix.map((mix) => {
              const Icon = mix.icon;
              return (
                <div key={mix.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" style={{ color: mix.color }} />
                      <span className="text-xs font-bold text-slate-800">{mix.name}</span>
                    </div>
                    <span className="text-xs font-black font-data text-slate-900">{mix.capacity}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${mix.pct}%`, backgroundColor: mix.color }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-data text-slate-500 font-medium">
                    <span>Share of Clean Matrix</span>
                    <span className="text-slate-900 font-bold">{mix.pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fossil & Transition Roadmap */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-slate-200/90 space-y-5 bg-white/95 shadow-sm">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider font-data">
              2030 Capacity Expansion Trajectory
            </h3>
            <p className="text-xs text-slate-500">Projected non-fossil capacity scaling</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-600 uppercase tracking-wider font-data font-bold">Target Year</span>
                <span className="text-lg font-black font-data text-sky-700">{targetYear}</span>
              </div>
              <input
                type="range"
                min="2024"
                max="2035"
                value={targetYear}
                onChange={(e) => setTargetYear(parseInt(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-data text-slate-500 font-semibold">
                <span>2024 (190 GW)</span>
                <span>2030 (500 GW Target)</span>
                <span>2035 (750 GW)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-data font-semibold">Projected Clean Share</span>
                <span className="font-black font-data text-emerald-700">
                  {Math.min(68, 44 + (targetYear - 2024) * 3.8).toFixed(1)}% of Grid
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-600 font-data font-semibold">Avoided CO2e per Annum</span>
                <span className="font-black font-data text-slate-900">
                  {((targetYear - 2024) * 110 + 450).toFixed(0)} MtCO2e
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600 leading-relaxed font-normal">
              <span className="text-sky-800 font-bold">Storage Mandate:</span> Integrating 500 GW of variable wind &amp; solar requires 41 GW / 208 GWh of battery energy storage systems (BESS) and pumped storage hydro.
            </div>
          </div>
        </div>
      </div>

      {/* State-Wise Clean Energy Leaderboard */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 space-y-5 bg-white/95 shadow-sm">
        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider font-data flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-sky-700" />
              State Clean Energy Adoption Leaderboard
            </h3>
            <p className="text-xs text-slate-500">Top performing states by installed utility-scale renewable capacity</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-data uppercase tracking-wider font-bold">
                <th className="pb-3 px-4">Rank</th>
                <th className="pb-3 px-4">State</th>
                <th className="pb-3 px-4">Total Clean Capacity</th>
                <th className="pb-3 px-4">Solar Component</th>
                <th className="pb-3 px-4">Wind Component</th>
                <th className="pb-3 px-4 text-right">Strategic Focus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-data">
              {stateLeaderboard.map((row) => (
                <tr key={row.rank} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-sky-700 font-bold">{row.rank}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{row.state}</td>
                  <td className="py-3.5 px-4 text-emerald-700 font-black">{row.totalClean}</td>
                  <td className="py-3.5 px-4 text-amber-700 font-semibold">{row.solarShare}</td>
                  <td className="py-3.5 px-4 text-sky-700 font-semibold">{row.windShare}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full text-[10px] text-slate-700 font-bold">
                      {row.badge}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
