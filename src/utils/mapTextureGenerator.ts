/**
 * Canvas-based Equirectangular Earth Map Texture Generator for Three.js 3D Globe
 * Produces high-resolution, scientifically accurate planetary maps and layer variations:
 * - Natural Satellite / Blue Marble with Biomes
 * - Thermal Anomaly Heatmap (Temperature bands & Isotherms)
 * - Precipitation / Cloud Moisture Radar
 * - Air Quality / PM2.5 Pollution Dispersion
 * - Atmospheric Wind Vectors
 * - Night Lights (City Luminosity)
 */

import * as THREE from 'three';
import {
  OFFICIAL_INDIA_BOUNDARY_COORDS,
  ANDAMAN_NICOBAR_COORDS,
  LAKSHADWEEP_COORDS,
  GLOBAL_POLITICAL_COUNTRIES,
  OFFICIAL_INDIAN_STATES_DATA
} from '../services/politicalMapService';

const WIDTH = 2048;
const HEIGHT = 1024;

// Helper: Convert Lat/Lng (-90..90, -180..180) to Equirectangular Canvas (x, y)
export function latLngToCanvasXY(lat: number, lng: number, width = WIDTH, height = HEIGHT): { x: number; y: number } {
  const x = ((lng + 180) / 360) * width;
  const y = ((90 - lat) / 180) * height;
  return { x, y };
}

/**
 * Draw accurate global landmasses & coastlines onto an HTML5 2D canvas
 */
function drawWorldLandmasses(ctx: CanvasRenderingContext2D, width: number, height: number, style: {
  landColor: string;
  mountainColor?: string;
  desertColor?: string;
  iceColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
}) {
  const scaleX = width / 360;
  const scaleY = height / 180;

  const toXY = (lng: number, lat: number) => {
    return [(lng + 180) * scaleX, (90 - lat) * scaleY];
  };

  ctx.fillStyle = style.landColor;
  if (style.strokeColor) {
    ctx.strokeStyle = style.strokeColor;
    ctx.lineWidth = style.strokeWidth || 1;
  }

  // Draw polygon helper
  const drawPoly = (coords: number[][], fill = true, stroke = true) => {
    if (coords.length < 3) return;
    ctx.beginPath();
    const [startLng, startLat] = coords[0];
    const [startX, startY] = toXY(startLng, startLat);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < coords.length; i++) {
      const [lng, lat] = coords[i];
      const [x, y] = toXY(lng, lat);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke && style.strokeColor) ctx.stroke();
  };

  // 1. NORTH AMERICA & CENTRAL AMERICA
  drawPoly([
    [-168, 65], [-160, 71], [-140, 70], [-120, 69], [-85, 70], [-70, 62],
    [-60, 50], [-65, 44], [-75, 35], [-80, 25], [-82, 9], [-77, 8],
    [-84, 10], [-90, 15], [-97, 20], [-97, 26], [-105, 23], [-110, 30],
    [-118, 34], [-124, 40], [-125, 48], [-135, 57], [-150, 60], [-165, 60]
  ]);

  // Alaska peninsula
  drawPoly([[-165, 60], [-155, 58], [-168, 54], [-168, 65]]);

  // 2. GREENLAND
  if (style.iceColor) ctx.fillStyle = style.iceColor;
  drawPoly([
    [-45, 83], [-20, 81], [-18, 76], [-25, 70], [-43, 60], [-52, 60], [-58, 70], [-70, 78], [-58, 83]
  ]);
  ctx.fillStyle = style.landColor;

  // 3. SOUTH AMERICA
  drawPoly([
    [-77, 8], [-60, 10], [-50, 0], [-35, -5], [-35, -12], [-40, -22],
    [-50, -30], [-55, -40], [-65, -55], [-75, -50], [-73, -40], [-70, -20],
    [-80, -5], [-80, 2], [-77, 8]
  ]);

  // 4. EURASIA (Europe, Russia, China, Central Asia)
  drawPoly([
    [-10, 36], [0, 42], [5, 44], [10, 54], [5, 60], [15, 60], [25, 70],
    [40, 68], [60, 70], [80, 73], [105, 77], [130, 73], [170, 66], [180, 65],
    [170, 60], [160, 53], [140, 50], [130, 42], [122, 30], [118, 22],
    [108, 18], [105, 10], [100, 5], [98, 10], [92, 22], [88, 22],
    [80, 10], [77, 8], [72, 20], [68, 24], [60, 25], [55, 25],
    [50, 30], [42, 30], [35, 32], [28, 41], [15, 40], [0, 38], [-9, 38]
  ]);

  // Scandinavian Peninsula
  drawPoly([[5, 60], [12, 56], [18, 59], [28, 71], [15, 70], [5, 62]]);

  // British Isles & Ireland
  drawPoly([[-5, 50], [2, 52], [0, 58], [-5, 58], [-5, 50]]);
  drawPoly([[-10, 51], [-6, 52], [-6, 55], [-10, 54]]);

  // 5. AFRICA
  drawPoly([
    [-17, 15], [-17, 28], [-5, 36], [10, 37], [25, 32], [32, 31],
    [34, 28], [42, 12], [51, 12], [45, 0], [40, -10], [35, -25],
    [30, -32], [20, -35], [17, -33], [12, -18], [10, -5], [0, 5],
    [-10, 5], [-15, 12]
  ]);

  // Madagascar
  drawPoly([[44, -12], [50, -14], [47, -25], [43, -25]]);

  // 6. INDIAN SUBCONTINENT (Official Survey of India / MEA Standard)
  drawPoly(OFFICIAL_INDIA_BOUNDARY_COORDS);

  // Andaman & Nicobar Archipelago
  ANDAMAN_NICOBAR_COORDS.forEach((island) => drawPoly(island));

  // Lakshadweep Archipelago
  LAKSHADWEEP_COORDS.forEach((island) => drawPoly(island));

  // Sri Lanka
  drawPoly([[80, 9.5], [81.8, 8], [80.5, 6], [79.5, 8]]);

  // 7. JAPAN
  drawPoly([[130, 32], [133, 34], [140, 36], [141, 43], [145, 44], [140, 39], [132, 33]]);

  // 8. SOUTHEAST ASIA & INDONESIAN ARCHIPELAGO
  drawPoly([[98, 10], [103, 2], [104, -5], [100, 0], [98, 6]]); // Malay Peninsula
  drawPoly([[96, 5], [105, -5], [102, -5], [96, 2]]); // Sumatra
  drawPoly([[106, -6], [114, -8], [112, -7], [106, -6]]); // Java
  drawPoly([[110, 5], [118, 5], [117, -3], [109, 0]]); // Borneo
  drawPoly([[120, 18], [126, 12], [122, 7], [120, 14]]); // Philippines

  // 9. AUSTRALIA & PAPUA NEW GUINEA
  drawPoly([
    [114, -22], [122, -15], [130, -12], [136, -12], [142, -10],
    [146, -18], [153, -28], [150, -37], [140, -38], [130, -32],
    [118, -35], [114, -30], [113, -24]
  ]);
  // Tasmania
  drawPoly([[145, -41], [148, -41], [147, -43], [144, -43]]);
  // New Zealand
  drawPoly([[173, -35], [178, -38], [175, -41], [172, -37]]);
  drawPoly([[167, -44], [171, -43], [174, -46], [168, -46]]);
  // Papua New Guinea
  drawPoly([[131, -1], [141, -3], [150, -10], [142, -8], [132, -4]]);

  // 10. ANTARCTICA
  if (style.iceColor) ctx.fillStyle = style.iceColor;
  drawPoly([
    [-180, -90], [-180, -75], [-120, -74], [-70, -64], [-55, -63],
    [-20, -72], [20, -70], [70, -66], [110, -66], [140, -66],
    [170, -72], [180, -75], [180, -90]
  ]);

  // Desert regions overlay
  if (style.desertColor) {
    ctx.fillStyle = style.desertColor;
    // Sahara & Arabian Deserts
    drawPoly([[-14, 28], [35, 30], [55, 25], [52, 18], [32, 16], [-10, 16]], true, false);
    // Gobi & Central Asian Deserts
    drawPoly([[75, 45], [110, 44], [105, 38], [80, 38]], true, false);
    // Australian Outback
    drawPoly([[120, -22], [140, -22], [138, -30], [122, -30]], true, false);
    // Atacama & Patagonia
    drawPoly([[-70, -20], [-68, -26], [-69, -35], [-72, -22]], true, false);
    // Kalahari
    drawPoly([[18, -22], [28, -22], [26, -28], [20, -28]], true, false);
  }
}

/**
 * Draw planetary graticules (Latitude & Longitude coordinate grid)
 */
function drawGraticules(ctx: CanvasRenderingContext2D, width: number, height: number, color = 'rgba(0, 209, 255, 0.12)') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;

  // Latitudes
  for (let lat = -80; lat <= 80; lat += 20) {
    const y = ((90 - lat) / 180) * height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Equator highlight
  ctx.strokeStyle = 'rgba(0, 209, 255, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();

  // Longitudes
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let lng = -180; lng <= 180; lng += 30) {
    const x = ((lng + 180) / 360) * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  // Prime Meridian & Date Line
  ctx.strokeStyle = 'rgba(0, 209, 255, 0.28)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2, 0);
  ctx.lineTo(width / 2, height);
  ctx.stroke();
}

/**
 * 1. Generate Realistic Natural Satellite / Blue Marble Earth Texture
 */
export function generateNaturalEarthTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d')!;

  // Deep ocean gradient
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  oceanGrad.addColorStop(0, '#041224');
  oceanGrad.addColorStop(0.2, '#061a32');
  oceanGrad.addColorStop(0.5, '#0a2544');
  oceanGrad.addColorStop(0.8, '#061a32');
  oceanGrad.addColorStop(1, '#041224');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Ocean Bathymetric Shallows (Coastal cyan glow around landmasses)
  drawWorldLandmasses(ctx, WIDTH, HEIGHT, {
    landColor: 'rgba(0, 160, 210, 0.25)',
    strokeColor: 'rgba(0, 209, 255, 0.45)',
    strokeWidth: 8
  });

  // Base Continents with Biomes (Rainforests, Deserts, Ice)
  drawWorldLandmasses(ctx, WIDTH, HEIGHT, {
    landColor: '#122f28', // Lush temperate green
    desertColor: '#4d3d24', // Desert golden brown
    iceColor: '#e0f0fa', // Glacial ice white
    strokeColor: '#00e5ff',
    strokeWidth: 1.5
  });

  // Lat / Lng Grid
  drawGraticules(ctx, WIDTH, HEIGHT, 'rgba(0, 209, 255, 0.15)');

  // Fine cyber grid dots
  ctx.fillStyle = 'rgba(0, 209, 255, 0.2)';
  for (let x = 0; x < WIDTH; x += 32) {
    for (let y = 0; y < HEIGHT; y += 32) {
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 2. Generate Thermal Anomaly / Temperature Heatmap Texture
 */
export function generateThermalMapTexture(simulationYear = 2024): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d')!;

  const yearFactor = Math.min(1.0, Math.max(0.0, (simulationYear - 1900) / 126));

  // Thermal Gradient background (Polar blue -> Temperate green -> Tropical red/magenta)
  const grad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  grad.addColorStop(0.0, '#001a4d'); // North Pole icy blue
  grad.addColorStop(0.15, '#004c99'); // Subpolar cool blue
  grad.addColorStop(0.3, '#008080'); // Temperate green
  grad.addColorStop(0.42, '#b38600'); // Subtropical yellow-orange
  grad.addColorStop(0.5, yearFactor > 0.6 ? '#cc1100' : '#b32400'); // Equator hot red
  grad.addColorStop(0.58, '#b38600');
  grad.addColorStop(0.7, '#008080');
  grad.addColorStop(0.85, '#004c99');
  grad.addColorStop(1.0, '#001a4d'); // South Pole deep cold

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw landmass thermal contours
  drawWorldLandmasses(ctx, WIDTH, HEIGHT, {
    landColor: 'rgba(255, 120, 0, 0.22)',
    desertColor: 'rgba(255, 40, 0, 0.45)', // Extreme heat in deserts
    iceColor: 'rgba(0, 200, 255, 0.35)',
    strokeColor: 'rgba(255, 215, 0, 0.6)',
    strokeWidth: 1.5
  });

  // Heatwave hotspots (Sahara, Arabian Peninsula, Thar Desert, Central Australia, Western US)
  const hotspots = [
    { lng: 15, lat: 25, r: 120, intensity: 0.75 }, // Sahara Heat Dome
    { lng: 45, lat: 24, r: 90, intensity: 0.8 }, // Arabian Peninsula
    { lng: 75, lat: 26, r: 80, intensity: 0.85 }, // Thar / North India
    { lng: 135, lat: -25, r: 100, intensity: 0.7 }, // Australian Outback
    { lng: -115, lat: 35, r: 70, intensity: 0.65 }, // Mojave / US Southwest
    { lng: -60, lat: -5, r: 85, intensity: 0.55 }, // Amazon basin thermal anomaly
    { lng: 100, lat: 65, r: 110, intensity: 0.5 + yearFactor * 0.4 } // Siberian Arctic amplification
  ];

  hotspots.forEach((spot) => {
    const { x, y } = latLngToCanvasXY(spot.lat, spot.lng, WIDTH, HEIGHT);
    const radial = ctx.createRadialGradient(x, y, 5, x, y, spot.r);
    radial.addColorStop(0, `rgba(255, 0, 80, ${spot.intensity})`);
    radial.addColorStop(0.5, `rgba(255, 140, 0, ${spot.intensity * 0.6})`);
    radial.addColorStop(1, 'rgba(255, 200, 0, 0)');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(x, y, spot.r, 0, Math.PI * 2);
    ctx.fill();
  });

  // Isotherm lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.setLineDash([6, 6]);
  for (let lat of [-45, -23.5, 0, 23.5, 45, 66.5]) {
    const y = ((90 - lat) / 180) * HEIGHT;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(WIDTH, y);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  drawGraticules(ctx, WIDTH, HEIGHT, 'rgba(255, 255, 255, 0.1)');

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 3. Generate Wind Vectors & Atmospheric Jet Stream Texture
 */
export function generateWindMapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#05121e';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Subtle land outlines
  drawWorldLandmasses(ctx, WIDTH, HEIGHT, {
    landColor: 'rgba(10, 35, 55, 0.7)',
    strokeColor: 'rgba(0, 209, 255, 0.3)',
    strokeWidth: 1
  });

  // Draw animated-style atmospheric streamlines
  ctx.strokeStyle = 'rgba(0, 230, 255, 0.35)';
  ctx.lineWidth = 1.5;

  // Mid-latitude Jet Streams (Wave-like sin patterns)
  for (let offset = 0; offset < HEIGHT; offset += 30) {
    ctx.beginPath();
    const latBase = 90 - (offset / HEIGHT) * 180;
    const isWesterlies = Math.abs(latBase) > 30 && Math.abs(latBase) < 60;
    const isTradeWind = Math.abs(latBase) < 30;

    for (let x = 0; x < WIDTH; x += 10) {
      const lng = (x / WIDTH) * 360 - 180;
      const wave = Math.sin((lng / 180) * Math.PI * 4) * 18;
      const y = offset + wave;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = isWesterlies
      ? 'rgba(0, 255, 200, 0.45)'
      : isTradeWind
      ? 'rgba(0, 180, 255, 0.35)'
      : 'rgba(100, 150, 255, 0.25)';
    ctx.stroke();
  }

  // Draw wind vector arrows
  ctx.fillStyle = 'rgba(0, 255, 200, 0.7)';
  for (let x = 40; x < WIDTH; x += 64) {
    for (let y = 30; y < HEIGHT; y += 48) {
      const lat = 90 - (y / HEIGHT) * 180;
      const dir = lat > 0 && lat < 30 ? -Math.PI * 0.8 : lat >= 30 && lat <= 60 ? Math.PI * 0.2 : 0;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(dir);
      ctx.beginPath();
      ctx.moveTo(-6, -2);
      ctx.lineTo(6, 0);
      ctx.lineTo(-6, 2);
      ctx.fill();
      ctx.restore();
    }
  }

  drawGraticules(ctx, WIDTH, HEIGHT, 'rgba(0, 209, 255, 0.12)');

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 4. Generate Precipitation & Rain Radar Texture
 */
export function generateRainfallMapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#061320';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Land outlines
  drawWorldLandmasses(ctx, WIDTH, HEIGHT, {
    landColor: 'rgba(15, 30, 48, 0.8)',
    strokeColor: 'rgba(0, 209, 255, 0.25)',
    strokeWidth: 1
  });

  // Tropical Rain Belt (ITCZ - Intertropical Convergence Zone) along equator
  const itczY = HEIGHT / 2;
  const itczGrad = ctx.createLinearGradient(0, itczY - 60, 0, itczY + 60);
  itczGrad.addColorStop(0, 'rgba(0, 150, 255, 0)');
  itczGrad.addColorStop(0.5, 'rgba(0, 200, 255, 0.55)');
  itczGrad.addColorStop(1, 'rgba(0, 150, 255, 0)');
  ctx.fillStyle = itczGrad;
  ctx.fillRect(0, itczY - 60, WIDTH, 120);

  // Heavy Monsoon & Storm Clusters (Bay of Bengal, Western Pacific, Amazon, Congo, Gulf of Mexico)
  const stormCells = [
    { lng: 88, lat: 20, r: 85, color: 'rgba(0, 255, 120, 0.7)' }, // South Asian Monsoon vortex
    { lng: 130, lat: 15, r: 100, color: 'rgba(0, 220, 255, 0.65)' }, // Western Pacific Typhoon corridor
    { lng: -65, lat: -3, r: 110, color: 'rgba(0, 240, 180, 0.6)' }, // Amazon Rainforest convective rain
    { lng: 22, lat: 0, r: 80, color: 'rgba(0, 200, 255, 0.55)' }, // Congo Basin
    { lng: -88, lat: 25, r: 75, color: 'rgba(0, 255, 150, 0.6)' }, // Gulf of Mexico / Caribbean
    { lng: 145, lat: -5, r: 90, color: 'rgba(0, 220, 255, 0.65)' } // Coral Sea
  ];

  stormCells.forEach((cell) => {
    const { x, y } = latLngToCanvasXY(cell.lat, cell.lng, WIDTH, HEIGHT);
    const rad = ctx.createRadialGradient(x, y, 5, x, y, cell.r);
    rad.addColorStop(0, cell.color);
    rad.addColorStop(0.6, 'rgba(0, 120, 255, 0.4)');
    rad.addColorStop(1, 'rgba(0, 50, 150, 0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(x, y, cell.r, 0, Math.PI * 2);
    ctx.fill();
  });

  drawGraticules(ctx, WIDTH, HEIGHT, 'rgba(0, 180, 255, 0.12)');

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 5. Generate Air Quality (AQI / PM2.5 / CO2) Pollution Dispersion Texture
 */
export function generateAirQualityMapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#081018';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  drawWorldLandmasses(ctx, WIDTH, HEIGHT, {
    landColor: 'rgba(20, 32, 45, 0.85)',
    strokeColor: 'rgba(0, 209, 255, 0.2)',
    strokeWidth: 1
  });

  // Major PM2.5 / AQI Pollution Plumes (Northern India / Indo-Gangetic, Eastern China, Central Europe, Eastern US, Middle East)
  const pollutionPlumes = [
    { lng: 78, lat: 27, r: 95, aqi: 280, color: 'rgba(255, 50, 50, 0.85)' }, // Indo-Gangetic Plain (Severe)
    { lng: 116, lat: 36, r: 90, aqi: 220, color: 'rgba(255, 80, 40, 0.8)' }, // North China Plain (Poor)
    { lng: 45, lat: 28, r: 85, aqi: 170, color: 'rgba(255, 140, 0, 0.75)' }, // Persian Gulf Dust & Emission
    { lng: 12, lat: 50, r: 65, aqi: 85, color: 'rgba(255, 200, 0, 0.55)' }, // Central Europe
    { lng: -78, lat: 38, r: 70, aqi: 75, color: 'rgba(255, 210, 0, 0.5)' }, // US East Coast
    { lng: 20, lat: -5, r: 80, aqi: 110, color: 'rgba(255, 120, 0, 0.6)' } // Central African Biomass burning
  ];

  pollutionPlumes.forEach((plume) => {
    const { x, y } = latLngToCanvasXY(plume.lat, plume.lng, WIDTH, HEIGHT);
    const rad = ctx.createRadialGradient(x, y, 4, x, y, plume.r);
    rad.addColorStop(0, plume.color);
    rad.addColorStop(0.5, 'rgba(255, 100, 0, 0.35)');
    rad.addColorStop(1, 'rgba(255, 200, 0, 0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(x, y, plume.r, 0, Math.PI * 2);
    ctx.fill();
  });

  drawGraticules(ctx, WIDTH, HEIGHT, 'rgba(255, 100, 50, 0.12)');

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 6. Generate Night Lights Texture (City Luminosity)
 */
export function generateNightLightsTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#020408';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  drawWorldLandmasses(ctx, WIDTH, HEIGHT, {
    landColor: '#050c14',
    strokeColor: 'rgba(0, 209, 255, 0.15)',
    strokeWidth: 0.8
  });

  // Clusters of city lights
  const majorCities = [
    { lng: 77.2, lat: 28.6, size: 8 }, // Delhi
    { lng: 72.8, lat: 19.0, size: 7 }, // Mumbai
    { lng: 77.5, lat: 12.9, size: 6 }, // Bengaluru
    { lng: 88.3, lat: 22.5, size: 6 }, // Kolkata
    { lng: 139.6, lat: 35.6, size: 10 }, // Tokyo Megacity
    { lng: 121.4, lat: 31.2, size: 9 }, // Shanghai
    { lng: -74.0, lat: 40.7, size: 10 }, // New York
    { lng: -0.12, lat: 51.5, size: 9 }, // London
    { lng: 2.35, lat: 48.8, size: 8 }, // Paris
    { lng: -118.2, lat: 34.0, size: 8 }, // Los Angeles
    { lng: -46.6, lat: -23.5, size: 8 }, // São Paulo
    { lng: 31.2, lat: 30.0, size: 7 }, // Cairo
    { lng: 151.2, lat: -33.8, size: 7 }, // Sydney
    { lng: 106.8, lat: -6.2, size: 7 }, // Jakarta
    { lng: 37.6, lat: 55.7, size: 7 }, // Moscow
    { lng: 55.2, lat: 25.2, size: 6 } // Dubai
  ];

  majorCities.forEach((city) => {
    const { x, y } = latLngToCanvasXY(city.lat, city.lng, WIDTH, HEIGHT);
    const rad = ctx.createRadialGradient(x, y, 1, x, y, city.size * 3);
    rad.addColorStop(0, 'rgba(255, 240, 180, 1.0)');
    rad.addColorStop(0.3, 'rgba(255, 200, 100, 0.6)');
    rad.addColorStop(1, 'rgba(255, 180, 50, 0)');
    ctx.fillStyle = rad;
    ctx.beginPath();
    ctx.arc(x, y, city.size * 3, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 7. Generate Political Boundary Map Texture (Official India & World Sovereignties)
 * Shows sovereign country boundaries, state boundaries for India (SOI standard),
 * sovereign capitals, international borders, and ocean geopolitical zones.
 */
export function generatePoliticalMapTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d')!;

  const scaleX = WIDTH / 360;
  const scaleY = HEIGHT / 180;
  const toXY = (lng: number, lat: number) => [(lng + 180) * scaleX, (90 - lat) * scaleY];

  // Deep midnight navy geopolitical ocean background
  const oceanGrad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
  oceanGrad.addColorStop(0, '#030b14');
  oceanGrad.addColorStop(0.5, '#051322');
  oceanGrad.addColorStop(1, '#030b14');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw Base Continents
  drawWorldLandmasses(ctx, WIDTH, HEIGHT, {
    landColor: '#0a1d2e',
    strokeColor: 'rgba(0, 209, 255, 0.35)',
    strokeWidth: 1.2
  });

  // Draw Global Sovereign Countries Political Fills & Boundaries
  GLOBAL_POLITICAL_COUNTRIES.forEach((country) => {
    country.polygons.forEach((poly) => {
      if (poly.length < 3) return;
      ctx.beginPath();
      const [startLng, startLat] = poly[0];
      const [startX, startY] = toXY(startLng, startLat);
      ctx.moveTo(startX, startY);
      for (let i = 1; i < poly.length; i++) {
        const [lng, lat] = poly[i];
        const [x, y] = toXY(lng, lat);
        ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Country polygon styling
      ctx.fillStyle = country.id === 'ind' ? 'rgba(0, 209, 255, 0.22)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fill();

      ctx.strokeStyle = country.id === 'ind' ? '#00e5ff' : 'rgba(0, 209, 255, 0.6)';
      ctx.lineWidth = country.id === 'ind' ? 2.5 : 1.2;
      ctx.stroke();
    });
  });

  // Draw Official India State Divisions & Union Territories (Survey of India standard)
  const drawIndiaStateBorder = (coords: number[][]) => {
    ctx.beginPath();
    const [startLng, startLat] = coords[0];
    const [startX, startY] = toXY(startLng, startLat);
    ctx.moveTo(startX, startY);
    for (let i = 1; i < coords.length; i++) {
      const [lng, lat] = coords[i];
      const [x, y] = toXY(lng, lat);
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  // Internal state boundaries for key regions
  drawIndiaStateBorder([[74.5, 37.1], [76.5, 34.0], [79.0, 33.2]]); // Ladakh division
  drawIndiaStateBorder([[74.0, 33.5], [76.0, 32.5], [78.5, 32.5]]); // Himachal & J&K
  drawIndiaStateBorder([[70.5, 24.5], [75.0, 24.5], [78.0, 27.0]]); // Rajasthan & Gujarat
  drawIndiaStateBorder([[72.8, 19.0], [78.0, 20.0], [80.0, 18.5]]); // Maharashtra
  drawIndiaStateBorder([[74.8, 12.9], [78.5, 13.0], [80.3, 13.1]]); // Karnataka & TN
  drawIndiaStateBorder([[88.8, 26.5], [92.0, 26.0], [95.0, 27.0]]); // Northeast Assam corridor

  // Country Labels & Sovereign Indicators
  ctx.font = 'bold 12px monospace';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';

  const countryLabels = [
    { name: 'INDIA (SOI)', lat: 22.0, lng: 79.0, color: '#00e5ff' },
    { name: 'USA', lat: 39.0, lng: -98.0, color: '#90caf9' },
    { name: 'BRAZIL', lat: -10.0, lng: -52.0, color: '#a5d6a7' },
    { name: 'CHINA', lat: 35.0, lng: 104.0, color: '#ffe082' },
    { name: 'RUSSIA', lat: 60.0, lng: 95.0, color: '#ce93d8' },
    { name: 'AUSTRALIA', lat: -25.0, lng: 134.0, color: '#ffcc80' },
    { name: 'GERMANY', lat: 51.0, lng: 10.0, color: '#80deea' },
    { name: 'UK', lat: 54.0, lng: -2.0, color: '#c5e1a5' },
    { name: 'JAPAN', lat: 37.0, lng: 138.0, color: '#ffab91' },
    { name: 'S. AFRICA', lat: -29.0, lng: 24.0, color: '#bcaaa4' },
    { name: 'EGYPT', lat: 26.0, lng: 30.0, color: '#fff59d' },
    { name: 'CANADA', lat: 58.0, lng: -106.0, color: '#b0bec5' }
  ];

  countryLabels.forEach((lbl) => {
    const { x, y } = latLngToCanvasXY(lbl.lat, lbl.lng, WIDTH, HEIGHT);
    ctx.fillStyle = 'rgba(5, 15, 25, 0.75)';
    ctx.fillRect(x - 38, y - 8, 76, 16);
    ctx.fillStyle = lbl.color;
    ctx.fillText(lbl.name, x, y + 4);
  });

  // Capital Dots
  GLOBAL_POLITICAL_COUNTRIES.forEach((c) => {
    const { x, y } = latLngToCanvasXY(c.coordinates[0], c.coordinates[1], WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.arc(x, y, c.id === 'ind' ? 5 : 3.2, 0, Math.PI * 2);
    ctx.fillStyle = c.id === 'ind' ? '#ff3d00' : '#ffd600';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Graticules and Navigation Coordinates
  drawGraticules(ctx, WIDTH, HEIGHT, 'rgba(0, 209, 255, 0.12)');

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}
