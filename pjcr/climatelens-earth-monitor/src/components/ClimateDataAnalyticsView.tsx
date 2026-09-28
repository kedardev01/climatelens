import React, { useState, useMemo } from 'react';
import {
  HISTORICAL_CLIMATE_TIME_SERIES,
  SECTORAL_EMISSIONS_HIERARCHY,
  CRYOSPHERE_ICE_LOSS_DATA,
  CLEAN_ENERGY_S_CURVE,
  CARBON_BUDGET_REMAINING
} from '../data/comprehensiveClimateAnalyticsData';
import {
  calculateLinearRegression,
  calculateQuadraticRegression,
  generatePredictiveTimeSeries,
  findThresholdCrossingYear,
  RegressionModelType
} from '../utils/climateRegression';
import {
  BarChart2,
  TrendingUp,
  Activity,
  Layers,
  Thermometer,
  Flame,
  CloudRain,
  Wind,
  Droplets,
  Calendar,
  Filter,
  Download,
  Share2,
  Zap,
  Info,
  Clock,
  Globe2,
  PieChart as PieIcon,
  Maximize2,
  Sliders,
  Target,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const ClimateDataAnalyticsView: React.FC = () => {
  const [activeChartSection, setActiveChartSection] = useState<
    'temperature' | 'greenhouse-gases' | 'emissions-sectors' | 'oceans-sealevel' | 'cryosphere' | 'clean-energy' | 'disasters'
  >('temperature');

  const [timeRange, setTimeRange] = useState<'all' | 'satellite' | 'recent'>('all');
  const [activeSectorIndex, setActiveSectorIndex] = useState<number>(0);

  // Interactive Regression & Trend Prediction Controls
  const [showTrendlines, setShowTrendlines] = useState<boolean>(true);
  const [forecastHorizon, setForecastHorizon] = useState<number>(2040);
  const [regressionModel, setRegressionModel] = useState<RegressionModelType>('linear');
  const [fitBaselineYear, setFitBaselineYear] = useState<number | null>(1970);

  // Filter time series based on time range
  const filteredTimeSeries = useMemo(() => {
    return HISTORICAL_CLIMATE_TIME_SERIES.filter((point) => {
      if (timeRange === 'recent') return point.year >= 2000;
      if (timeRange === 'satellite') return point.year >= 1970;
      return true; // all (1880-2025)
    });
  }, [timeRange]);

  // Points used to train the regression models
  const calibrationPoints = useMemo(() => {
    return HISTORICAL_CLIMATE_TIME_SERIES
      .filter((d) => (fitBaselineYear ? d.year >= fitBaselineYear : true))
      .map((d) => ({ x: d.year, y: d.tempAnomaly }));
  }, [fitBaselineYear]);

  const linearStats = useMemo(() => calculateLinearRegression(calibrationPoints), [calibrationPoints]);
  const quadStats = useMemo(() => calculateQuadraticRegression(calibrationPoints), [calibrationPoints]);

  const activeStats = regressionModel === 'quadratic' ? quadStats : linearStats;

  // Paris Agreement Threshold Crossing Years
  const crossing15Year = useMemo(() => {
    return findThresholdCrossingYear(activeStats.predict, 1.5, 2025, 2080);
  }, [activeStats]);

  const crossing20Year = useMemo(() => {
    return findThresholdCrossingYear(activeStats.predict, 2.0, 2025, 2090);
  }, [activeStats]);

  // Projected Temperature at Forecast Horizon
  const horizonTemp = useMemo(() => {
    return Math.round(activeStats.predict(forecastHorizon) * 100) / 100;
  }, [activeStats, forecastHorizon]);

  // Augmented Time Series with Predictive Trendlines
  const augmentedTimeSeries = useMemo(() => {
    if (!showTrendlines) return filteredTimeSeries;
    return generatePredictiveTimeSeries(
      filteredTimeSeries,
      ['tempAnomaly', 'co2Ppm', 'ch4Ppb', 'n2oPpb', 'seaLevelRiseMm', 'oceanHeatZJ', 'disasterLossBillionUSD'],
      forecastHorizon,
      fitBaselineYear || undefined,
      regressionModel
    );
  }, [filteredTimeSeries, showTrendlines, forecastHorizon, fitBaselineYear, regressionModel]);

  // Augmented Clean Energy S-Curve
  const augmentedCleanEnergy = useMemo(() => {
    if (!showTrendlines) return CLEAN_ENERGY_S_CURVE;
    return generatePredictiveTimeSeries(
      CLEAN_ENERGY_S_CURVE,
      ['solarTWh', 'windTWh', 'coalTWh'],
      Math.max(forecastHorizon, 2025),
      2010,
      'quadratic'
    );
  }, [showTrendlines, forecastHorizon]);

  const selectedSector = SECTORAL_EMISSIONS_HIERARCHY[activeSectorIndex];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200/90 bg-white/95 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-sky-50 text-sky-700 border border-sky-200">
              <BarChart2 className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900">
                  Comprehensive Climate Change Data Analytics
                </h2>
                <span className="text-[10px] font-data bg-sky-100 text-sky-800 border border-sky-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Full Empirical Time-Series
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed font-normal">
                Multi-decadal observational records from NASA GISTEMP, NOAA ESRL, Copernicus ECMWF, and IPCC AR6 synthesized into high-density interactive diagrams, time-series curves, and sector decompositions.
              </p>
            </div>
          </div>
        </div>

        {/* Global Carbon Countdown Capsule */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center gap-3 shrink-0">
          <Clock className="w-5 h-5 text-rose-600 shrink-0" />
          <div className="text-xs font-data">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">
              1.5°C Carbon Budget Remaining
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-rose-600 text-base">
                ~{CARBON_BUDGET_REMAINING.budgetFor1point5CelsiusGt} Gt CO₂
              </span>
              <span className="text-slate-500 text-[11px]">
                (~{CARBON_BUDGET_REMAINING.yearsRemainingAtCurrentRate15} yrs at current burn)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs for Different Analytics Modules */}
      <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide gap-2">
        <div className="flex bg-white/95 p-1.5 rounded-2xl border border-slate-200 shadow-2xs gap-1">
          <button
            onClick={() => setActiveChartSection('temperature')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeChartSection === 'temperature'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            <span>Surface Temp Anomaly</span>
          </button>

          <button
            onClick={() => setActiveChartSection('greenhouse-gases')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeChartSection === 'greenhouse-gases'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Greenhouse Gases (CO₂, CH₄, N₂O)</span>
          </button>

          <button
            onClick={() => setActiveChartSection('emissions-sectors')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeChartSection === 'emissions-sectors'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Emissions by Sector</span>
          </button>

          <button
            onClick={() => setActiveChartSection('oceans-sealevel')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeChartSection === 'oceans-sealevel'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Oceans &amp; Sea Level Rise</span>
          </button>

          <button
            onClick={() => setActiveChartSection('cryosphere')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeChartSection === 'cryosphere'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Cryosphere &amp; Ice Loss</span>
          </button>

          <button
            onClick={() => setActiveChartSection('clean-energy')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeChartSection === 'clean-energy'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Clean Energy S-Curve</span>
          </button>

          <button
            onClick={() => setActiveChartSection('disasters')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeChartSection === 'disasters'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Extreme Disasters ($B)</span>
          </button>
        </div>

        {/* Time Range Filter (where applicable) */}
        {(activeChartSection === 'temperature' || activeChartSection === 'greenhouse-gases' || activeChartSection === 'oceans-sealevel' || activeChartSection === 'disasters') && (
          <div className="flex bg-white/95 p-1 rounded-xl border border-slate-200 text-xs font-data font-bold shrink-0">
            <button
              onClick={() => setTimeRange('all')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                timeRange === 'all' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              1880–2025
            </button>
            <button
              onClick={() => setTimeRange('satellite')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                timeRange === 'satellite' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              1970–2025
            </button>
            <button
              onClick={() => setTimeRange('recent')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                timeRange === 'recent' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              2000–2025
            </button>
          </div>
        )}
      </div>

      {/* Interactive Trend Prediction & Regression Control Bar */}
      <div className="glass-panel p-5 rounded-3xl border border-sky-200/80 bg-white/95 shadow-sm space-y-4 font-data">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
              <TrendingUp className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900">
                  Interactive Empirical Regression &amp; Predictive Forecasting
                </h3>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  {regressionModel === 'linear' ? 'Linear (OLS: y=mx+b)' : 'Accelerating Quadratic (ax²+bx+c)'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                Mathematical regression trendlines trained on multi-decadal observational records with forward extrapolations.
              </p>
            </div>
          </div>

          {/* Master Toggle */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-xs font-bold text-slate-700">Predictive Trendlines</span>
              <button
                type="button"
                onClick={() => setShowTrendlines(!showTrendlines)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                  showTrendlines ? 'bg-sky-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <span className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform"></span>
              </button>
            </label>
          </div>
        </div>

        {showTrendlines && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* 1. Target Forecast Horizon */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                1. Forecast Horizon
              </span>
              <div className="flex flex-wrap gap-1">
                {[2025, 2030, 2040, 2050].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setForecastHorizon(yr)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                      forecastHorizon === yr
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {yr === 2025 ? 'Fitted 2025' : `${yr}`}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Regression Model */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                2. Mathematical Function
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => setRegressionModel('linear')}
                  className={`flex-1 px-2 py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer text-center ${
                    regressionModel === 'linear'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Linear (y=mx+b)
                </button>
                <button
                  onClick={() => setRegressionModel('quadratic')}
                  className={`flex-1 px-2 py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer text-center ${
                    regressionModel === 'quadratic'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Quadratic (ax²+bx+c)
                </button>
              </div>
            </div>

            {/* 3. Training Calibration Window */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                3. Training Baseline
              </span>
              <div className="flex gap-1">
                {[
                  { label: '1970+ Satellite', val: 1970 },
                  { label: '2000+ Recent', val: 2000 },
                  { label: '1880+ Full', val: null }
                ].map((item) => (
                  <button
                    key={String(item.val)}
                    onClick={() => setFitBaselineYear(item.val)}
                    className={`px-2 py-1 rounded-lg font-bold text-[10px] transition-all cursor-pointer ${
                      fitBaselineYear === item.val
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Regression Stats & Threshold Projections */}
            <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-200 text-sky-900 space-y-1 text-[11px]">
              <div className="flex justify-between font-bold">
                <span>R² Confidence:</span>
                <span className="font-mono text-sky-700">{activeStats.r2.toFixed(3)}</span>
              </div>
              <div className="flex justify-between">
                <span>Warming Rate:</span>
                <span className="font-mono font-bold text-rose-600">
                  {activeStats.changePerDecade >= 0 ? `+${activeStats.changePerDecade.toFixed(2)}` : activeStats.changePerDecade.toFixed(2)}°C / decade
                </span>
              </div>
              <div className="flex justify-between border-t border-sky-200/60 pt-1">
                <span className="font-medium text-slate-600">1.5°C Breach Est:</span>
                <span className="font-mono font-bold text-amber-700">
                  {crossing15Year ? `~${crossing15Year}` : 'Post-2080'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-slate-600">Proj. at {forecastHorizon}:</span>
                <span className="font-mono font-bold text-rose-700">+{horizonTemp}°C</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 1. Global Temperature Anomaly Section */}
      {activeChartSection === 'temperature' && (
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Global Mean Surface Temperature Anomaly (°C)
                </h3>
                <span className="text-[11px] font-data bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-0.5 rounded-full font-bold">
                  +1.32°C in 2025
                </span>
                {showTrendlines && (
                  <span className="text-[11px] font-data bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                    Projected {forecastHorizon}: +{horizonTemp}°C
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Deviation relative to 1850–1900 pre-industrial baseline with 1.5°C &amp; 2.0°C Paris thresholds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-data text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-rose-600"></span> Observed Anomaly
              </span>
              {showTrendlines && (
                <span className="flex items-center gap-1">
                  <span className="w-3 h-0.5 border-t-2 border-dashed border-amber-500"></span> Trendline ({regressionModel})
                </span>
              )}
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 border-t border-dashed border-rose-500"></span> 1.5°C Paris Limit
              </span>
            </div>
          </div>

          <div className="h-96 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={augmentedTimeSeries}
                margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="tempFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis
                  domain={[-0.4, Math.max(1.8, Math.ceil((horizonTemp + 0.2) * 10) / 10)]}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  unit="°C"
                />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `${val !== undefined ? (Number(val) > 0 ? `+${val}` : val) : 'N/A'}°C`,
                    name === 'tempAnomaly_trend' ? `Regression Projection (${regressionModel})` : 'Observed Anomaly'
                  ]}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono'
                  }}
                />
                <ReferenceLine y={1.5} stroke="#ef4444" strokeDasharray="5 5" label={{ value: '1.5°C Critical Threshold', fill: '#ef4444', fontSize: 11, position: 'insideTopLeft' }} />
                <ReferenceLine y={0.0} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Pre-Industrial Baseline', fill: '#64748b', fontSize: 10, position: 'insideBottomLeft' }} />
                {showTrendlines && forecastHorizon > 2025 && (
                  <ReferenceLine x={2025} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Forecast Start (2025)', fill: '#64748b', fontSize: 10, position: 'insideTopLeft' }} />
                )}
                <Area
                  type="monotone"
                  dataKey="tempAnomaly"
                  stroke="#e11d48"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#tempFill)"
                />
                {showTrendlines && (
                  <Line
                    type="monotone"
                    dataKey="tempAnomaly_trend"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    strokeDasharray="5 5"
                    dot={false}
                    name="tempAnomaly_trend"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Key Insights Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Unprecedented Acceleration</span>
              <p className="text-slate-600 leading-relaxed">
                The warming rate since 1970 (+0.26°C/decade) is more than double the rate observed in the first half of the 20th century, driven by greenhouse gas radiative forcing.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">El Niño &amp; Marine Heatwaves</span>
              <p className="text-slate-600 leading-relaxed">
                The 2023–2024 spike surpassed all historical models due to ocean thermal release in the North Atlantic and Pacific, creating consecutive months of record highs.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Tipping Point Proximity</span>
              <p className="text-slate-600 leading-relaxed">
                Sustained warming above 1.5°C risks triggering abrupt feedbacks, including Amazon rainforest dieback, West Antarctic ice collapse, and permafrost thaw.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. Greenhouse Gases Section (CO2, CH4, N2O) */}
      {activeChartSection === 'greenhouse-gases' && (
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Atmospheric Concentrations of Long-Lived Greenhouse Gases
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Carbon Dioxide (ppm), Methane (ppb), and Nitrous Oxide (ppb) recorded at Mauna Loa &amp; Cape Grim.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CO2 Chart */}
            <div className="bg-slate-50/80 p-5 rounded-3xl border border-slate-200/90 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
                    Carbon Dioxide (CO₂)
                  </span>
                  <span className="text-2xl font-black font-data text-amber-600">426.2 ppm</span>
                </div>
                <span className="text-[10px] font-data bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                  +47% vs Pre-Ind
                </span>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={augmentedTimeSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis domain={[280, 520]} tick={{ fontSize: 10, fill: '#64748b' }} unit="ppm" />
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '12px' }} />
                    <Line type="monotone" dataKey="co2Ppm" stroke="#d97706" strokeWidth={2.5} dot={false} name="Observed CO₂" />
                    {showTrendlines && (
                      <Line type="monotone" dataKey="co2Ppm_trend" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Trend" />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-slate-600">
                Atmospheric residence time: centuries. Primary driver of long-term radiative forcing.
              </p>
            </div>

            {/* CH4 Chart */}
            <div className="bg-slate-50/80 p-5 rounded-3xl border border-slate-200/90 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
                    Methane (CH₄)
                  </span>
                  <span className="text-2xl font-black font-data text-rose-600">1,945 ppb</span>
                </div>
                <span className="text-[10px] font-data bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">
                  +132% vs Pre-Ind
                </span>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={augmentedTimeSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis domain={[800, 2400]} tick={{ fontSize: 10, fill: '#64748b' }} unit="ppb" />
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '12px' }} />
                    <Line type="monotone" dataKey="ch4Ppb" stroke="#e11d48" strokeWidth={2.5} dot={false} name="Observed CH₄" />
                    {showTrendlines && (
                      <Line type="monotone" dataKey="ch4Ppb_trend" stroke="#f43f5e" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Trend" />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-slate-600">
                84x more potent than CO₂ over 20 years. Leaks from fossil gas, livestock, and wetlands.
              </p>
            </div>

            {/* N2O Chart */}
            <div className="bg-slate-50/80 p-5 rounded-3xl border border-slate-200/90 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-data text-slate-500 uppercase tracking-wider block font-bold">
                    Nitrous Oxide (N₂O)
                  </span>
                  <span className="text-2xl font-black font-data text-teal-600">339.0 ppb</span>
                </div>
                <span className="text-[10px] font-data bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                  +23% vs Pre-Ind
                </span>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={augmentedTimeSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" tick={{ fontSize: 10, fill: '#64748b' }} />
                    <YAxis domain={[270, 380]} tick={{ fontSize: 10, fill: '#64748b' }} unit="ppb" />
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '12px' }} />
                    <Line type="monotone" dataKey="n2oPpb" stroke="#0d9488" strokeWidth={2.5} dot={false} name="Observed N₂O" />
                    {showTrendlines && (
                      <Line type="monotone" dataKey="n2oPpb_trend" stroke="#06b6d4" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Trend" />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-slate-600">
                273x warming potential of CO₂. Driven predominantly by synthetic agricultural fertilizers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Sectoral Emissions Breakdown */}
      {activeChartSection === 'emissions-sectors' && (
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-lg font-extrabold text-slate-900">
              Global Greenhouse Gas Emissions by Economic Sector
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click on any sector to drill into granular sub-sectoral emission drivers (Total: ~54 Gt CO₂e/year).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Pie / Donut Chart */}
            <div className="lg:col-span-5 h-80 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SECTORAL_EMISSIONS_HIERARCHY}
                    dataKey="share"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={115}
                    paddingAngle={3}
                    onClick={(_, index) => setActiveSectorIndex(index)}
                    cursor="pointer"
                  >
                    {SECTORAL_EMISSIONS_HIERARCHY.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke={activeSectorIndex === index ? '#0f172a' : 'none'}
                        strokeWidth={activeSectorIndex === index ? 3 : 0}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val}% of global emissions`, name]}
                    contentStyle={{ fontSize: '12px', borderRadius: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Sub-Sector Drill-down */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: selectedSector.color }}
                    ></span>
                    <h4 className="font-extrabold text-base text-slate-900">
                      {selectedSector.name}
                    </h4>
                  </div>
                  <span className="text-lg font-black font-data text-slate-900">
                    {selectedSector.share}% of Global Total
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {selectedSector.subSectors.map((sub, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-800">{sub.name}</span>
                      <span className="font-data font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {sub.share}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Selector Buttons */}
              <div className="flex flex-wrap gap-1.5">
                {SECTORAL_EMISSIONS_HIERARCHY.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSectorIndex(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeSectorIndex === idx
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {s.name.split(' ')[0]} ({s.share}%)
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Oceans & Sea Level Rise */}
      {activeChartSection === 'oceans-sealevel' && (
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Ocean Heat Content (Zettajoules) &amp; Global Mean Sea Level (mm)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Oceans absorb over 90% of excess planetary greenhouse heat. Driven by thermal expansion &amp; ice melt.
              </p>
            </div>
            <span className="text-[10px] font-data bg-teal-50 text-teal-700 border border-teal-200 px-3 py-1 rounded-full font-bold">
              SATELLITE ALTIMETRY RECORD
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={augmentedTimeSeries} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#0284c7' }} unit="mm" label={{ value: 'Sea Level (mm)', angle: -90, position: 'insideLeft', fill: '#0284c7', fontSize: 11 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#0d9488' }} unit=" ZJ" label={{ value: 'Ocean Heat (ZJ)', angle: 90, position: 'insideRight', fill: '#0d9488', fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '16px', fontFamily: 'JetBrains Mono' }} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="seaLevelRiseMm" name="Observed Sea Level (mm)" stroke="#0284c7" strokeWidth={3} dot={{ r: 3 }} />
                {showTrendlines && (
                  <Line yAxisId="left" type="monotone" dataKey="seaLevelRiseMm_trend" name="Sea Level Trend (mm)" stroke="#38bdf8" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                )}
                <Line yAxisId="right" type="monotone" dataKey="oceanHeatZJ" name="Observed Ocean Heat (ZJ)" stroke="#0d9488" strokeWidth={3} dot={{ r: 3 }} />
                {showTrendlines && (
                  <Line yAxisId="right" type="monotone" dataKey="oceanHeatZJ_trend" name="Ocean Heat Trend (ZJ)" stroke="#14b8a6" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs text-teal-900 leading-relaxed">
            <span className="font-bold block mb-1">Sea Level Rise Rate Doubling:</span>
            The rate of global mean sea level rise has doubled from 2.1 mm/year in the 1993–2002 decade to over 4.8 mm/year in recent observations. Thermal expansion accounts for ~40% while accelerating melt from Greenland and Antarctic ice sheets contributes ~60%.
          </div>
        </div>
      )}

      {/* 5. Cryosphere & Ice Loss */}
      {activeChartSection === 'cryosphere' && (
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Polar Ice Sheets Cumulative Mass Loss (Gigatonnes - Gt)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                NASA/DLR GRACE &amp; GRACE-FO satellite gravimetry (1 Gigaton = 1 billion metric tonnes of water).
              </p>
            </div>
            <span className="text-[10px] font-data bg-sky-50 text-sky-700 border border-sky-200 px-3 py-1 rounded-full font-bold">
              GRACE SATELLITE MISSIONS
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CRYOSPHERE_ICE_LOSS_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} unit=" Gt" domain={[-6500, 0]} />
                <Tooltip
                  formatter={(val: any) => [`${val} Gigatonnes`, 'Cumulative Loss']}
                  contentStyle={{ fontSize: '12px', borderRadius: '16px', fontFamily: 'JetBrains Mono' }}
                />
                <Legend />
                <Bar dataKey="greenlandLossGt" name="Greenland Ice Sheet Loss (Gt)" fill="#38bdf8" radius={[0, 0, 8, 8]} />
                <Bar dataKey="antarcticaLossGt" name="Antarctica Ice Sheet Loss (Gt)" fill="#818cf8" radius={[0, 0, 8, 8]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Greenland Rapid Surface Melt</span>
              <p className="text-slate-600 leading-relaxed">
                Greenland loses approximately 270 billion tonnes of ice annually. Atmospheric rivers and high-pressure blocking patterns in summer are now triggering surface melt even at the 3,200m elevation Summit Station.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Thwaites "Doomsday" Glacier Instability</span>
              <p className="text-slate-600 leading-relaxed">
                Warm circumpolar deep water is undermining the grounding lines of West Antarctica's Thwaites and Pine Island glaciers from beneath, raising the risk of Marine Ice Cliff Instability (MICI).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. Clean Energy S-Curve */}
      {activeChartSection === 'clean-energy' && (
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                The Exponential S-Curve: Solar, Wind &amp; Storage vs. Coal
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Global electricity generation in Terawatt-hours (TWh) from 2010 to 2025.
              </p>
            </div>
            <span className="text-[10px] font-data bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-bold">
              EXPONENTIAL ADOPTION
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={augmentedCleanEnergy} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} unit=" TWh" />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '16px', fontFamily: 'JetBrains Mono' }} />
                <Legend />
                <Area type="monotone" dataKey="solarTWh" name="Solar Generation (TWh)" stroke="#f59e0b" strokeWidth={3} fill="url(#solarGrad)" />
                {showTrendlines && (
                  <Line type="monotone" dataKey="solarTWh_trend" name="Solar S-Curve Trend" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                )}
                <Area type="monotone" dataKey="windTWh" name="Wind Generation (TWh)" stroke="#10b981" strokeWidth={3} fill="url(#windGrad)" />
                {showTrendlines && (
                  <Line type="monotone" dataKey="windTWh_trend" name="Wind S-Curve Trend" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                )}
                <Line type="monotone" dataKey="coalTWh" name="Coal Generation (TWh)" stroke="#475569" strokeWidth={2.5} strokeDasharray="4 4" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Solar PV Scaling Factor</span>
              <p className="text-slate-600 leading-relaxed">
                Solar electricity output surged 76x from 32 TWh in 2010 to 2,450 TWh in 2025, driven by Swanson’s Law (85% reduction in module costs per doubling of capacity).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Grid Storage Explosion</span>
              <p className="text-slate-600 leading-relaxed">
                Utility-scale battery capacity has grown from under 1 GWh in 2010 to over 420 GWh, solving intra-day duck curves and displacing natural gas peaker plants.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <span className="font-bold text-slate-900 block mb-1">Peak Fossil Electricity</span>
              <p className="text-slate-600 leading-relaxed">
                Global coal generation has plateaued around 10,000 TWh as solar and wind additions now exceed annual worldwide demand growth.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 7. Extreme Disasters */}
      {activeChartSection === 'disasters' && (
        <div className="bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Extreme Weather Disasters &amp; Direct Economic Losses (Billion USD)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Category 4/5 tropical cyclones, inland flash floods, and prolonged heatwaves (EM-DAT &amp; Swiss Re sigma).
              </p>
            </div>
            <span className="text-[10px] font-data bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full font-bold">
              $462B IN 2025
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={augmentedTimeSeries} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12, fill: '#ef4444' }} unit=" events" label={{ value: 'Count of Extreme Events', angle: -90, position: 'insideLeft', fill: '#ef4444', fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: '#d97706' }} unit=" $B" label={{ value: 'Losses (Billion USD)', angle: 90, position: 'insideRight', fill: '#d97706', fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '16px', fontFamily: 'JetBrains Mono' }} />
                <Legend />
                <Bar yAxisId="left" dataKey="extremeEventsCount" name="Annual Extreme Disaster Events" fill="#ef4444" radius={[6, 6, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="disasterLossBillionUSD" name="Observed Loss ($B USD)" stroke="#d97706" strokeWidth={3} dot={{ r: 3 }} />
                {showTrendlines && (
                  <Line yAxisId="right" type="monotone" dataKey="disasterLossBillionUSD_trend" name="Loss Trendline ($B)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};
