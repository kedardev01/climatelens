import { GlobalKPI, RegionData, LearningModule, VulnerabilityMatrix, TelemetryLog } from '../types';

export const GLOBAL_KPIS: GlobalKPI[] = [
  {
    id: 'global-temp',
    name: 'Global Temp',
    value: '+1.15',
    unit: '°C',
    change: 'vs baseline (1850-1900)',
    trend: 'up',
    statusType: 'error',
    source: 'WMO',
    sparkline: [12, 14, 15, 13, 17, 19, 22, 25, 27, 30],
    description: 'Average global surface temperature anomaly compared to the pre-industrial baseline.'
  },
  {
    id: 'co2',
    name: 'CO2',
    value: '421',
    unit: 'ppm',
    change: '+2.4 ppm / year',
    trend: 'up',
    statusType: 'warning',
    source: 'NOAA',
    sparkline: [380, 385, 390, 395, 402, 408, 414, 417, 419, 421],
    description: 'Atmospheric carbon dioxide concentration measured at Mauna Loa Observatory.'
  },
  {
    id: 'sea-level',
    name: 'Sea Level',
    value: '+98',
    unit: 'mm',
    change: 'since 1993 satellite record',
    trend: 'up',
    statusType: 'primary',
    source: 'NASA',
    sparkline: [10, 18, 25, 35, 48, 59, 70, 81, 90, 98],
    description: 'Global mean sea level rise driven by thermal expansion and melting ice sheets.'
  },
  {
    id: 'ocean-temp',
    name: 'Ocean Temp',
    value: '+0.88',
    unit: '°C',
    change: 'above 20th century average',
    trend: 'up',
    statusType: 'error',
    source: 'NOAA',
    sparkline: [0.1, 0.2, 0.3, 0.45, 0.52, 0.65, 0.72, 0.81, 0.85, 0.88],
    description: 'Global sea surface temperature anomaly affecting marine biodiversity and cyclonic intensity.'
  }
];

export const GLOBAL_CLIMATE_INDICATORS = [
  {
    id: 'arctic-ice',
    name: 'Arctic Sea Ice',
    status: 'Declining',
    statusBadgeColor: 'bg-red-500/20 text-red-400 border border-red-500/30',
    value: '12.6',
    unit: 'M km²',
    change: '-12.2% dec.',
    changeType: 'negative',
    desc: 'Summer minimum ice extent reaching record lows.'
  },
  {
    id: 'methane',
    name: 'Methane (CH4)',
    status: 'Elevated',
    statusBadgeColor: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    value: '1921',
    unit: 'ppb',
    change: '+14 ppb yr',
    changeType: 'negative',
    desc: 'Potent short-lived climate pollutant 80x more powerful than CO2 over 20 years.'
  },
  {
    id: 'deforestation',
    name: 'Deforestation',
    status: 'Critical',
    statusBadgeColor: 'bg-red-500/20 text-red-400 border border-red-500/30',
    value: '4.1',
    unit: 'M ha',
    change: '2023 total',
    changeType: 'neutral',
    desc: 'Tropical primary forest loss mainly across Amazon and Congo basins.'
  },
  {
    id: 'air-quality',
    name: 'Air Quality (Global Avg)',
    status: 'Moderate',
    statusBadgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    value: '65',
    unit: 'AQI',
    change: 'Stable',
    changeType: 'positive',
    desc: 'Aggregated urban particulate matter index across 1,200 telemetry sensors.'
  },
  {
    id: 'extreme-events',
    name: 'Extreme Events Monitored',
    status: 'Active',
    statusBadgeColor: 'bg-red-500/20 text-red-400 border border-red-500/30',
    value: '24',
    unit: '',
    change: 'Global count',
    changeType: 'neutral',
    desc: 'Heatwaves, category 4+ tropical cyclones, and major flood declarations.'
  }
];

export const REGIONS_DATA: RegionData[] = [
  {
    id: 'brazil',
    name: 'Brazil',
    country: 'Brazil',
    coordinates: [-14.235, -51.9253],
    surfaceTemp: '28.4°C',
    tempAnomaly: '+1.2°C',
    aqi: 45,
    aqiStatus: 'Good',
    forestCover: '58%',
    forestCoverChange: '-0.38% / yr',
    waterIndex: 72,
    meanTemp: '28.4°C',
    tempTrend: [26.8, 27.1, 27.4, 27.9, 28.1, 28.4],
    renewableAdoption: '84% (Hydro + Solar)',
    keyThreats: ['Amazon basin drought', 'Agricultural clearing', 'River discharge decline'],
    summary: 'Brazil hosts the vast majority of the Amazon rainforest. Recent telemetry indicates elevated drought risk in the northern basin and intensified agricultural expansion.'
  },
  {
    id: 'india',
    name: 'India',
    country: 'India',
    coordinates: [20.5937, 78.9629],
    surfaceTemp: '32.4°C',
    tempAnomaly: '+2.1°C',
    aqi: 142,
    aqiStatus: 'Moderate',
    forestCover: '24.6%',
    forestCoverChange: '+0.12% / yr',
    waterIndex: 48,
    meanTemp: '32.4°C',
    tempTrend: [30.1, 30.8, 31.2, 31.8, 32.0, 32.4],
    renewableAdoption: '43% of total grid capacity',
    keyThreats: ['Monsoon variability', 'Urban heat islands', 'Groundwater depletion', 'Coastal cyclone surges'],
    summary: 'Subcontinental climate shows rapid industrial energy growth coupled with significant seasonal rainfall anomalies in central and western divisions.'
  },
  {
    id: 'usa',
    name: 'United States',
    country: 'United States',
    coordinates: [37.0902, -95.7129],
    surfaceTemp: '16.8°C',
    tempAnomaly: '+1.4°C',
    aqi: 38,
    aqiStatus: 'Good',
    forestCover: '33.9%',
    forestCoverChange: '+0.05% / yr',
    waterIndex: 68,
    meanTemp: '16.8°C',
    tempTrend: [15.2, 15.6, 15.9, 16.3, 16.5, 16.8],
    renewableAdoption: '22% grid share',
    keyThreats: ['Wildfire frequency in western states', 'Gulf coast hurricane intensity', 'Agricultural heat stress'],
    summary: 'North American climate telemetry tracks historic heatwaves across the southwest and intensified precipitation volatility along the Eastern seaboard.'
  },
  {
    id: 'europe',
    name: 'European Union',
    country: 'European Union',
    coordinates: [50.8503, 4.3517],
    surfaceTemp: '14.2°C',
    tempAnomaly: '+2.3°C',
    aqi: 29,
    aqiStatus: 'Good',
    forestCover: '39.8%',
    forestCoverChange: '+0.4% / yr',
    waterIndex: 61,
    meanTemp: '14.2°C',
    tempTrend: [12.1, 12.6, 13.0, 13.5, 13.9, 14.2],
    renewableAdoption: '44% (Wind + Solar + Hydro)',
    keyThreats: ['Alpine glacier retreat', 'Mediterranean summer droughts', 'Rhine navigation water shortages'],
    summary: 'Europe is warming at double the global average rate, triggering unprecedented summer heat domes and severe river flow reductions.'
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    country: 'Indonesia',
    coordinates: [-0.7893, 113.9213],
    surfaceTemp: '29.1°C',
    tempAnomaly: '+0.9°C',
    aqi: 88,
    aqiStatus: 'Moderate',
    forestCover: '49.1%',
    forestCoverChange: '-0.62% / yr',
    waterIndex: 82,
    meanTemp: '29.1°C',
    tempTrend: [28.2, 28.4, 28.6, 28.8, 28.9, 29.1],
    renewableAdoption: '14% grid share',
    keyThreats: ['Peatland fires', 'Sea level rise impacting Jakarta', 'Coral reef bleaching'],
    summary: 'Critical equatorial archipelago experiencing acute maritime warming and peatland ecosystem degradation.'
  }
];

export const INDIA_STATES_DATA: (RegionData & { stateCode: string; waterIndexValue: number; rainfallAnomaly: string })[] = [
  {
    id: 'maharashtra',
    name: 'Maharashtra',
    country: 'India',
    stateCode: 'MH',
    coordinates: [19.7515, 75.7139],
    surfaceTemp: '32.4°C',
    tempAnomaly: '+2.1°C Var',
    aqi: 142,
    aqiStatus: 'Moderate',
    forestCover: '16.5%',
    forestCoverChange: '-0.5%',
    waterIndex: 55,
    waterIndexValue: 40,
    rainfallAnomaly: '-14% Monsoon Deficit',
    meanTemp: '32.4°C',
    tempTrend: [30.2, 31.0, 31.5, 32.1, 31.9, 32.4],
    renewableAdoption: '38% (Wind/Solar/Cogen)',
    keyThreats: ['Vidarbha & Marathwada drought cycles', 'Mumbai urban flash flooding', 'Groundwater depletion'],
    summary: 'Western state profiling highlights industrial emissions around Mumbai-Pune corridor combined with severe agrarian drought exposure in eastern subdivisions.'
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    country: 'India',
    stateCode: 'GJ',
    coordinates: [22.2587, 71.1924],
    surfaceTemp: '34.1°C',
    tempAnomaly: '+1.9°C Var',
    aqi: 135,
    aqiStatus: 'Moderate',
    forestCover: '9.8%',
    forestCoverChange: '+0.2%',
    waterIndex: 45,
    waterIndexValue: 60,
    rainfallAnomaly: '+8% Arabian Sea cyclone precipitation',
    meanTemp: '34.1°C',
    tempTrend: [31.5, 32.2, 32.9, 33.5, 33.8, 34.1],
    renewableAdoption: '51% (Highest solar/wind park density)',
    keyThreats: ['Kutch salinity ingress', 'Severe heatwave days >45°C', 'Coastal storm surges'],
    summary: 'Leading renewable energy hub with vast solar parks in Charanka and Khavda, but faces rising summer heat stress and coastal vulnerability.'
  },
  {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    country: 'India',
    stateCode: 'TN',
    coordinates: [11.1271, 78.6569],
    surfaceTemp: '31.2°C',
    tempAnomaly: '+1.4°C Var',
    aqi: 72,
    aqiStatus: 'Moderate',
    forestCover: '20.3%',
    forestCoverChange: '+0.8%',
    waterIndex: 62,
    waterIndexValue: 55,
    rainfallAnomaly: '+4% Northeast Monsoon',
    meanTemp: '31.2°C',
    tempTrend: [29.8, 30.2, 30.5, 30.9, 31.0, 31.2],
    renewableAdoption: '54% (Muppandal Wind Complex)',
    keyThreats: ['Chennai coastal storm flooding', 'Cauvery delta water disputes', 'Thermal coral bleaching in Gulf of Mannar'],
    summary: 'Strong wind and rooftop solar adoption, with advanced coastal telemetry monitoring North-East monsoon dynamics.'
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    country: 'India',
    stateCode: 'DL',
    coordinates: [28.6139, 77.209],
    surfaceTemp: '36.8°C',
    tempAnomaly: '+3.2°C Var',
    aqi: 286,
    aqiStatus: 'Severe',
    forestCover: '13.2%',
    forestCoverChange: '+0.1%',
    waterIndex: 28,
    waterIndexValue: 25,
    rainfallAnomaly: '-22% Erratic Downpours',
    meanTemp: '36.8°C',
    tempTrend: [32.0, 33.4, 34.8, 35.5, 36.1, 36.8],
    renewableAdoption: '18% power wheeling',
    keyThreats: ['Winter particulate inversion (PM2.5 > 400)', 'Extreme summer heat index >49°C', 'Yamuna ecological flow deficit'],
    summary: 'National Capital Region records critical air quality spikes during crop burning and winter stagnation, coupled with acute urban heat island anomalies.'
  },
  {
    id: 'karnataka',
    name: 'Karnataka',
    country: 'India',
    stateCode: 'KA',
    coordinates: [15.3173, 75.7139],
    surfaceTemp: '29.5°C',
    tempAnomaly: '+1.6°C Var',
    aqi: 68,
    aqiStatus: 'Moderate',
    forestCover: '22.8%',
    forestCoverChange: '+0.3%',
    waterIndex: 42,
    waterIndexValue: 48,
    rainfallAnomaly: '-18% South-Interior Deficit',
    meanTemp: '29.5°C',
    tempTrend: [27.9, 28.3, 28.8, 29.1, 29.3, 29.5],
    renewableAdoption: '58% (Pavagada Solar Park)',
    keyThreats: ['Bengaluru urban water table exhaustion', 'Western Ghats landslides', 'Kaveri basin distress'],
    summary: 'Pioneer in mega-scale solar generation with Pavagada (2,050 MW), while managing acute urban reservoir stress in the southern plateau.'
  },
  {
    id: 'ladakh',
    name: 'Ladakh (UT)',
    country: 'India',
    stateCode: 'LA',
    coordinates: [34.1526, 77.5771],
    surfaceTemp: '12.4°C',
    tempAnomaly: '+2.8°C Alpine',
    aqi: 24,
    aqiStatus: 'Good',
    forestCover: '1.45%',
    forestCoverChange: '+0.1%',
    waterIndex: 82,
    waterIndexValue: 75,
    rainfallAnomaly: 'Erratic Snowfall Cycles',
    meanTemp: '12.4°C',
    tempTrend: [9.8, 10.5, 11.2, 11.8, 12.1, 12.4],
    renewableAdoption: '84% (Pang 10GW High-Altitude Solar)',
    keyThreats: ['Siachen & Karakoram glacier retreat (15m/yr)', 'Cloudburst flash floods in Leh', 'Permafrost slope destabilization'],
    summary: 'Strategic northern Himalayan territory serving as a vital glacial freshwater reservoir, pioneering clean high-altitude solar power.'
  },
  {
    id: 'jammu-kashmir',
    name: 'Jammu & Kashmir (UT)',
    country: 'India',
    stateCode: 'JK',
    coordinates: [33.7782, 74.8055],
    surfaceTemp: '19.8°C',
    tempAnomaly: '+1.7°C Var',
    aqi: 42,
    aqiStatus: 'Good',
    forestCover: '39.6%',
    forestCoverChange: '+0.6%',
    waterIndex: 78,
    waterIndexValue: 70,
    rainfallAnomaly: '+12% Winter Western Disturbances',
    meanTemp: '19.8°C',
    tempTrend: [17.5, 18.0, 18.6, 19.1, 19.4, 19.8],
    renewableAdoption: '65% (Chenab Cascade Hydroelectric)',
    keyThreats: ['Jhelum basin flood overflow', 'Horticulture shifts from thermal volatility', 'Winter snowfall unpredictability'],
    summary: 'Crucial mountain river watershed providing extensive hydroelectric power generation across Chenab and Jhelum basins.'
  },
  {
    id: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    country: 'India',
    stateCode: 'AR',
    coordinates: [28.218, 94.7278],
    surfaceTemp: '21.5°C',
    tempAnomaly: '+1.1°C Var',
    aqi: 18,
    aqiStatus: 'Good',
    forestCover: '79.3%',
    forestCoverChange: '+0.4%',
    waterIndex: 92,
    waterIndexValue: 88,
    rainfallAnomaly: '+10% Heavy Orographic Rain',
    meanTemp: '21.5°C',
    tempTrend: [19.8, 20.2, 20.7, 21.0, 21.2, 21.5],
    renewableAdoption: '90% (Run-of-River Hydroelectric)',
    keyThreats: ['Siang river flash flood surges', 'Glacial lake burst hazards', 'Seismic slope instability'],
    summary: 'Sovereign eastern frontier with primary rainforest canopy covering 79% of total land area, guarding vital Himalayan river catchments.'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    country: 'India',
    stateCode: 'RJ',
    coordinates: [27.0238, 74.2179],
    surfaceTemp: '37.5°C',
    tempAnomaly: '+2.9°C Var',
    aqi: 118,
    aqiStatus: 'Moderate',
    forestCover: '4.87%',
    forestCoverChange: '+0.2%',
    waterIndex: 32,
    waterIndexValue: 30,
    rainfallAnomaly: '+8% Monsoon Intensity',
    meanTemp: '37.5°C',
    tempTrend: [34.0, 34.9, 35.8, 36.4, 37.0, 37.5],
    renewableAdoption: '62% (Bhadla 2,245 MW Solar Park)',
    keyThreats: ['Thar desert expansion', 'Extreme daytime summer temperatures >50°C', 'Deep aquifer depletion'],
    summary: 'World-leading solar power state with mega-parks in Bhadla and Thar, actively confronting desertification and deep groundwater stress.'
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    country: 'India',
    stateCode: 'WB',
    coordinates: [22.9868, 87.855],
    surfaceTemp: '32.8°C',
    tempAnomaly: '+1.5°C Var',
    aqi: 148,
    aqiStatus: 'Moderate',
    forestCover: '19.0%',
    forestCoverChange: '+0.3%',
    waterIndex: 58,
    waterIndexValue: 52,
    rainfallAnomaly: '+14% Cyclonic Spikes',
    meanTemp: '32.8°C',
    tempTrend: [30.5, 31.0, 31.6, 32.1, 32.5, 32.8],
    renewableAdoption: '28% (Floating Solar & Hydro)',
    keyThreats: ['Sundarbans delta erosion & high-tide breaches', 'Bay of Bengal tropical super-cyclones', 'Arsenic aquifer salinity'],
    summary: 'Critical deltaic state protecting the world-famous UNESCO Sundarbans biosphere, deploying cyclonic storm early-warning stations.'
  }
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'mod-1',
    number: '01',
    title: 'What is climate change?',
    description: "Long-term shifts in temperatures and weather patterns, fundamentally altering the Earth's delicate atmospheric balance.",
    icon: 'public',
    fullContent: {
      overview: 'Climate change refers to significant long-term alterations in global temperatures and weather patterns. While natural climate cycles occurred over geological eras, scientific consensus confirms that anthropogenic greenhouse emissions since 1850 are driving warming at an unprecedented velocity.',
      keyPoints: [
        'Global temperatures have increased by +1.15°C since the pre-industrial period (1850-1900).',
        'Natural variability (Milankovitch cycles, solar irradiance) accounts for less than 0.1°C of modern changes.',
        'Warming alters atmospheric pressure cells, jet streams, and deep ocean conveyor currents.'
      ],
      dataPoints: [
        { label: 'Current Anomaly', value: '+1.15°C' },
        { label: 'Baseline Era', value: '1850-1900' },
        { label: 'Rate of Rise', value: '0.2°C / decade' }
      ],
      solutionPath: 'Transitioning the energy matrix away from fossil fuel combustion toward clean, scalable zero-carbon power generation.'
    }
  },
  {
    id: 'mod-2',
    number: '02',
    title: 'Why is Earth warming?',
    description: 'The rapid accumulation of heat-trapping gases in the atmosphere, primarily driven by human industrial activities and fossil fuel combustion.',
    icon: 'thermostat',
    fullContent: {
      overview: 'Incoming solar radiation enters Earth in the form of shortwave visible light. While some heat radiates back to outer space as longwave infrared energy, greenhouse gases absorb and re-emit this radiation back toward the surface—amplifying the planetary thermal equilibrium.',
      keyPoints: [
        'The Greenhouse Effect is a natural phenomenon; human emissions have supercharged it into an overheating blanket.',
        'Fossil fuel combustion produces over 36 billion metric tons of CO2 annually.',
        'Feedback loops (ice albedo loss, permafrost thaw) compound atmospheric thermal retention.'
      ],
      dataPoints: [
        { label: 'Annual CO2 Emissions', value: '36.8 Gt' },
        { label: 'Radiative Forcing', value: '+2.72 W/m²' },
        { label: 'Heat Absorbed by Oceans', value: '91%' }
      ],
      solutionPath: 'Rapid phase-down of coal, oil, and gas while building storage-backed renewable infrastructure.'
    }
  },
  {
    id: 'mod-3',
    number: '03',
    title: 'What are greenhouse gases?',
    description: 'Compounds like Carbon Dioxide and Methane that absorb infrared radiation, creating a thermal blanket around the planet.',
    icon: 'co2',
    fullContent: {
      overview: 'Greenhouse gases (GHGs) possess molecular structures that resonate and vibrate when hit by infrared radiation wavelengths. The primary gases include Carbon Dioxide (CO2), Methane (CH4), Nitrous Oxide (N2O), and Fluorinated Gases (F-gases).',
      keyPoints: [
        'CO2: Remains in the atmosphere for 300 to 1,000 years, accounting for ~76% of total global warming potential.',
        'Methane (CH4): 80x more warming power over a 20-year timescale, primarily from agriculture, fossil extraction, and waste.',
        'N2O: 273x warming potential relative to CO2, predominantly emitted through chemical fertilizer application.'
      ],
      dataPoints: [
        { label: 'CO2 Concentration', value: '421 ppm' },
        { label: 'CH4 Concentration', value: '1,921 ppb' },
        { label: 'N2O Concentration', value: '336 ppb' }
      ],
      solutionPath: 'Agricultural precision farming, capping methane leaks from natural gas pipelines, and deploying carbon capture technologies.'
    }
  },
  {
    id: 'mod-4',
    number: '04',
    title: 'How does climate change affect India?',
    description: 'Analyzing the regional vulnerability profile, including monsoon variability, coastal risks, and temperature extremes across the subcontinent.',
    icon: 'map',
    fullContent: {
      overview: 'With over 1.4 billion people, 7,500 km of coastline, and an agriculture-dependent rural economy, India represents one of the most climate-sensitive geographies on Earth. The subcontinent experiences amplified monsoon erraticness, Himalayan glacier retreat, and severe urban heat anomalies.',
      keyPoints: [
        'Monsoon Perturbations: Shorter, more intense downpours with prolonged dry spells trigger cascading flood-drought dualities.',
        'Cryosphere Loss: Himalayan glaciers feeding the Indus, Ganga, and Brahmaputra basins are thinning at accelerated rates.',
        'Extreme Heat: Over 350 million workers exposed to dangerous wet-bulb temperatures exceeding 31°C.'
      ],
      dataPoints: [
        { label: 'Coastline at Risk', value: '7,516 km' },
        { label: 'Agri GDP Exposed', value: '18.3%' },
        { label: 'Monsoon Variability Index', value: '+24%' }
      ],
      solutionPath: 'Climate-resilient crop varieties, decentralized solar irrigation pumps, urban sponge-city infrastructure, and robust coastal disaster warning radars.'
    }
  }
];

export const VULNERABILITY_MATRICES: VulnerabilityMatrix[] = [
  {
    id: 'vuln-heat',
    title: 'Heat',
    metric: '+2.4°C Anomaly',
    type: 'heat',
    severity: 'critical',
    color: '#ffb4ab',
    description: 'Urban heat islands and extreme heatwave days exceeding 48°C in tropical and temperate latitudes.',
    projection2030: '3.2x increase in days exceeding 42°C wet-bulb index',
    affectedPopulation: '1.2 Billion globally'
  },
  {
    id: 'vuln-water',
    title: 'Water',
    metric: '-15% Reservoir',
    type: 'water',
    severity: 'high',
    color: '#a4e6ff',
    description: 'Aquifer drawdown and drying surface reservoirs threatening metropolitan drinking supplies.',
    projection2030: '40% structural water supply deficit in key urban hubs',
    affectedPopulation: '2.4 Billion under severe stress'
  },
  {
    id: 'vuln-food',
    title: 'Food',
    metric: '-8% Yield',
    type: 'food',
    severity: 'moderate',
    color: '#f2de00',
    description: 'Crop thermal stress impacting wheat, rice, and maize yields during grain filling periods.',
    projection2030: '-12% average yield reduction without genetic adaptation',
    affectedPopulation: '800 Million agrarian livelihoods'
  },
  {
    id: 'vuln-health',
    title: 'Health',
    metric: 'Risk Index 8.2',
    type: 'health',
    severity: 'high',
    color: '#7dffa2',
    description: 'Vector-borne disease transmission expansion (Dengue, Malaria) and cardiovascular heat strokes.',
    projection2030: '+250,000 annual excess mortalities globally',
    affectedPopulation: 'Global population exposure'
  },
  {
    id: 'vuln-ecosystems',
    title: 'Ecosystems',
    metric: '62% Stress',
    type: 'ecosystems',
    severity: 'critical',
    color: '#62ff96',
    description: 'Coral bleaching in shallow reef systems and fragmentation of tropical rainforest biomes.',
    projection2030: 'Up to 90% of coral reefs degraded at +1.5°C threshold',
    affectedPopulation: '1 Million species threatened'
  },
  {
    id: 'vuln-economy',
    title: 'Economy',
    metric: '-$4.2B Impact',
    type: 'economy',
    severity: 'high',
    color: '#859399',
    description: 'Direct infrastructure losses, labor productivity drop during peak heat, and insurance claims.',
    projection2030: '-4.5% GDP drag across emerging economies',
    affectedPopulation: 'Global financial stability'
  }
];

export const HISTORICAL_TIMELINE = [
  { year: 1900, tempAnomaly: -0.15, co2: 296, seaLevel: -120, globalAQI: 20, event: 'Early industrial expansion; baseline temperature equilibrium.' },
  { year: 1930, tempAnomaly: -0.05, co2: 307, seaLevel: -90, globalAQI: 30, event: 'Dust Bowl in North America; rapid rise in coal-fired manufacturing.' },
  { year: 1960, tempAnomaly: +0.02, co2: 317, seaLevel: -60, globalAQI: 45, event: 'Keeling curve measurement initiated at Mauna Loa observatory.' },
  { year: 1980, tempAnomaly: +0.22, co2: 338, seaLevel: -25, globalAQI: 55, event: 'First World Climate Conference; confirmation of greenhouse warming.' },
  { year: 2000, tempAnomaly: +0.58, co2: 369, seaLevel: +20, globalAQI: 62, event: 'Millennium climate models track rapid Arctic sea ice retreat.' },
  { year: 2015, tempAnomaly: +0.94, co2: 400, seaLevel: +65, globalAQI: 66, event: 'Adoption of the Paris Agreement with 1.5°C threshold target.' },
  { year: 2024, tempAnomaly: +1.15, co2: 421, seaLevel: +98, globalAQI: 65, event: 'Global telemetry records highest continuous 12-month average.' },
  { year: 2026, tempAnomaly: +1.22, co2: 426, seaLevel: +106, globalAQI: 64, event: 'Projected near-term trajectory under current policy commitments.' }
];

export const INITIAL_TELEMETRY_LOGS: TelemetryLog[] = [
  { id: '1', timestamp: '14:02:45 UTC', type: 'SYS', message: 'Connected to regional climate node: IND-WEST.' },
  { id: '2', timestamp: '14:03:12 UTC', type: 'DATA', message: 'Ingesting latest LULUCF emissions estimates. Delta: +0.4%.' },
  { id: '3', timestamp: '14:05:00 UTC', type: 'WARN', message: 'Monsoon deficit detected in Sub-division 14. Adjusting trend lines.' },
  { id: '4', timestamp: '14:05:30 UTC', type: 'SYS', message: 'Visualizations re-rendered successfully. Frame rate stable.' },
  { id: '5', timestamp: '14:06:18 UTC', type: 'DATA', message: 'Atmospheric CO2 sensor telemetry verified at 421.4 ppm.' },
  { id: '6', timestamp: '14:07:02 UTC', type: 'ALERT', message: 'Heat dome advisory active in NW Subcontinent: +3.2°C anomaly.' }
];
