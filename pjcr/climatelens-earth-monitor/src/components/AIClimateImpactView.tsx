import React, { useState } from 'react';
import {
  AI_CLIMATE_STAT_SUMMARY,
  AI_DATA_CENTER_PROJECTION_TIMELINE,
  QUERY_ENERGY_COMPARISON,
  BIG_TECH_EMISSIONS_SURGE,
  AI_ECO_DIMENSIONS,
  DATA_CENTER_GRID_SOURCES
} from '../data/aiClimateData';
import {
  Cpu,
  Zap,
  Droplets,
  Server,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  Layers,
  Sparkles,
  Sliders,
  Scale,
  RefreshCw,
  Building2,
  Leaf,
  Activity
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  Cell,
  PieChart,
  Pie
} from 'recharts';

export const AIClimateImpactView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'power-projections' | 'water-cooling' | 'big-tech'>('calculator');

  // Interactive AI Carbon Calculator State
  const [modelType, setModelType] = useState<'7B' | '70B' | 'frontier' | 'image' | 'video'>('frontier');
  const [queryCount, setQueryCount] = useState<number>(1000000); // 1 Million queries/day
  const [gridType, setGridType] = useState<'clean' | 'us-avg' | 'coal'>('us-avg');
  const [pue, setPue] = useState<number>(1.25); // Power Usage Effectiveness

  // Energy consumption per query in Watt-hours
  const energyPerQueryWhMap = {
    '7B': 1.8,
    '70B': 3.2,
    'frontier': 4.8,
    'image': 18.0,
    'video': 85.0
  };

  // Water evaporated in mL per query
  const waterPerQueryMlMap = {
    '7B': 65,
    '70B': 110,
    'frontier': 160,
    'image': 680,
    'video': 3100
  };

  // Grid emissions intensity in g CO2 / kWh
  const gridIntensityMap = {
    'clean': 25, // Hydro/Nuclear/Solar
    'us-avg': 385, // US average mix
    'coal': 820 // High coal mix
  };

  const baseWh = energyPerQueryWhMap[modelType];
  const totalDailyKWh = (queryCount * baseWh * pue) / 1000;
  const totalAnnualMWh = (totalDailyKWh * 365) / 1000;

  const baseWaterMl = waterPerQueryMlMap[modelType];
  const totalDailyWaterLiters = (queryCount * baseWaterMl) / 1000;
  const totalAnnualWaterMillionLiters = (totalDailyWaterLiters * 365) / 1000000;

  const gridGrams = gridIntensityMap[gridType];
  const dailyCO2Kg = (totalDailyKWh * gridGrams) / 1000;
  const annualCO2Tonnes = (dailyCO2Kg * 365) / 1000;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 bg-white/95 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
              <Cpu className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">
                  The AI Boom: Energy Surge, Water Cooling &amp; Carbon Footprint
                </h2>
                <span className="text-[10px] font-data bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  IEA 2026 Alert
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed font-normal">
                The exponential rise of generative AI, frontier LLM clusters, and GPU accelerator data centers is transforming global energy grids. Electricity demand is projected to double by 2026, accompanied by millions of gallons of evaporative cooling water and delayed coal plant phase-outs.
              </p>
            </div>
          </div>
        </div>

        {/* View Pills */}
        <div className="flex flex-wrap bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0 gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-white text-amber-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Impact Calculator
          </button>
          <button
            onClick={() => setActiveTab('power-projections')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'power-projections'
                ? 'bg-white text-amber-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Grid Surge (2020–2030)
          </button>
          <button
            onClick={() => setActiveTab('water-cooling')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'water-cooling'
                ? 'bg-white text-amber-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Water &amp; Query Metrics
          </button>
          <button
            onClick={() => setActiveTab('big-tech')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'big-tech'
                ? 'bg-white text-amber-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Big Tech Emissions Surge
          </button>
        </div>
      </div>

      {/* 4 Top Indicator Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden group hover:border-amber-300 transition-all">
          <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
            Projected Data Center Electricity (2026)
          </span>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-extrabold font-data text-amber-600">1,050</span>
            <span className="text-xs font-semibold text-slate-500">TWh / year</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Equivalent to the entire electrical consumption of Japan (IEA Report).
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden group hover:border-sky-300 transition-all">
          <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
            Water Evaporation per Prompt
          </span>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-extrabold font-data text-sky-600">~500</span>
            <span className="text-xs font-semibold text-slate-500">mL (1 bottle)</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Consumed for server cooling per conversation session of 20–50 queries.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden group hover:border-rose-300 transition-all">
          <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
            Big Tech Scope 2 &amp; 3 Spike
          </span>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-extrabold font-data text-rose-600">+48%</span>
            <span className="text-xs font-semibold text-slate-500">since 2020</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            Hyperscale AI infrastructure buildouts have upended corporate net-zero targets.
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden group hover:border-purple-300 transition-all">
          <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
            AI Query vs Google Search
          </span>
          <div className="flex items-baseline gap-1 my-2">
            <span className="text-3xl font-extrabold font-data text-purple-600">10x – 60x</span>
            <span className="text-xs font-semibold text-slate-500">more energy</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-normal">
            0.3 Wh for web search vs 4.8 Wh for frontier LLMs and 18 Wh for image generation.
          </p>
        </div>
      </div>

      {/* Tab: Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-6 bg-white/95 rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Interactive AI Carbon &amp; Water Impact Simulator
                </h3>
                <p className="text-xs text-slate-500">
                  Model the real-time resource drain of running artificial intelligence at scale.
                </p>
              </div>
              <Sliders className="w-5 h-5 text-amber-600" />
            </div>

            {/* 1. Model Architecture Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider font-data flex items-center justify-between">
                <span>1. Model Architecture &amp; Task</span>
                <span className="text-amber-700 lowercase font-normal">{baseWh} Wh per call</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setModelType('7B')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    modelType === '7B'
                      ? 'bg-amber-50 border-amber-400 font-bold text-amber-900 ring-1 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold">Small LLM (7B)</span>
                  <span className="text-[10px] text-slate-500">1.8 Wh / query</span>
                </button>
                <button
                  onClick={() => setModelType('70B')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    modelType === '70B'
                      ? 'bg-amber-50 border-amber-400 font-bold text-amber-900 ring-1 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold">Medium LLM (70B)</span>
                  <span className="text-[10px] text-slate-500">3.2 Wh / query</span>
                </button>
                <button
                  onClick={() => setModelType('frontier')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    modelType === 'frontier'
                      ? 'bg-amber-50 border-amber-400 font-bold text-amber-900 ring-1 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold">Frontier (GPT-4)</span>
                  <span className="text-[10px] text-slate-500">4.8 Wh / query</span>
                </button>
                <button
                  onClick={() => setModelType('image')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    modelType === 'image'
                      ? 'bg-amber-50 border-amber-400 font-bold text-amber-900 ring-1 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold">Diffusion Image</span>
                  <span className="text-[10px] text-slate-500">18 Wh / gen</span>
                </button>
                <button
                  onClick={() => setModelType('video')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all col-span-2 sm:col-span-2 ${
                    modelType === 'video'
                      ? 'bg-amber-50 border-amber-400 font-bold text-amber-900 ring-1 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold">AI Video Synthesis (5s)</span>
                  <span className="text-[10px] text-slate-500">85 Wh / clip (extreme compute)</span>
                </button>
              </div>
            </div>

            {/* 2. Daily Query Volume Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800 uppercase tracking-wider font-data">
                <span>2. Daily Query Volume</span>
                <span className="text-amber-700 font-bold">
                  {queryCount.toLocaleString()} queries / day
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="25000000"
                step="100000"
                value={queryCount}
                onChange={(e) => setQueryCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <div className="flex justify-between text-[10px] font-data text-slate-400">
                <span>100K (Startup)</span>
                <span>5M (Mid-size App)</span>
                <span>25M (Hyperscaler)</span>
              </div>
            </div>

            {/* 3. Energy Grid Source */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider font-data block">
                3. Data Center Grid Electricity Source
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  onClick={() => setGridType('clean')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    gridType === 'clean'
                      ? 'bg-emerald-50 border-emerald-400 font-bold text-emerald-900 ring-1 ring-emerald-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold">Renewables/Nuclear</span>
                  <span className="text-[10px] text-slate-500">25g CO₂ / kWh</span>
                </button>
                <button
                  onClick={() => setGridType('us-avg')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    gridType === 'us-avg'
                      ? 'bg-amber-50 border-amber-400 font-bold text-amber-900 ring-1 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold">US/EU Grid Avg</span>
                  <span className="text-[10px] text-slate-500">385g CO₂ / kWh</span>
                </button>
                <button
                  onClick={() => setGridType('coal')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                    gridType === 'coal'
                      ? 'bg-rose-50 border-rose-400 font-bold text-rose-900 ring-1 ring-rose-300'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block font-bold">Coal-Heavy Grid</span>
                  <span className="text-[10px] text-slate-500">820g CO₂ / kWh</span>
                </button>
              </div>
            </div>

            {/* 4. PUE Slider */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-800 uppercase tracking-wider font-data">
                <span>4. Power Usage Effectiveness (PUE)</span>
                <span className="text-slate-900">{pue.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.1"
                max="1.6"
                step="0.05"
                value={pue}
                onChange={(e) => setPue(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />
              <span className="text-[10px] text-slate-500 block">
                PUE measures total facility power divided by server IT power. Modern hyperscalers achieve ~1.15 to 1.25.
              </span>
            </div>
          </div>

          {/* Right: Calculated Results & Equivalents */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-6">
              <div className="pb-3 border-b border-slate-100">
                <span className="text-[10px] font-data text-amber-700 uppercase tracking-widest block font-bold">
                  Simulated Annual Impact Footprint
                </span>
                <h3 className="font-extrabold text-xl text-slate-900 mt-1">
                  Environmental Consumption Audit
                </h3>
              </div>

              {/* 3 Large Calculated Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 font-data">
                  <div className="flex items-center gap-1.5 text-amber-700 text-xs font-bold">
                    <Zap className="w-4 h-4" />
                    <span>Annual Electricity</span>
                  </div>
                  <span className="text-2xl font-black text-amber-900 block mt-2">
                    {totalAnnualMWh.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-amber-800 font-medium">Megawatt-hours (MWh)</span>
                </div>

                <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200 font-data">
                  <div className="flex items-center gap-1.5 text-sky-700 text-xs font-bold">
                    <Droplets className="w-4 h-4" />
                    <span>Cooling Water</span>
                  </div>
                  <span className="text-2xl font-black text-sky-900 block mt-2">
                    {totalAnnualWaterMillionLiters.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-sky-800 font-medium">Million Liters Evaporated</span>
                </div>

                <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-200 font-data">
                  <div className="flex items-center gap-1.5 text-rose-700 text-xs font-bold">
                    <Activity className="w-4 h-4" />
                    <span>Annual Carbon</span>
                  </div>
                  <span className="text-2xl font-black text-rose-900 block mt-2">
                    {annualCO2Tonnes.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-rose-800 font-medium">Tonnes CO₂ equivalent</span>
                </div>
              </div>

              {/* Equivalent Tangible Comparisons */}
              <div className="space-y-3 pt-1">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 font-data">
                  Real-World Tangible Equivalencies
                </h4>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Residential Power Equivalent:</span>
                    <span className="font-bold font-data text-amber-700">
                      {Math.round(totalAnnualMWh / 10.5)} US homes powered for 1 year
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Based on average residential electricity usage of 10,500 kWh/year per household.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Evaporative Water Lost:</span>
                    <span className="font-bold font-data text-sky-700">
                      {(totalAnnualWaterMillionLiters / 2.5).toFixed(1)} Olympic Swimming Pools
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    High-density compute racks boil off potable municipal water in evaporative cooling towers.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">Passenger Flights Equivalent:</span>
                    <span className="font-bold font-data text-rose-700">
                      {Math.round(annualCO2Tonnes / 0.9)} London-NYC roundtrip flights
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    A typical trans-Atlantic roundtrip flight emits approximately 0.9 tonnes of CO₂ per passenger seat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Grid Surge (2020-2030) */}
      {activeTab === 'power-projections' && (
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Global Data Center &amp; AI Electricity Trajectory (2020–2030)
              </h3>
              <p className="text-xs text-slate-500">
                Total data center power demand vs dedicated AI compute cluster slice in Terawatt-hours (TWh).
              </p>
            </div>
            <span className="text-[10px] font-data bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-bold">
              SOURCE: IEA &amp; GOLDMAN SACHS
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={AI_DATA_CENTER_PROJECTION_TIMELINE}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} unit=" TWh" />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} TWh`, name === 'globalTWh' ? 'Total Global Data Centers' : 'AI Compute Specific']}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono'
                  }}
                />
                <Legend
                  formatter={(val) => (val === 'globalTWh' ? 'Total Data Center Power (TWh)' : 'AI Workloads Portion (TWh)')}
                />
                <Bar dataKey="globalTWh" fill="#cbd5e1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="aiSpecificTWh" fill="#d97706" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Grid delay callout */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-600" />
              The "Dirty Peaker" Reality: Why AI Strains Clean Energy Transitions
            </h4>
            <p className="leading-relaxed">
              AI model training cannot tolerate intermittent power interruptions. Hyperscalers require 24/7 firm baseload power. Because grid operators cannot deploy utility-scale batteries fast enough, utilities across Virginia’s "Data Center Alley" (handling 70% of global internet traffic) and the American Midwest have announced multi-year delays in shuttering coal-fired generation stations to prevent blackouts.
            </p>
          </div>
        </div>
      )}

      {/* Tab: Water & Query Metrics */}
      {activeTab === 'water-cooling' && (
        <div className="space-y-6">
          {/* Query Energy Comparison Chart */}
          <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">
                Energy Intensity by Digital Task (Watt-hours per Action)
              </h3>
              <p className="text-xs text-slate-500">
                From a simple web search (0.3 Wh) to deep reasoning and generative video (85 Wh).
              </p>
            </div>

            <div className="h-80 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={QUERY_ENERGY_COMPARISON}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 160, bottom: 5 }}
                >
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#64748b' }} unit=" Wh" />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 600 }}
                    width={180}
                  />
                  <Tooltip
                    formatter={(value: any, name: any, item: any) => [
                      `${value} Watt-hours (~${item.payload.waterMl} mL water)`,
                      item.payload.multiplier
                    ]}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      border: '1px solid #e2e8f0',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono'
                    }}
                  />
                  <Bar dataKey="wh" radius={[0, 8, 8, 0]}>
                    {QUERY_ENERGY_COMPARISON.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 4 Deep Dive Cards on AI Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_ECO_DIMENSIONS.map((dim, idx) => (
              <div
                key={idx}
                className="bg-white/95 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-2.5"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-data bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold uppercase">
                    {dim.badge}
                  </span>
                  <span className="text-xs font-bold font-data text-slate-500">{dim.stat}</span>
                </div>
                <h4 className="font-bold text-base text-slate-900">{dim.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{dim.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Big Tech Emissions Surge */}
      {activeTab === 'big-tech' && (
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Big Tech Greenhouse Gas Emissions Trajectory (2020–2024)
              </h3>
              <p className="text-xs text-slate-500">
                Official corporate sustainability reporting (Scope 1, 2, and 3 emissions in Megatons CO₂e).
              </p>
            </div>
            <span className="text-[10px] font-data bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full font-bold">
              NET ZERO 2030 OFF-TRACK
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={BIG_TECH_EMISSIONS_SURGE}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} unit=" Mt" />
                <Tooltip
                  formatter={(val: any, name: any) => [`${val} Mt CO₂e`, name.replace('Mt', '').toUpperCase()]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="googleMt" name="Google" stroke="#ea4335" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="microsoftMt" name="Microsoft" stroke="#00a4ef" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="metaMt" name="Meta" stroke="#0668e1" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="amazonMt" name="Amazon" stroke="#ff9900" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Microsoft Corporation</span>
              <p className="text-slate-600 leading-relaxed">
                Scope 3 emissions increased by 42% since 2020 due to construction of new data centers and specialized hardware procurement, prompting its 20-year power contract to restart Three Mile Island Unit 1 nuclear reactor.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Google / Alphabet</span>
              <p className="text-slate-600 leading-relaxed">
                Reported a 48% jump in total carbon emissions over 5 years directly driven by energy demands of AI integration into search, cloud services, and custom TPU server farms.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Green AI Solutions</span>
              <p className="text-slate-600 leading-relaxed">
                Researchers advocate for "Small Language Models" (SLMs), quantization (4-bit inference), dynamic compute routing, and carbon-aware batch scheduling that runs workloads when local solar and wind output peaks.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
