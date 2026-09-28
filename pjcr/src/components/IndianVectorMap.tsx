import React, { useState, useMemo, useRef } from 'react';
import { geoPath } from 'd3-geo';
import {
  INDIA_STATES_GEOJSON,
  getIndiaProjection,
  getOfficialIndiaOuterBoundaryPath,
  getOfficialIndiaInnerStateBordersPath,
  getStateIdFromGeoJson,
  projectLatLngToIndiaSvg,
  ALL_INDIAN_STATES_AND_UTS,
  IndianStatePoliticalData,
  ALL_INDIAN_ENV_STATIONS,
  IndianEnvStation,
  INDIAN_PROTECTED_BIOSPHERES,
  IndianBioReserve,
  INDIAN_RENEWABLE_HUBS,
  IndianRenewableHub
} from '../services/politicalMapService';
import {
  ALL_STATES_ICED_DATA,
  StateIcedData,
  getSeciCategoryColor,
  NATIONAL_ICED_METRICS
} from '../services/nitiIcedService';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Globe2,
  ShieldCheck,
  Wind,
  TreePine,
  Zap,
  MapPin,
  Sun,
  Activity,
  CheckCircle2,
  Info,
  TrendingUp,
  Award,
  BarChart3,
  BatteryCharging
} from 'lucide-react';
import { LiveAirQualityData, LiveWeatherData } from '../services/climateApi';

export type IndiaMapLayer = 'seci' | 'renewables' | 'aqi' | 'biospheres' | 'states';

interface IndianVectorMapProps {
  activeLayer?: IndiaMapLayer;
  selectedStateId?: string;
  onSelectState?: (state: IndianStatePoliticalData) => void;
  selectedStationId?: string;
  onSelectStation?: (station: IndianEnvStation) => void;
  liveAqiMap?: Record<string, LiveAirQualityData>;
  liveWeatherMap?: Record<string, LiveWeatherData>;
  indicator?: 'Temp' | 'Rainfall' | 'AQI' | 'Forest' | 'CleanEnergy' | 'Water' | 'SECI';
  showControls?: boolean;
  heightClass?: string;
}

export const IndianVectorMap: React.FC<IndianVectorMapProps> = ({
  activeLayer = 'states',
  selectedStateId,
  onSelectState,
  selectedStationId,
  onSelectStation,
  liveAqiMap = {},
  liveWeatherMap = {},
  indicator = 'Temp',
  showControls = true,
  heightClass = 'h-[560px]'
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragOriginRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const [mapMode, setMapMode] = useState<'vector' | 'freeTile'>('vector');
  const [hoveredStateId, setHoveredStateId] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<{
    title: string;
    sub: string;
    val?: string;
    detail?: string;
    color?: string;
    x: number;
    y: number;
  } | null>(null);

  // SVG canvas dimensions
  const SVG_WIDTH = 600;
  const SVG_HEIGHT = 650;
  const PAD = 24;

  // Authoritative Survey of India boundary meshes generated from real GIS dataset
  const outerBoundaryPath = useMemo(
    () => getOfficialIndiaOuterBoundaryPath(SVG_WIDTH, SVG_HEIGHT, PAD),
    [SVG_WIDTH, SVG_HEIGHT, PAD]
  );
  const innerStateBordersPath = useMemo(
    () => getOfficialIndiaInnerStateBordersPath(SVG_WIDTH, SVG_HEIGHT, PAD),
    [SVG_WIDTH, SVG_HEIGHT, PAD]
  );

  // Precompute geographic paths and centroids for all 36 States & Union Territories
  const stateGeometries = useMemo(() => {
    const proj = getIndiaProjection(SVG_WIDTH, SVG_HEIGHT, PAD);
    const pathGen = geoPath(proj);

    return (INDIA_STATES_GEOJSON as any).features.map((feat: any) => {
      const stNm = feat.properties.st_nm;
      const stId = getStateIdFromGeoJson(stNm);
      const pathD = pathGen(feat) || '';
      const centroid = pathGen.centroid(feat) || [0, 0];
      const stateMeta = ALL_INDIAN_STATES_AND_UTS.find((s) => s.id === stId);
      const iced = ALL_STATES_ICED_DATA.find((i) => i.id === stId);

      return {
        name: stNm,
        id: stId,
        pathD,
        centroid,
        stateMeta,
        iced
      };
    });
  }, [SVG_WIDTH, SVG_HEIGHT, PAD]);

  const resetView = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag on primary mouse button
    if (e.button !== 0) return;
    setIsDragging(true);
    dragOriginRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragOriginRef.current.x,
      y: e.clientY - dragOriginRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getAqiColor = (aqi: number) => {
    if (aqi > 200) return '#ef4444';
    if (aqi > 150) return '#f97316';
    if (aqi > 100) return '#eab308';
    if (aqi > 50) return '#10b981';
    return '#059669';
  };

  return (
    <div className="relative w-full space-y-3">
      {/* Top Map Control Bar */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/95 border border-slate-200 text-xs shadow-xs">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-sky-50 text-sky-700 border border-sky-200">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 tracking-wide">
                  Survey of India (SOI) High-Precision Cartography
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                  Authoritative GIS GeoJSON
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block font-medium">
                Sovereign territorial integrity: Full UT Ladakh (Siachen Glacier, Aksai Chin), J&amp;K, Arunachal Pradesh, &amp; Island Territories
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: SOI Vector vs Tile Satellite */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center gap-1">
              <button
                id="btn-soi-vector"
                onClick={() => setMapMode('vector')}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  mapMode === 'vector' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>SOI Vector</span>
              </button>
              <button
                id="btn-tile-satellite"
                onClick={() => setMapMode('freeTile')}
                className={`px-3 py-1.5 text-[11px] font-bold rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  mapMode === 'freeTile' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Tile Satellite</span>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1">
              <button
                id="btn-zoom-in"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2.5))}
                className="p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 cursor-pointer shadow-2xs transition-all"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                id="btn-zoom-out"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.75))}
                className="p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 cursor-pointer shadow-2xs transition-all"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                id="btn-reset-view"
                onClick={resetView}
                className="p-2 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 cursor-pointer shadow-2xs transition-all"
                title="Reset View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Map Canvas Container with drag/pan support */}
      <div
        className={`relative ${heightClass} bg-slate-100/70 rounded-3xl overflow-hidden border border-slate-200/90 flex items-center justify-center shadow-md select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Subtle GIS Coordinate Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none"></div>

        {/* Free Map Tile Background Underlay (when in tile mode) */}
        {mapMode === 'freeTile' && (
          <div className="absolute inset-0 opacity-40 overflow-hidden pointer-events-none">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://a.basemaps.cartocdn.com/rastertiles/voyager_labels_under/4/11/7.png')`,
                filter: 'contrast(110%) brightness(95%)'
              }}
            />
          </div>
        )}

        {/* SVG Projection Canvas with Zoom & Pan */}
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-75"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`
          }}
        >
          <svg
            className="w-[96%] h-[96%] max-h-[640px] drop-shadow-md"
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          >
            <defs>
              {/* Sovereign State Gradient (Clean light blue-cyan theme matching ClimateLens) */}
              <linearGradient id="indiaStateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#0369a1" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#075985" stopOpacity="0.92" />
              </linearGradient>

              {/* Glowing Outer Perimeter Filter */}
              <filter id="borderGlowLight" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* 1. Sovereign Outer Glowing Stroke */}
            <path
              d={outerBoundaryPath}
              fill="none"
              stroke="#0284c7"
              strokeWidth="6"
              strokeOpacity="0.25"
              strokeLinejoin="round"
              className="pointer-events-none"
            />

            {/* 2. Individual Real Geographic State & UT Polygons (Authoritative GIS Boundaries) */}
            <g id="india-states-layer">
              {stateGeometries.map((sg) => {
                const isSelected = selectedStateId === sg.id;
                const isHovered = hoveredStateId === sg.id;
                const stateMeta = sg.stateMeta;
                const iced = sg.iced;

                return (
                  <path
                    key={`state-geom-${sg.id}`}
                    id={`state-polygon-${sg.id}`}
                    d={sg.pathD}
                    fill={
                      isSelected
                        ? '#0284c7'
                        : isHovered
                        ? '#38bdf8'
                        : mapMode === 'freeTile'
                        ? 'rgba(14, 116, 144, 0.25)'
                        : 'url(#indiaStateGrad)'
                    }
                    fillOpacity={isSelected ? 0.7 : isHovered ? 0.5 : mapMode === 'freeTile' ? 0.3 : 0.85}
                    stroke={isSelected ? '#ffffff' : '#7dd3fc'}
                    strokeWidth={isSelected ? '2' : '0.6'}
                    strokeOpacity={isSelected ? 1 : 0.4}
                    className="transition-colors duration-150 cursor-pointer"
                    onClick={() => stateMeta && onSelectState && onSelectState(stateMeta)}
                    onMouseEnter={() => {
                      setHoveredStateId(sg.id);
                      if (stateMeta) {
                        setHoveredItem({
                          title: `${stateMeta.name} (${stateMeta.stateCode})`,
                          sub: `Capital: ${stateMeta.capital} • ${stateMeta.zone}`,
                          val: iced
                            ? `SECI Rank #${iced.seciRank} (${iced.seciScore}/100) • Clean Energy: ${stateMeta.cleanEnergyShare}`
                            : `Zone: ${stateMeta.climateZone}`,
                          detail: stateMeta.description,
                          color: '#0284c7',
                          x: sg.centroid[0],
                          y: sg.centroid[1]
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setHoveredStateId(null);
                      setHoveredItem(null);
                    }}
                  >
                    <title>{sg.name} — Survey of India Sovereign Standard</title>
                  </path>
                );
              })}
            </g>

            {/* 3. Internal State Boundaries Mesh */}
            <path
              d={innerStateBordersPath}
              fill="none"
              stroke="#bae6fd"
              strokeWidth="0.8"
              strokeOpacity="0.75"
              className="pointer-events-none"
            />

            {/* 4. Sovereign National Outer Boundary (Crisp Border) */}
            <path
              d={outerBoundaryPath}
              fill="none"
              stroke="#0369a1"
              strokeWidth="2.2"
              strokeLinejoin="round"
              className="pointer-events-none"
            />

            {/* 5. Geographic Reference Lines */}
            {/* Tropic of Cancer ~23.5°N */}
            {(() => {
              const [x1, y1] = projectLatLngToIndiaSvg(68.0, 23.5, SVG_WIDTH, SVG_HEIGHT, PAD);
              const [x2, y2] = projectLatLngToIndiaSvg(97.0, 23.5, SVG_WIDTH, SVG_HEIGHT, PAD);
              return (
                <g opacity="0.6">
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#f59e0b"
                    strokeWidth="1.2"
                    strokeDasharray="4,4"
                  />
                  <text x={x1 + 6} y={y1 - 4} fill="#d97706" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    Tropic of Cancer (23.5°N)
                  </text>
                </g>
              );
            })()}

            {/* Indian Standard Meridian 82.5°E */}
            {(() => {
              const [x1, y1] = projectLatLngToIndiaSvg(82.5, 36.5, SVG_WIDTH, SVG_HEIGHT, PAD);
              const [x2, y2] = projectLatLngToIndiaSvg(82.5, 8.5, SVG_WIDTH, SVG_HEIGHT, PAD);
              return (
                <g opacity="0.6">
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#0284c7"
                    strokeWidth="1.2"
                    strokeDasharray="4,4"
                  />
                  <text x={x1 + 4} y={y2 - 6} fill="#0369a1" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    IST 82.5°E (Mirzapur)
                  </text>
                </g>
              );
            })()}

            {/* 6. INTERACTIVE CLIMATE LAYERS */}

            {/* LAYER 1: NITI Aayog SECI (State Energy & Climate Index) Performance Markers (#1, #2, #3, etc.) */}
            {activeLayer === 'seci' &&
              ALL_STATES_ICED_DATA.map((iced) => {
                const stateMeta = ALL_INDIAN_STATES_AND_UTS.find((s) => s.id === iced.id);
                const sg = stateGeometries.find((g) => g.id === iced.id);
                if (!stateMeta || !sg) return null;

                const [x, y] = sg.centroid;
                const isSelected = selectedStateId === iced.id;
                const badge = getSeciCategoryColor(iced.seciCategory);

                return (
                  <g
                    key={`seci-${iced.id}`}
                    id={`seci-marker-${iced.id}`}
                    className="cursor-pointer group"
                    onClick={() => onSelectState && onSelectState(stateMeta)}
                    onMouseEnter={() =>
                      setHoveredItem({
                        title: `${iced.stateName} — SECI Rank #${iced.seciRank}`,
                        sub: `NITI Aayog Category: ${iced.seciCategory} (${iced.seciScore}/100)`,
                        val: `Clean Energy: ${iced.nonFossilSharePct}% Non-Fossil • DISCOM Loss: ${iced.discomLossPct}%`,
                        detail: `Key Initiative: ${iced.keyInitiative}`,
                        color: badge.accentHex,
                        x,
                        y
                      })
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '18' : '12'}
                      fill={badge.accentHex}
                      fillOpacity={isSelected ? '0.45' : '0.3'}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '7' : '5'}
                      fill={badge.accentHex}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? '2' : '1'}
                    />
                    <text
                      x={x + 8}
                      y={y + 3}
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                      className="pointer-events-none drop-shadow"
                    >
                      #{iced.seciRank} ({iced.seciScore})
                    </text>
                  </g>
                );
              })}

            {/* LAYER 2: Protected Biospheres & Forest Reserves (ISFR) */}
            {activeLayer === 'biospheres' &&
              INDIAN_PROTECTED_BIOSPHERES.map((bio, idx) => {
                const [x, y] = projectLatLngToIndiaSvg(bio.lng, bio.lat, SVG_WIDTH, SVG_HEIGHT, PAD);
                return (
                  <g
                    key={`bio-${idx}`}
                    id={`bio-marker-${idx}`}
                    className="cursor-pointer group"
                    onMouseEnter={() =>
                      setHoveredItem({
                        title: bio.name,
                        sub: `${bio.type} • ${bio.state}`,
                        val: `${bio.areaSqKm.toLocaleString()} km² • Carbon Sink Reserve`,
                        detail: bio.keyFeature,
                        color: '#059669',
                        x,
                        y
                      })
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <circle cx={x} cy={y} r="14" fill="#059669" fillOpacity="0.25" />
                    <circle cx={x} cy={y} r="6" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                    <text
                      x={x + 10}
                      y={y + 3}
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      className="pointer-events-none drop-shadow-md"
                    >
                      {bio.name.split(' ')[0]}
                    </text>
                  </g>
                );
              })}

            {/* LAYER 3: Renewable Energy Corridors & Mega Parks (ICED) */}
            {activeLayer === 'renewables' &&
              INDIAN_RENEWABLE_HUBS.map((hub, idx) => {
                const [x, y] = projectLatLngToIndiaSvg(hub.lng, hub.lat, SVG_WIDTH, SVG_HEIGHT, PAD);
                return (
                  <g
                    key={`hub-${idx}`}
                    id={`renewable-hub-${idx}`}
                    className="cursor-pointer group"
                    onMouseEnter={() =>
                      setHoveredItem({
                        title: hub.name,
                        sub: `${hub.type} • ${hub.state}`,
                        val: `${hub.capacityMW.toLocaleString()} MW Operational Capacity`,
                        detail: 'Connected to National Green Energy Corridor High Voltage Grid',
                        color: '#f59e0b',
                        x,
                        y
                      })
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <circle cx={x} cy={y} r="16" fill="#f59e0b" fillOpacity="0.3" />
                    <circle cx={x} cy={y} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                    <text
                      x={x + 10}
                      y={y + 3}
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      className="pointer-events-none drop-shadow-md"
                    >
                      {hub.name.split(' ')[0]} ({hub.capacityMW} MW)
                    </text>
                  </g>
                );
              })}

            {/* LAYER 4: Atmospheric Air Quality & Monitoring Stations */}
            {activeLayer === 'aqi' &&
              ALL_INDIAN_ENV_STATIONS.map((st) => {
                const [x, y] = projectLatLngToIndiaSvg(st.lng, st.lat, SVG_WIDTH, SVG_HEIGHT, PAD);
                const isSelected = selectedStationId === st.id;
                const liveAqi = liveAqiMap[st.id]?.current.us_aqi;
                const aqiVal = liveAqi || (st.id === 'delhi-ncr' ? 245 : st.id === 'kolkata-delta' ? 165 : 68);
                const aqiColor = getAqiColor(aqiVal);

                return (
                  <g
                    key={st.id}
                    id={`aqi-station-${st.id}`}
                    className="cursor-pointer group"
                    onClick={() => onSelectStation && onSelectStation(st)}
                    onMouseEnter={() =>
                      setHoveredItem({
                        title: st.name,
                        sub: `${st.ecosystem} • Elev: ${st.elevationM}m`,
                        val: `US AQI: ${aqiVal} • PM2.5 Ingest`,
                        detail: st.primaryConcern,
                        color: aqiColor,
                        x,
                        y
                      })
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '18' : aqiVal > 150 ? '14' : '10'}
                      fill={aqiColor}
                      fillOpacity={isSelected ? '0.45' : '0.3'}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '7' : '5'}
                      fill={aqiColor}
                      stroke={isSelected ? '#ffffff' : '#0f172a'}
                      strokeWidth={isSelected ? '2' : '1'}
                    />
                    <text
                      x={x + 9}
                      y={y + 3}
                      fill="#ffffff"
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="monospace"
                      className="pointer-events-none drop-shadow"
                    >
                      {st.name.split(' ')[0]} ({aqiVal})
                    </text>
                  </g>
                );
              })}

            {/* LAYER 5: Political States & UT Markers */}
            {activeLayer === 'states' &&
              stateGeometries.map((sg) => {
                const state = sg.stateMeta;
                if (!state) return null;

                const [x, y] = sg.centroid;
                const isSelected = selectedStateId === state.id;
                const icedProfile = sg.iced;

                let displayVal = state.stateCode;
                if (indicator === 'Temp') {
                  const liveW = liveWeatherMap[state.id]?.current.temperature_2m;
                  displayVal = liveW ? `${liveW.toFixed(1)}°` : state.surfaceTemp.split(' ')[0];
                } else if (indicator === 'AQI') {
                  const liveA = liveAqiMap[state.id]?.current.us_aqi;
                  displayVal = `${liveA || state.aqiBaseline}`;
                } else if (indicator === 'Forest') {
                  displayVal = state.forestCanopyPct;
                } else if (indicator === 'CleanEnergy') {
                  displayVal = state.cleanEnergyShare.split(' ')[0];
                } else if (indicator === 'Water') {
                  displayVal = `${state.waterIndexValue}`;
                } else if (indicator === 'SECI') {
                  displayVal = icedProfile ? `Rank #${icedProfile.seciRank}` : state.stateCode;
                }

                return (
                  <g
                    key={`state-marker-${state.id}`}
                    id={`state-marker-${state.id}`}
                    className="cursor-pointer group"
                    onClick={() => onSelectState && onSelectState(state)}
                    onMouseEnter={() =>
                      setHoveredItem({
                        title: `${state.name} (${state.stateCode})`,
                        sub: `Capital: ${state.capital} • ${state.zone}`,
                        val: `${indicator}: ${displayVal} • ${state.climateZone}`,
                        detail: icedProfile ? `ICED SECI Score: ${icedProfile.seciScore} (${icedProfile.seciCategory})` : undefined,
                        color: isSelected ? '#0284c7' : '#0369a1',
                        x,
                        y
                      })
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {isSelected && (
                      <circle cx={x} cy={y} r="16" fill="#38bdf8" fillOpacity="0.4" stroke="#0284c7" strokeWidth="1.5" />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? '6' : '4'}
                      fill={isSelected ? '#0284c7' : '#ffffff'}
                      stroke={isSelected ? '#ffffff' : '#0369a1'}
                      strokeWidth={isSelected ? '2' : '1.5'}
                    />
                    <text
                      x={x + 7}
                      y={y + 3}
                      fill="#ffffff"
                      fontSize={isSelected ? '10' : '8'}
                      fontWeight="bold"
                      fontFamily="monospace"
                      className="pointer-events-none drop-shadow"
                    >
                      {state.stateCode}
                    </text>
                  </g>
                );
              })}
          </svg>
        </div>

        {/* Interactive Hover Tooltip Card */}
        {hoveredItem && (
          <div
            id="map-hover-tooltip"
            className="absolute z-30 pointer-events-none bg-white/95 backdrop-blur-md border border-slate-200 px-4 py-3 rounded-2xl text-xs shadow-xl space-y-1 animate-fadeIn max-w-[290px]"
            style={{
              left: Math.min(Math.max(hoveredItem.x - 40, 10), 320),
              top: Math.max(hoveredItem.y - 80, 10)
            }}
          >
            <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hoveredItem.color || '#0284c7' }}></span>
              <span>{hoveredItem.title}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium">{hoveredItem.sub}</div>
            {hoveredItem.val && (
              <div className="text-[10px] font-mono font-bold text-sky-700 pt-0.5">
                {hoveredItem.val}
              </div>
            )}
            {hoveredItem.detail && (
              <div className="text-[9px] text-slate-700 bg-slate-50 p-1.5 rounded-xl font-sans leading-tight border border-slate-100">
                {hoveredItem.detail}
              </div>
            )}
          </div>
        )}

        {/* Bottom Legend Overlay */}
        <div
          id="map-soi-legend"
          className="absolute bottom-3 left-3 bg-white/95 backdrop-blur border border-slate-200 px-3.5 py-2 rounded-2xl text-[10px] font-data text-slate-600 flex items-center gap-3 z-10 shadow-xs"
        >
          <span className="flex items-center gap-1 text-slate-900 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Survey of India (SOI) Standard
          </span>
          <span className="text-slate-300">|</span>
          <span className="font-medium">UT Ladakh &bull; J&amp;K &bull; Arunachal Pradesh &bull; Andaman &amp; Nicobar (Indira Point) &bull; Lakshadweep</span>
        </div>
      </div>
    </div>
  );
};
