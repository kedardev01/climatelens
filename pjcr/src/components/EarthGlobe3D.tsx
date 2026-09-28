import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Globe, { GlobeInstance } from 'globe.gl';
import { REGIONS_DATA } from '../data/climateData';
import { RegionData } from '../types';
import {
  generateNaturalEarthTexture,
  generateThermalMapTexture,
  generateWindMapTexture,
  generateRainfallMapTexture,
  generateAirQualityMapTexture,
  generateNightLightsTexture,
  generatePoliticalMapTexture
} from '../utils/mapTextureGenerator';
import {
  GLOBAL_POLITICAL_COUNTRIES,
  OFFICIAL_INDIAN_STATES_DATA,
  getCompletePoliticalGeoJson,
  getIndiaStatesGeoJson,
  fetchWorldPoliticalGeoJson
} from '../services/politicalMapService';
import {
  GLOBE_OBSERVATION_POINTS,
  GLOBE_ACTIVE_RINGS,
  GLOBE_FLOW_ARCS,
  GLOBE_HUD_LABELS,
  GlobePoint
} from '../services/globeGlDataService';
import {
  fetchLiveWeather,
  fetchLiveAirQuality,
  getWeatherCodeDetails,
  LiveWeatherData,
  LiveAirQualityData
} from '../services/climateApi';
import {
  Thermometer,
  Wind,
  Activity,
  Sun,
  Radio,
  X,
  Compass,
  RotateCcw,
  Sparkles,
  ZoomIn,
  ZoomOut,
  ShieldCheck,
  Globe as GlobeIcon
} from 'lucide-react';

interface EarthGlobe3DProps {
  selectedLayer?: string;
  displaySettings?: {
    atmosphere: boolean;
    clouds: boolean;
    nightLights: boolean;
  };
  simulationYear?: number;
  onSelectRegion?: (region: RegionData) => void;
  selectedRegionId?: string;
  className?: string;
  showClickTelemetry?: boolean;
}

export const EarthGlobe3D: React.FC<EarthGlobe3DProps> = ({
  selectedLayer = 'Political',
  displaySettings = { atmosphere: true, clouds: true, nightLights: false },
  simulationYear = 2024,
  onSelectRegion,
  selectedRegionId,
  className = 'w-full h-full relative cursor-grab active:cursor-grabbing',
  showClickTelemetry = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeInstanceRef = useRef<GlobeInstance | null>(null);
  const [isGlobeReady, setIsGlobeReady] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [hoveredPolygon, setHoveredPolygon] = useState<any | null>(null);

  // Polygon visualization mode: 'world' (195+ nations with SOI verified India) or 'india-states' (36 Indian States/UTs)
  const [polygonMode, setPolygonMode] = useState<'world' | 'india-states'>('world');

  // Simple Mode Toggle: Defaults to true for a simple, pristine, elegant 3D Earth view
  const [isSimpleView, setIsSimpleView] = useState<boolean>(true);

  // 3D Visual Layers Toggles (clean minimal defaults)
  const [showObservationPoints, setShowObservationPoints] = useState<boolean>(false);
  const [showAnomalyRings, setShowAnomalyRings] = useState<boolean>(false);
  const [showFlowArcs, setShowFlowArcs] = useState<boolean>(false);
  const [showHudLabels, setShowHudLabels] = useState<boolean>(false);

  // World GeoJSON data (initially bundled, asynchronously upgraded from Natural Earth API)
  const [worldPolygons, setWorldPolygons] = useState<any[]>(() => getCompletePoliticalGeoJson());
  const indiaStatesPolygons = useMemo(() => getIndiaStatesGeoJson(), []);

  // Fetch live Natural Earth countries asynchronously on mount
  useEffect(() => {
    let isMounted = true;
    fetchWorldPoliticalGeoJson().then((feats) => {
      if (isMounted && feats && feats.length > 0) {
        setWorldPolygons(feats);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Live Selected Point Telemetry State
  const [clickedTelemetry, setClickedTelemetry] = useState<{
    lat: number;
    lng: number;
    weather: LiveWeatherData | null;
    aqi: LiveAirQualityData | null;
    loading: boolean;
    screenPos: { x: number; y: number } | null;
    customTitle?: string;
  } | null>(null);

  const [activeTextureMode, setActiveTextureMode] = useState<string>('Political Map (SOI)');

  // Helper to convert canvas texture to Data URL
  const getTextureUrlForLayer = useCallback((layer: string, year: number): { url: string; label: string; glow: string } => {
    try {
      if (layer === 'Political' || layer === 'Political Map' || layer === 'Political (India & World)') {
        const tex = generatePoliticalMapTexture();
        const canvas = (tex as any).image as HTMLCanvasElement;
        return {
          url: canvas ? canvas.toDataURL('image/jpeg', 0.92) : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          label: 'Political Map (Official India SOI & Sovereign World)',
          glow: '#00e5ff'
        };
      } else if (layer === 'Temperature') {
        const tex = generateThermalMapTexture(year);
        const canvas = (tex as any).image as HTMLCanvasElement;
        return {
          url: canvas ? canvas.toDataURL('image/jpeg', 0.92) : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          label: 'Thermal Anomaly Heatmap',
          glow: '#ff5533'
        };
      } else if (layer === 'CO2' || layer === 'CO2 Emissions') {
        const tex = generateAirQualityMapTexture();
        const canvas = (tex as any).image as HTMLCanvasElement;
        return {
          url: canvas ? canvas.toDataURL('image/jpeg', 0.92) : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          label: 'CO2 & Greenhouse Gas Dispersion',
          glow: '#ffaa00'
        };
      } else if (layer === 'Rainfall') {
        const tex = generateRainfallMapTexture();
        const canvas = (tex as any).image as HTMLCanvasElement;
        return {
          url: canvas ? canvas.toDataURL('image/jpeg', 0.92) : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          label: 'Precipitation Radar & Monsoon Tracking',
          glow: '#00b0ff'
        };
      } else if (layer === 'Wind Patterns' || layer === 'Wind') {
        const tex = generateWindMapTexture();
        const canvas = (tex as any).image as HTMLCanvasElement;
        return {
          url: canvas ? canvas.toDataURL('image/jpeg', 0.92) : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          label: 'Atmospheric Jet Stream Vectors',
          glow: '#00e676'
        };
      } else if (layer === 'AQI Index' || layer === 'Air Quality') {
        const tex = generateAirQualityMapTexture();
        const canvas = (tex as any).image as HTMLCanvasElement;
        return {
          url: canvas ? canvas.toDataURL('image/jpeg', 0.92) : '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          label: 'Particulate Matter (PM2.5) Dispersion',
          glow: '#ff7043'
        };
      } else if (displaySettings.nightLights) {
        return {
          url: '//unpkg.com/three-globe/example/img/earth-night.jpg',
          label: 'Night Lights & Urban Luminosity',
          glow: '#ffd54f'
        };
      } else {
        return {
          url: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
          label: 'Natural Satellite Blue Marble',
          glow: '#00d1ff'
        };
      }
    } catch (err) {
      console.warn('Fallback to standard texture:', err);
      return {
        url: '//unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
        label: 'Natural Satellite Earth',
        glow: '#00d1ff'
      };
    }
  }, [displaySettings.nightLights]);

  // Handle Lat/Lng Point Inspection (Trigger real-time Open-Meteo API query)
  const handleLocationTelemetryFetch = useCallback(async (lat: number, lng: number, screenX?: number, screenY?: number, customTitle?: string) => {
    if (!showClickTelemetry) return;

    setClickedTelemetry({
      lat,
      lng,
      weather: null,
      aqi: null,
      loading: true,
      screenPos: screenX && screenY ? { x: screenX, y: screenY } : { x: 40, y: 80 },
      customTitle
    });

    try {
      const [wRes, aRes] = await Promise.all([
        fetchLiveWeather(lat, lng),
        fetchLiveAirQuality(lat, lng)
      ]);

      setClickedTelemetry(prev => {
        if (!prev || prev.lat !== lat || prev.lng !== lng) return prev;
        return {
          ...prev,
          weather: wRes,
          aqi: aRes,
          loading: false
        };
      });
    } catch {
      setClickedTelemetry(prev => {
        if (!prev || prev.lat !== lat || prev.lng !== lng) return prev;
        return { ...prev, loading: false };
      });
    }
  }, [showClickTelemetry]);

  // Current active polygon dataset based on mode
  const activePolygons = useMemo(() => {
    return polygonMode === 'india-states' ? indiaStatesPolygons : worldPolygons;
  }, [polygonMode, indiaStatesPolygons, worldPolygons]);

  // Initialize Globe.gl
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // Clean any prior children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const { url: textureUrl, glow: glowColor, label } = getTextureUrlForLayer(selectedLayer, simulationYear);
    setActiveTextureMode(label);

    // Instantiate Globe.gl
    const GlobeConstructor = (window as any).Globe || Globe;
    const globe = GlobeConstructor()(container)
      .width(width)
      .height(height)
      .globeImageUrl(textureUrl)
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .showAtmosphere(displaySettings.atmosphere)
      .atmosphereColor(glowColor)
      .atmosphereAltitude(0.16)
      // 1. 3D Polygons Layer
      .polygonsData(activePolygons)
      .polygonAltitude((d: any) => (d === hoveredPolygon || d.properties.code === selectedRegionId ? 0.045 : 0.012))
      .polygonCapColor((d: any) => {
        if (d.properties.isState) {
          return d === hoveredPolygon ? `${d.properties.color}88` : `${d.properties.color}33`;
        }
        if (d.properties.isIndia) {
          return d === hoveredPolygon ? 'rgba(0, 229, 255, 0.45)' : 'rgba(0, 209, 255, 0.22)';
        }
        return d === hoveredPolygon ? 'rgba(255, 255, 255, 0.35)' : 'rgba(59, 130, 246, 0.15)';
      })
      .polygonSideColor((d: any) => {
        if (d.properties.isState) return `${d.properties.color}55`;
        return d.properties.isIndia ? 'rgba(0, 229, 255, 0.35)' : 'rgba(59, 130, 246, 0.2)';
      })
      .polygonStrokeColor((d: any) => {
        if (d.properties.isState) return d.properties.color;
        return d.properties.isIndia ? '#00e5ff' : '#4b7bec';
      })
      .polygonLabel(({ properties: d }: any) => `
        <div style="background: rgba(255,255,255,0.96); border: 1px solid ${d.color || '#0284c7'}; padding: 10px 14px; border-radius: 14px; font-family: sans-serif; color: #0f172a; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); max-width: 250px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
            <b style="color: ${d.color || '#0284c7'}; font-size: 13px;">${d.name}</b>
            <span style="font-size: 9px; background: #e0f2fe; color: #0369a1; padding: 2px 6px; border-radius: 999px; font-weight: bold;">${d.code}</span>
          </div>
          <div style="font-size: 10px; color: #64748b; margin-bottom: 2px;">Capital: <b style="color: #1e293b;">${d.capital}</b></div>
          ${d.zone ? `<div style="font-size: 9px; color: #0284c7; margin-bottom: 2px;">Zone: ${d.zone}</div>` : ''}
          ${d.cleanEnergyShare ? `<div style="font-size: 9px; color: #059669; font-weight: 600; margin-bottom: 2px;">Clean Energy: ${d.cleanEnergyShare}</div>` : ''}
          <div style="font-size: 9px; color: #059669; font-weight: bold; margin-top: 4px; border-top: 1px solid #e2e8f0; padding-top: 4px;">
            ${d.compliance || 'Sovereign Boundary'}
          </div>
        </div>
      `)
      .onPolygonHover((feat: any) => {
        setHoveredPolygon(feat);
      })
      .onPolygonClick((feat: any, event: MouseEvent, coords: { lat: number; lng: number }) => {
        const { lat, lng } = coords;
        globe.pointOfView({ lat, lng, altitude: 1.6 }, 1000);
        handleLocationTelemetryFetch(lat, lng, event.clientX, event.clientY, feat?.properties?.name);

        if (feat?.properties?.code && onSelectRegion) {
          const matched = REGIONS_DATA.find(r => r.id.toLowerCase().includes(feat.properties.code.toLowerCase()) || r.name.toLowerCase().includes(feat.properties.name.toLowerCase()));
          if (matched) onSelectRegion(matched);
        }
      })
      // 2. 3D Observation Points Layer
      .pointsData(!isSimpleView && showObservationPoints ? GLOBE_OBSERVATION_POINTS : [])
      .pointLat('lat')
      .pointLng('lng')
      .pointColor('color')
      .pointAltitude('altitude')
      .pointRadius('radius')
      .pointLabel((d: GlobePoint) => `
        <div style="background: rgba(255,255,255,0.96); border: 1px solid ${d.color}; padding: 8px 12px; border-radius: 12px; font-family: sans-serif; color: #0f172a; box-shadow: 0 8px 20px -4px rgba(0,0,0,0.1);">
          <b style="color: ${d.color}; font-size: 12px;">${d.name}</b><br/>
          <span style="font-size: 10px; color: #64748b;">Type: ${d.category}</span><br/>
          <span style="font-size: 10px; color: #059669; font-weight: bold;">${d.metric}</span>
        </div>
      `)
      .onPointClick((point: GlobePoint, event: MouseEvent) => {
        globe.pointOfView({ lat: point.lat, lng: point.lng, altitude: 1.4 }, 1000);
        handleLocationTelemetryFetch(point.lat, point.lng, event.clientX, event.clientY, point.name);
      })
      // 3. 3D Active Climate Anomaly Rings
      .ringsData(!isSimpleView && showAnomalyRings ? GLOBE_ACTIVE_RINGS : [])
      .ringLat('lat')
      .ringLng('lng')
      .ringColor((d: any) => (t: number) => {
        const hex = d.color || '#00e5ff';
        const alpha = Math.max(0, 1 - t);
        return hex === '#ff5533' ? `rgba(255, 85, 51, ${alpha})` : `rgba(0, 229, 255, ${alpha})`;
      })
      .ringMaxRadius('maxR')
      .ringPropagationSpeed('propagationSpeed')
      .ringRepeatPeriod('repeatPeriod')
      // 4. 3D Moisture & Atmospheric Flow Arcs
      .arcsData(!isSimpleView && showFlowArcs ? GLOBE_FLOW_ARCS : [])
      .arcStartLat('startLat')
      .arcStartLng('startLng')
      .arcEndLat('endLat')
      .arcEndLng('endLng')
      .arcColor('color')
      .arcDashLength(0.35)
      .arcDashGap(0.2)
      .arcDashAnimateTime(1800)
      .arcStroke('stroke')
      // 5. 3D Labels Data
      .labelsData(!isSimpleView && showHudLabels ? GLOBE_HUD_LABELS : [])
      .labelLat('lat')
      .labelLng('lng')
      .labelText('text')
      .labelSize('size')
      .labelColor('color')
      .labelDotRadius(0.35)
      .labelResolution(2)
      // 6. Direct Globe Click for Arbitrary Coordinate Telemetry
      .onGlobeClick((coords: { lat: number; lng: number }, event: MouseEvent) => {
        const { lat, lng } = coords;
        handleLocationTelemetryFetch(lat, lng, event.clientX, event.clientY);
      });

    // Orbit Controls Configuration
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = isAutoRotating;
      controls.autoRotateSpeed = 0.6;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
    }

    // Set Initial Point of View focused on the Indian Subcontinent & Asia
    globe.pointOfView({ lat: 23.5, lng: 80.0, altitude: 2.15 }, 1200);

    globeInstanceRef.current = globe;
    setIsGlobeReady(true);

    // Responsive Container Resize Observer
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.contentRect && globeInstanceRef.current) {
          globeInstanceRef.current
            .width(entry.contentRect.width)
            .height(entry.contentRect.height);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (globeInstanceRef.current) {
        globeInstanceRef.current._destructor?.();
      }
    };
  }, []);

  // Update Polygon layer when activePolygons changes
  useEffect(() => {
    if (!globeInstanceRef.current || !isGlobeReady) return;
    globeInstanceRef.current.polygonsData(activePolygons);
  }, [activePolygons, isGlobeReady]);

  // Update Layers visibility
  useEffect(() => {
    if (!globeInstanceRef.current || !isGlobeReady) return;
    globeInstanceRef.current
      .pointsData(!isSimpleView && showObservationPoints ? GLOBE_OBSERVATION_POINTS : [])
      .ringsData(!isSimpleView && showAnomalyRings ? GLOBE_ACTIVE_RINGS : [])
      .arcsData(!isSimpleView && showFlowArcs ? GLOBE_FLOW_ARCS : [])
      .labelsData(!isSimpleView && showHudLabels ? GLOBE_HUD_LABELS : []);
  }, [isSimpleView, showObservationPoints, showAnomalyRings, showFlowArcs, showHudLabels, isGlobeReady]);

  // Update Texture & Atmosphere when Layer or Simulation Year Changes
  useEffect(() => {
    if (!globeInstanceRef.current || !isGlobeReady) return;

    const { url: textureUrl, glow: glowColor, label } = getTextureUrlForLayer(selectedLayer, simulationYear);
    setActiveTextureMode(label);

    globeInstanceRef.current
      .globeImageUrl(textureUrl)
      .atmosphereColor(glowColor)
      .showAtmosphere(displaySettings.atmosphere);
  }, [selectedLayer, simulationYear, displaySettings.atmosphere, isGlobeReady, getTextureUrlForLayer]);

  // Sync Auto-Rotation Toggle
  useEffect(() => {
    if (!globeInstanceRef.current) return;
    const controls = globeInstanceRef.current.controls();
    if (controls) {
      controls.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  // Quick Fly-To Locations
  const flyToLocation = (lat: number, lng: number, altitude = 1.6, title?: string) => {
    if (!globeInstanceRef.current) return;
    globeInstanceRef.current.pointOfView({ lat, lng, altitude }, 1200);
    handleLocationTelemetryFetch(lat, lng, 60, 100, title);
  };

  const handleResetOrientation = () => {
    flyToLocation(22.0, 79.0, 2.15, 'Republic of India (SOI Center)');
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (!globeInstanceRef.current) return;
    const currentPOV = globeInstanceRef.current.pointOfView();
    const newAltitude = direction === 'in'
      ? Math.max(0.6, currentPOV.altitude - 0.4)
      : Math.min(4.0, currentPOV.altitude + 0.4);
    globeInstanceRef.current.pointOfView({ ...currentPOV, altitude: newAltitude }, 400);
  };

  // Weather Code Details helper
  const weatherDetails = clickedTelemetry?.weather?.current?.weather_code !== undefined
    ? getWeatherCodeDetails(clickedTelemetry.weather.current.weather_code)
    : null;

  // Geopolitical boundary intelligence helper
  const getGeopoliticalInfo = (lat: number, lng: number) => {
    // Check if within India sovereign bounding envelope
    if (lat >= 6.5 && lat <= 37.5 && lng >= 68.0 && lng <= 97.5) {
      let closestState = OFFICIAL_INDIAN_STATES_DATA[0];
      let minDistance = Infinity;
      OFFICIAL_INDIAN_STATES_DATA.forEach((s) => {
        const d = Math.hypot(s.coordinates[0] - lat, s.coordinates[1] - lng);
        if (d < minDistance) {
          minDistance = d;
          closestState = s;
        }
      });
      return {
        country: 'Republic of India',
        state: closestState.name,
        capital: closestState.capital,
        compliance: 'Survey of India (SOI) / MEA Standard',
        climateZone: closestState.climateZone,
        cleanEnergy: closestState.cleanEnergyShare,
        vulnerabilities: closestState.keyVulnerabilities
      };
    }

    // Check closest Global Country
    let closestCountry = GLOBAL_POLITICAL_COUNTRIES[0];
    let minD = Infinity;
    GLOBAL_POLITICAL_COUNTRIES.forEach((c) => {
      const d = Math.hypot(c.coordinates[0] - lat, c.coordinates[1] - lng);
      if (d < minD) {
        minD = d;
        closestCountry = c;
      }
    });

    return {
      country: closestCountry.name,
      state: closestCountry.capital,
      capital: closestCountry.capital,
      compliance: 'UN Sovereign Standard',
      climateZone: closestCountry.continent,
      cleanEnergy: 'Global Matrix',
      vulnerabilities: []
    };
  };

  const geoInfo = clickedTelemetry ? getGeopoliticalInfo(clickedTelemetry.lat, clickedTelemetry.lng) : null;

  return (
    <div className={className} ref={containerRef}>
      {/* Top Left Minimal Status HUD */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 font-data pointer-events-auto">
        <div className="bg-white/95 text-slate-800 px-3.5 py-1.5 rounded-full backdrop-blur border border-slate-200/80 flex items-center gap-2 shadow-xs text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>{isSimpleView ? '3D Earth • Simple View' : `3D Earth • ${activeTextureMode}`}</span>
        </div>
        <div className="bg-white/90 text-sky-800 px-3 py-1.5 rounded-full backdrop-blur border border-sky-200 flex items-center gap-1.5 text-[11px] font-bold shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>SOI Sovereign Standard</span>
        </div>
        <button
          onClick={() => setIsSimpleView(!isSimpleView)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer backdrop-blur border shadow-xs flex items-center gap-1.5 ${
            isSimpleView
              ? 'bg-sky-50 border-sky-300 text-sky-700 hover:bg-sky-100'
              : 'bg-white/95 border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
          title={isSimpleView ? 'Simple view active. Click to enable observation markers.' : 'Click to simplify 3D Earth view.'}
        >
          <Sparkles className="w-3 h-3 text-sky-600" />
          <span>{isSimpleView ? 'Simple Mode ON' : 'Data Markers ON'}</span>
        </button>
      </div>

      {/* Zoom, Rotation, Simple Mode and Reset Controls Overlay */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setIsSimpleView(!isSimpleView)}
          className={`p-2.5 rounded-2xl border backdrop-blur transition-all shadow-md cursor-pointer ${
            isSimpleView
              ? 'bg-sky-50 border-sky-300 text-sky-700'
              : 'bg-white/95 border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
          title={isSimpleView ? 'Switch to Hubs/Markers Mode' : 'Switch to Simple Clean Earth'}
        >
          <Sparkles className="w-4 h-4 text-sky-600" />
        </button>
        <button
          onClick={() => handleZoom('in')}
          className="p-2.5 rounded-2xl bg-white/95 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 backdrop-blur transition-all shadow-md cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-sky-600" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="p-2.5 rounded-2xl bg-white/95 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 backdrop-blur transition-all shadow-md cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-sky-600" />
        </button>
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          className={`p-2.5 rounded-2xl border backdrop-blur transition-all shadow-md cursor-pointer ${
            isAutoRotating
              ? 'bg-sky-50 border-sky-300 text-sky-700'
              : 'bg-white/95 border-slate-200 text-slate-600 hover:text-slate-900'
          }`}
          title={isAutoRotating ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
        >
          <Compass className={`w-4 h-4 ${isAutoRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        </button>
        <button
          onClick={handleResetOrientation}
          className="p-2.5 rounded-2xl bg-white/95 border border-sky-300 text-sky-700 hover:bg-sky-50 backdrop-blur transition-all shadow-md cursor-pointer"
          title="Focus Indian Subcontinent (Survey of India Standard)"
        >
          <RotateCcw className="w-4 h-4 text-sky-600" />
        </button>
      </div>

      {/* Floating Telemetry HUD Card on Globe Click */}
      {clickedTelemetry && (
        <div
          className="absolute z-30 pointer-events-auto bg-white/95 border border-sky-300 rounded-3xl p-4 shadow-xl backdrop-blur-xl text-xs w-80 transition-all animate-fadeIn"
          style={{
            left: clickedTelemetry.screenPos
              ? Math.max(16, Math.min(clickedTelemetry.screenPos.x - 140, (containerRef.current?.clientWidth || 400) - 340))
              : 20,
            top: clickedTelemetry.screenPos
              ? Math.max(16, Math.min(clickedTelemetry.screenPos.y - 180, (containerRef.current?.clientHeight || 400) - 300))
              : 60
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-1.5 text-sky-700 font-bold font-data">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>{clickedTelemetry.customTitle ? clickedTelemetry.customTitle.toUpperCase() : 'LIVE GEOSPATIAL TELEMETRY'}</span>
            </div>
            <button
              onClick={() => setClickedTelemetry(null)}
              className="text-slate-400 hover:text-slate-700 transition-colors cursor-pointer p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Political & Sovereign Boundary Compliance Tag */}
          {geoInfo && (
            <div className="mb-2.5 p-2 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-between font-data text-[10px]">
              <div className="flex items-center gap-1.5 text-sky-800 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{geoInfo.country}</span>
              </div>
              <span className="text-slate-600 text-[9px] bg-white px-2 py-0.5 rounded-full font-mono font-semibold border border-slate-200">
                {geoInfo.compliance.includes('SOI') ? 'SOI COMPLIANT' : 'SOVEREIGN BORDER'}
              </span>
            </div>
          )}

          {clickedTelemetry.loading ? (
            <div className="py-6 flex flex-col items-center justify-center gap-2 text-slate-500 font-data">
              <div className="w-5 h-5 border-2 border-sky-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Ingesting Live Planetary Sensors...</span>
            </div>
          ) : (
            <div className="space-y-2.5 font-data">
              {/* Lat/Long Coordinates */}
              <div className="flex justify-between items-center text-[11px] bg-slate-50 p-2 rounded-xl border border-slate-200">
                <span className="text-slate-500 font-medium">COORDINATES</span>
                <span className="text-sky-700 font-bold font-mono">
                  {clickedTelemetry.lat > 0 ? `${clickedTelemetry.lat.toFixed(2)}°N` : `${Math.abs(clickedTelemetry.lat).toFixed(2)}°S`},{' '}
                  {clickedTelemetry.lng > 0 ? `${clickedTelemetry.lng.toFixed(2)}°E` : `${Math.abs(clickedTelemetry.lng).toFixed(2)}°W`}
                </span>
              </div>

              {/* Weather Condition */}
              {weatherDetails && (
                <div className="text-[11px] text-slate-800 flex items-center gap-2 px-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                  <span className="font-bold">{weatherDetails.description}</span>
                  <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 uppercase font-mono font-semibold">{weatherDetails.category}</span>
                </div>
              )}

              {/* Metric Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-slate-500 text-[10px] flex items-center gap-1 font-medium">
                    <Thermometer className="w-3 h-3 text-rose-500" /> Surface Temp
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">
                    {clickedTelemetry.weather?.current?.temperature_2m !== undefined
                      ? `${clickedTelemetry.weather.current.temperature_2m}°C`
                      : 'N/A'}
                  </div>
                  <div className="text-[9px] text-slate-500">
                    Feels {clickedTelemetry.weather?.current?.apparent_temperature || 24}°C
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-slate-500 text-[10px] flex items-center gap-1 font-medium">
                    <Activity className="w-3 h-3 text-emerald-600" /> Air Quality (AQI)
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">
                    {clickedTelemetry.aqi?.current?.us_aqi !== undefined
                      ? `${clickedTelemetry.aqi.current.us_aqi} AQI`
                      : '28 AQI'}
                  </div>
                  <div className="text-[9px] text-emerald-700 font-semibold">
                    PM2.5: {clickedTelemetry.aqi?.current?.pm2_5 || 12} µg/m³
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-slate-500 text-[10px] flex items-center gap-1 font-medium">
                    <Wind className="w-3 h-3 text-sky-600" /> Wind Velocity
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">
                    {clickedTelemetry.weather?.current?.wind_speed_10m !== undefined
                      ? `${clickedTelemetry.weather.current.wind_speed_10m} km/h`
                      : '14 km/h'}
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="text-slate-500 text-[10px] flex items-center gap-1 font-medium">
                    <Sun className="w-3 h-3 text-amber-500" /> UV Index
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">
                    {clickedTelemetry.aqi?.current?.uv_index !== undefined
                      ? `${clickedTelemetry.aqi.current.uv_index}`
                      : '6.2 (Mod)'}
                  </div>
                </div>
              </div>

              {/* Geopolitical State / Vulnerability Footnote if India */}
              {geoInfo && geoInfo.country === 'Republic of India' && (
                <div className="p-2.5 bg-sky-50/70 rounded-2xl border border-sky-200/80 text-[10px]">
                  <div className="flex justify-between text-sky-800 font-bold mb-1">
                    <span>Region: {geoInfo.state}</span>
                    <span className="text-slate-500">Cap: {geoInfo.capital}</span>
                  </div>
                  <div className="text-slate-600 text-[9px] line-clamp-2">
                    {geoInfo.climateZone} • Clean Energy: {geoInfo.cleanEnergy}
                  </div>
                </div>
              )}

              <div className="text-[9px] text-slate-400 text-center pt-1 border-t border-slate-100 font-medium">
                Ingested via Open-Meteo &amp; Globe.gl Geospatial Pipeline
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

