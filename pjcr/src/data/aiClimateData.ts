import { AIDataCenterMetric } from '../types';

export const AI_CLIMATE_STAT_SUMMARY = {
  dataCenterGlobalElectricity2022TWh: 460, // 460 TWh (approx 2% of world electricity)
  dataCenterProjected2026TWh: 1050, // IEA projection: could surpass 1,000 TWh (equal to Japan's entire grid)
  dataCenterProjected2030TWh: 1450, // High adoption projection
  aiShareOfDataCenterPower2024Pct: 15,
  aiShareOfDataCenterPower2030Pct: 40,
  waterLitersPerGPT4Training: 700000, // ~700,000 liters of freshwater evaporated
  waterMillilitersPerPromptAverage: 500, // ~500 ml (a standard water bottle) per 20-50 queries with cooling
  bigTechEmissionsIncreaseSince2020Pct: 48, // e.g. Microsoft +42%, Google +48% Scope 1/2/3 surge
  gpuLifecycleYears: 2.5 // Extreme turnover cycle generating hazardous e-waste
};

export const AI_DATA_CENTER_PROJECTION_TIMELINE: AIDataCenterMetric[] = [
  { year: 2020, globalTWh: 380, aiSpecificTWh: 25, coolingWaterBillionLiters: 180, co2Megatons: 160, equivalentHouseholdsMillion: 35 },
  { year: 2022, globalTWh: 460, aiSpecificTWh: 55, coolingWaterBillionLiters: 235, co2Megatons: 195, equivalentHouseholdsMillion: 42 },
  { year: 2024, globalTWh: 620, aiSpecificTWh: 130, coolingWaterBillionLiters: 340, co2Megatons: 265, equivalentHouseholdsMillion: 56 },
  { year: 2026, globalTWh: 880, aiSpecificTWh: 280, coolingWaterBillionLiters: 520, co2Megatons: 380, equivalentHouseholdsMillion: 80 },
  { year: 2028, globalTWh: 1180, aiSpecificTWh: 490, coolingWaterBillionLiters: 760, co2Megatons: 510, equivalentHouseholdsMillion: 107 },
  { year: 2030, globalTWh: 1450, aiSpecificTWh: 680, coolingWaterBillionLiters: 980, co2Megatons: 640, equivalentHouseholdsMillion: 132 }
];

export const QUERY_ENERGY_COMPARISON = [
  { name: 'Standard Google Web Search', wh: 0.3, waterMl: 12, multiplier: '1x baseline', color: '#10b981' },
  { name: 'Streaming 1hr 4K Video', wh: 1.2, waterMl: 45, multiplier: '4x search', color: '#06b6d4' },
  { name: 'Text Query (Small LLM 7B)', wh: 1.8, waterMl: 65, multiplier: '6x search', color: '#0ea5e9' },
  { name: 'Large Frontier LLM Query (GPT-4/Gemini Ultra)', wh: 4.8, waterMl: 160, multiplier: '16x search', color: '#f59e0b' },
  { name: 'Multi-Step Agentic Reasoning / Deep Search', wh: 14.5, waterMl: 520, multiplier: '48x search', color: '#f97316' },
  { name: 'Diffusion Image Generation (512x512)', wh: 18.0, waterMl: 680, multiplier: '60x search', color: '#ef4444' },
  { name: 'Text-to-Video AI Generation (5 seconds)', wh: 85.0, waterMl: 3100, multiplier: '280x search', color: '#881337' }
];

export const BIG_TECH_EMISSIONS_SURGE = [
  { year: '2020 (Base)', googleMt: 10.3, microsoftMt: 11.2, metaMt: 4.1, amazonMt: 60.6 },
  { year: '2021', googleMt: 11.4, microsoftMt: 13.8, metaMt: 5.3, amazonMt: 71.5 },
  { year: '2022', googleMt: 12.2, microsoftMt: 14.3, metaMt: 6.8, amazonMt: 71.3 },
  { year: '2023', googleMt: 14.3, microsoftMt: 17.1, metaMt: 8.2, amazonMt: 68.8 },
  { year: '2024 (Est.)', googleMt: 15.6, microsoftMt: 18.9, metaMt: 9.8, amazonMt: 72.4 }
];

export const AI_ECO_DIMENSIONS = [
  {
    title: 'The Evaporative Water Cooling Dilemma',
    badge: 'Freshwater Crisis',
    stat: 'Up to 5M gallons / day per campus',
    desc: 'High-density AI accelerator server racks (consuming 40–100 kW per rack) cannot be cooled with ambient air alone. They rely on evaporative cooling towers that consume millions of gallons of potable municipal drinking water daily, frequently located in drought-stricken regions like Arizona, Texas, and Spain.'
  },
  {
    title: 'Fossil Grid Delay & Nuclear Resurrections',
    badge: 'Grid Transition Stagnation',
    stat: 'Coal plant retirements deferred',
    desc: 'Surging demand from hyperscale AI data centers has led electric utilities in the US (Virginia, Georgia, Midwest) to postpone planned retirements of coal-fired power plants. High-profile agreements have also resurrected mothballed nuclear plants, such as Microsoft contracting 100% of the restarted Three Mile Island Unit 1.'
  },
  {
    title: 'Semiconductor Fabrication & Lifecycle E-Waste',
    badge: 'Hardware Embodied Carbon',
    stat: '2–3 year GPU obsolescence',
    desc: 'Manufacturing advanced 3nm and 4nm semiconductor wafers requires super-potent fluorinated greenhouse gases (such as Nitrogen Trifluoride NF3, which is 17,200x more potent than CO2 over 100 years). The rapid obsolescence of AI accelerators leaves behind mountains of toxic electronic waste laden with rare earth elements.'
  },
  {
    title: 'Inference vs. Training Reversal',
    badge: 'Operational Reality',
    stat: '85% of lifetime carbon is inference',
    desc: 'While training a flagship foundation model captures headlines (emitting hundreds of tons of CO2e in weeks), over 80% to 90% of an AI model\'s total lifetime carbon footprint occurs during inference: the billions of daily autocomplete, prompt, and image queries executed across millions of user sessions.'
  }
];

export const DATA_CENTER_GRID_SOURCES = [
  { source: 'Natural Gas', share: 42, color: '#f59e0b' },
  { source: 'Coal', share: 22, color: '#ef4444' },
  { source: 'Nuclear', share: 18, color: '#8b5cf6' },
  { source: 'Renewables (Solar & Wind)', share: 14, color: '#10b981' },
  { source: 'Hydroelectric', share: 4, color: '#06b6d4' }
];
