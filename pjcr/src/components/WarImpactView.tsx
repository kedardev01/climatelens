import React, { useState } from 'react';
import {
  GLOBAL_MILITARY_CLIMATE_STATS,
  WAR_CONFLICT_CASE_STUDIES,
  WAR_EMISSIONS_PHASE_BREAKDOWN,
  MILITARY_FOOTPRINT_VS_CIVILIAN,
  WAR_ECOLOGICAL_DIMENSIONS
} from '../data/warClimateData';
import {
  ShieldAlert,
  Flame,
  Bomb,
  Hammer,
  AlertTriangle,
  FileWarning,
  Trees,
  Droplets,
  Activity,
  ChevronRight,
  TrendingUp,
  Scale,
  ZapOff,
  Plane,
  Truck,
  HelpCircle,
  Award
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export const WarImpactView: React.FC = () => {
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string>('ukraine-war');
  const [activeTab, setActiveTab] = useState<'overview' | 'case-studies' | 'phases' | 'ecocide'>('overview');

  const selectedCaseStudy =
    WAR_CONFLICT_CASE_STUDIES.find((c) => c.id === selectedCaseStudyId) ||
    WAR_CONFLICT_CASE_STUDIES[0];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 bg-white/95 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Armed Conflict &amp; Military Footprint on Global Climate
                </h2>
                <span className="text-[10px] font-data bg-rose-100 text-rose-800 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  ~5.5% Global GHG
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Modern warfare inflicts a devastating planetary climate penalty: direct munitions propellant, hyper-intensive aviation sorties, intentional burning of ecosystems and oil depots, followed by the enormous embodied carbon of concrete and steel needed to reconstruct leveled cities.
              </p>
            </div>
          </div>
        </div>

        {/* Sub-tab Pills */}
        <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0 gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Global Footprint
          </button>
          <button
            onClick={() => setActiveTab('case-studies')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'case-studies'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Conflict Audits
          </button>
          <button
            onClick={() => setActiveTab('phases')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'phases'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Emissions Breakdown
          </button>
          <button
            onClick={() => setActiveTab('ecocide')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'ecocide'
                ? 'bg-white text-rose-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ecocide &amp; Policy
          </button>
        </div>
      </div>

      {/* 4 Summary Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden group hover:border-rose-300 transition-all">
          <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
            Military Share of Global Emissions
          </span>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-extrabold font-data text-rose-600">5.5%</span>
            <span className="text-xs text-slate-500 font-medium">of all human GHG</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Higher than civil aviation and maritime commercial shipping combined.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden group hover:border-rose-300 transition-all">
          <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
            Annual Military Carbon Burden
          </span>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-extrabold font-data text-slate-900">2,750</span>
            <span className="text-xs font-semibold text-slate-500">Mt CO₂e / yr</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Equivalent to the 4th highest emitting country on the planet (above Russia).
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden group hover:border-amber-300 transition-all">
          <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
            Ukraine War Total Carbon Audit
          </span>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-extrabold font-data text-amber-600">175</span>
            <span className="text-xs font-semibold text-slate-500">Megatons CO₂e</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Equal to annual emissions of 90 million gasoline cars or the entire Netherlands.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden group hover:border-sky-300 transition-all">
          <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
            Reconstruction Carbon Debt
          </span>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-extrabold font-data text-sky-700">35–45%</span>
            <span className="text-xs font-semibold text-slate-500">of total conflict carbon</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Embodied emissions in cement, steel, and bitumen to rebuild leveled urban areas.
          </p>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Chart: Global Militaries vs Major Countries & Sectors */}
          <div className="lg:col-span-8 bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Global Military Emissions vs. Sovereign Nations &amp; Global Industries
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Annual greenhouse gas emissions in Megatons CO₂ equivalent (Mt CO₂e). Source: Scientists for Global Responsibility &amp; CEOBS.
                </p>
              </div>
              <span className="text-[10px] font-data bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-full font-bold">
                RANK #4 WORLDWIDE
              </span>
            </div>

            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MILITARY_FOOTPRINT_VS_CIVILIAN}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} unit=" Mt" />
                  <YAxis
                    dataKey="entity"
                    type="category"
                    tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 600 }}
                    width={130}
                  />
                  <Tooltip
                    formatter={(value: any) => [`${value} Mt CO₂e / year`, 'Emissions']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono'
                    }}
                  />
                  <Bar dataKey="emissionsMt" radius={[0, 8, 8, 0]}>
                    {MILITARY_FOOTPRINT_VS_CIVILIAN.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isMilitary ? '#ef4444' : entry.color}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">The Invisible Carbon Accounting Loophole</span>
                Under the 1997 Kyoto Protocol, military fuel consumption was excluded from national greenhouse gas reporting requirements following heavy defense lobbying. Under the Paris Agreement, reporting military emissions remains voluntary. As a result, over 70% of military carbon is officially uncounted in national pledges.
              </div>
            </div>
          </div>

          {/* Right Panel: How War Intensifies Climate Change */}
          <div className="lg:col-span-4 bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Primary Warfare Climate Vectors
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 text-rose-700 font-bold">
                  <Plane className="w-4 h-4" />
                  <span>Aviation &amp; Armored Vehicles</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Military aircraft burn JP-8 kerosene at astronomical rates: a single B-52 bomber consumes 3,334 gallons of fuel per hour, emitting ~33 tonnes of CO₂ in just 60 minutes.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 text-amber-700 font-bold">
                  <Hammer className="w-4 h-4" />
                  <span>Post-Conflict Cement &amp; Steel</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Reconstructing pulverized high-rises, bridges, ports, and power stations requires millions of tons of clinker cement and blast-furnace steel, each releasing ~1.8 tonnes of CO₂ per tonne produced.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <Flame className="w-4 h-4" />
                  <span>Landscape &amp; Peatland Fires</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Artillery barrages ignite uncontrolled wildfire fronts through drought-stressed pine forests, agricultural fields, and carbon-rich peat bogs, vaporizing decades of stored carbon.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-center gap-2 text-sky-700 font-bold">
                  <ZapOff className="w-4 h-4" />
                  <span>Energy Grid Destruction &amp; Leaks</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Attacks on fossil pipelines (e.g. Nord Stream releasing 500k tons of pure methane), oil depots, and thermal facilities force cities onto dirty diesel generators.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Case Studies Tab */}
      {activeTab === 'case-studies' && (
        <div className="space-y-6">
          {/* Conflict Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {WAR_CONFLICT_CASE_STUDIES.map((c) => {
              const isSelected = c.id === selectedCaseStudyId;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCaseStudyId(c.id)}
                  className={`p-4 rounded-3xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50/80 border-rose-400 shadow-md ring-2 ring-rose-300'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-data text-slate-500 uppercase tracking-widest block font-bold">
                    {c.region}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">{c.name}</h4>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-xl font-extrabold font-data text-rose-600">
                      {c.totalCO2eMt}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">Mt CO₂e</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Conflict Detail Card */}
          <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-data text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full font-bold">
                  {selectedCaseStudy.period}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-2">
                  {selectedCaseStudy.name}
                </h3>
                <p className="text-xs text-slate-500 font-data mt-0.5">
                  Region: {selectedCaseStudy.region}
                </p>
              </div>

              <div className="text-left lg:text-right bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold font-data block">
                  Total Climate Footprint
                </span>
                <span className="text-3xl font-black font-data text-rose-600">
                  {selectedCaseStudy.totalCO2eMt} Mt CO₂e
                </span>
                <span className="text-xs text-slate-600 block mt-1 font-medium max-w-xs">
                  {selectedCaseStudy.civilianCountryEquivalent}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {selectedCaseStudy.summary}
            </p>

            {/* Sub-Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-data">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">
                  Direct Warfare Operations
                </span>
                <span className="text-xl font-bold text-slate-900 block mt-1">
                  {selectedCaseStudy.directWarfareMt} Mt
                </span>
                <span className="text-[10px] text-slate-500">Fuel &amp; explosives</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-data">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">
                  Fires &amp; Destruction
                </span>
                <span className="text-xl font-bold text-slate-900 block mt-1">
                  {selectedCaseStudy.firesAndDestructionMt} Mt
                </span>
                <span className="text-[10px] text-slate-500">Forests &amp; pipelines</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-data">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">
                  Reconstruction Carbon Debt
                </span>
                <span className="text-xl font-bold text-rose-600 block mt-1">
                  {selectedCaseStudy.reconstructionDebtMt} Mt
                </span>
                <span className="text-[10px] text-slate-500">Cement &amp; steel rebuild</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 font-data">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">
                  Displacement &amp; Flights
                </span>
                <span className="text-xl font-bold text-slate-900 block mt-1">
                  {selectedCaseStudy.displacementAndLogisticsMt} Mt
                </span>
                <span className="text-[10px] text-slate-500">Logistics &amp; detours</span>
              </div>
            </div>

            {/* Ecological Damage List */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Trees className="w-4 h-4 text-emerald-600" />
                <span>Documented Environmental &amp; Planetary Damage</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCaseStudy.keyEcologicalImpacts.map((impact, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5"></span>
                    <span>{impact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soil and Water Damage Box */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-900 space-y-1">
              <span className="font-bold flex items-center gap-2">
                <Droplets className="w-4 h-4 text-rose-600" /> Soil &amp; Groundwater Contamination
              </span>
              <p className="leading-relaxed">{selectedCaseStudy.waterAndSoilDamage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Phases Tab */}
      {activeTab === 'phases' && (
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900">
              The Lifecycle Architecture of Warfare Carbon
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Why the climate toll of war continues for decades after artillery ceases.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Donut Chart */}
            <div className="lg:col-span-5 h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={WAR_EMISSIONS_PHASE_BREAKDOWN}
                    dataKey="percentage"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={105}
                    paddingAngle={4}
                  >
                    {WAR_EMISSIONS_PHASE_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any, name: any) => [`${value}%`, name]}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* List of Breakdown Items */}
            <div className="lg:col-span-7 space-y-3">
              {WAR_EMISSIONS_PHASE_BREAKDOWN.map((phase, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: phase.color }}
                      ></span>
                      <span className="font-bold text-xs text-slate-900">{phase.name}</span>
                    </div>
                    <span className="text-sm font-extrabold font-data text-slate-900">
                      {phase.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ecocide & Policy Tab */}
      {activeTab === 'ecocide' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WAR_ECOLOGICAL_DIMENSIONS.map((dim, idx) => (
              <div
                key={idx}
                className="bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-data bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold uppercase">
                    {dim.tag}
                  </span>
                  <span className="text-xs font-bold font-data text-slate-500">{dim.stat}</span>
                </div>
                <h4 className="font-bold text-base text-slate-900">{dim.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{dim.desc}</p>
              </div>
            ))}
          </div>

          {/* International Law Callout */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider font-data">
              <Award className="w-4 h-4" />
              <span>International Climate Law &amp; Ecocide Recognition</span>
            </div>
            <h3 className="text-xl font-extrabold">
              The Path to Criminalizing Military Climate Ecocide
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Civil society organizations, climate scientists, and vulnerable nations at COP28 and COP29 have advanced formal proposals to close the military emissions reporting loophole in the UNFCCC. Initiatives like the Independent Expert Panel for the Legal Definition of Ecocide advocate for adding "Ecocide" as the fifth international crime under the International Criminal Court (ICC) alongside genocide, crimes against humanity, war crimes, and crimes of aggression.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
