import { WarConflictImpact } from '../types';

export const GLOBAL_MILITARY_CLIMATE_STATS = {
  globalMilitaryEmissionsPct: 5.5, // 5.5% of total global GHG emissions
  annualMilitaryEmissionsMt: 2750, // ~2,750 Mt CO2e/year
  militaryGlobalRanking: '4th largest emitter (if the military were a country, between India and Russia)',
  usMilitarySharePct: 1.1, // Single largest institutional consumer of hydrocarbons on Earth
  reportingExemptionPolicy: 'Kyoto Protocol (1997) military reporting exemption + Paris Agreement voluntary loophole',
  heavyMetalResidueHectares: 12500000, // over 12.5M hectares of conflict land contaminated globally
};

export const WAR_CONFLICT_CASE_STUDIES: WarConflictImpact[] = [
  {
    id: 'ukraine-war',
    name: 'Ukraine Conflict Environmental Audit',
    region: 'Eastern Europe / Black Sea Basin',
    period: '2022 – 2024 (Initiative on GHG Accounting of War)',
    totalCO2eMt: 175.0,
    civilianCountryEquivalent: 'Total annual carbon emissions of the Netherlands or 90 million gasoline vehicles',
    directWarfareMt: 35.2,
    firesAndDestructionMt: 23.0,
    reconstructionDebtMt: 56.0,
    displacementAndLogisticsMt: 24.1,
    keyEcologicalImpacts: [
      'Destruction of Kakhovka Hydroelectric Dam releasing 18 km³ of toxic sediment into the Black Sea',
      'Over 1.1 million hectares of pristine steppes, protected reserves, and ancient forests scorched or mined',
      'Severe soil cratering and heavy metal contamination (lead, antimony, nickel, tungsten) across farmland',
      'Nord Stream pipeline sabotages releasing 500,000 tonnes of potent methane (84x CO2 over 20yr)'
    ],
    waterAndSoilDamage: '174,000 km² contaminated by landmines and explosive ordnance; groundwater arsenic and nitroaromatics spike 400%',
    summary: 'The comprehensive scientific assessment conducted by the Initiative on GHG Accounting of War and the Ukrainian Ministry of Environmental Protection demonstrates that modern industrial warfare unleashes colossal carbon spikes—exceeding the entire domestic footprint of industrialized nations.'
  },
  {
    id: 'middle-east-gaza',
    name: 'Middle East & Gaza Humanitarian & Ecological Crisis',
    region: 'Levant / Eastern Mediterranean',
    period: '2023 – Present',
    totalCO2eMt: 61.4,
    civilianCountryEquivalent: 'Equivalent to burning 68 billion pounds of coal; reconstruction will exceed emissions of 135 individual nations',
    directWarfareMt: 18.2,
    firesAndDestructionMt: 8.4,
    reconstructionDebtMt: 31.8,
    displacementAndLogisticsMt: 3.0,
    keyEcologicalImpacts: [
      'Pulverization of over 70% of built infrastructure, turning concrete into toxic airborne crystalline silica particulate',
      'Catastrophic destruction of wastewater treatment plants, discharging 100,000+ m³ of raw sewage daily into the Mediterranean Sea',
      'Complete collapse of municipal solid waste management, causing open toxic refuse fires and vermin vectors',
      'Systematic destruction of rooftop solar installations and water desalination infrastructure'
    ],
    waterAndSoilDamage: 'Coastal Aquifer irreversibly compromised by seawater intrusion, untreated sewage, and unexploded munitions residue; 97% of municipal water declared unfit for human consumption',
    summary: 'Dense urban bombardments generate an acute carbon penalty: the immediate munitions blast emissions are superseded by the colossal embodied carbon required to produce structural concrete, cement, and steel for reconstruction.'
  },
  {
    id: 'gulf-war-oil-fires',
    name: '1991 Gulf War Oil Field Fires & Atmospheric Soot',
    region: 'Kuwait & Persian Gulf',
    period: '1991 (Historical Baseline)',
    totalCO2eMt: 480.0,
    civilianCountryEquivalent: 'Approximately 2% of all global fossil fuel emissions in 1991',
    directWarfareMt: 45.0,
    firesAndDestructionMt: 410.0,
    reconstructionDebtMt: 25.0,
    displacementAndLogisticsMt: 0.0,
    keyEcologicalImpacts: [
      'Over 600 sabotaged oil wells burned uncontrollably for 8 months across the desert',
      'Soot and black carbon plume stretched over 4.2 million km², reducing solar radiation and regional temperatures by 10°C',
      '300 oil lakes formed on the desert floor, cementing millions of birds, reptiles, and desert microbiomes',
      'Massive marine oil slick of 11 million barrels in the Persian Gulf killing coastal mangroves and coral reefs'
    ],
    waterAndSoilDamage: 'Hydrocarbon crust (tarcrete) covered over 900 km² of desert soil, halting seed germination and groundwater percolation for decades',
    summary: 'One of the most deliberate acts of environmental warfare in modern history, demonstrating how targeting fossil fuel assets can convert combat into an international climatic disruption.'
  },
  {
    id: 'vietnam-ecocide',
    name: 'Vietnam War Herbicide Warfare (Operation Ranch Hand)',
    region: 'Southeast Asia / Mekong Basin',
    period: '1961 – 1971 (Historical Baseline)',
    totalCO2eMt: 85.0,
    civilianCountryEquivalent: 'Loss of 2.1 million hectares of tropical carbon sink, permanently altering regional microclimates',
    directWarfareMt: 32.0,
    firesAndDestructionMt: 40.0,
    reconstructionDebtMt: 13.0,
    displacementAndLogisticsMt: 0.0,
    keyEcologicalImpacts: [
      '73 million liters of chemical herbicides (including Agent Orange containing 375 lbs of toxic dioxin TCDD) sprayed over dense jungle canopy',
      'Loss of 500,000 hectares of mangrove forests, eroding coastal river deltas and exterminating endemic wildlife',
      'Bulldozer "Rome plows" clear-cut millions of acres of topsoil, resulting in catastrophic monsoon erosion',
      'Dioxin persistency in sediment and food chains persisting over 50 years after cessation of conflict'
    ],
    waterAndSoilDamage: 'Soil microbiomes extinguished in sprayed target zones; heavy laterization transformed lush soil into rock-hard clay barren land',
    summary: 'The ecological devastation of Vietnam coined the modern term "Ecocide", leading to the 1976 United Nations Environmental Modification Convention (ENMOD).'
  }
];

export const WAR_EMISSIONS_PHASE_BREAKDOWN = [
  { name: 'Reconstruction Debt (Concrete & Steel)', percentage: 38, color: '#f43f5e', description: 'Embodied carbon of Portland cement, aggregate, and structural steel required to rebuild destroyed cities, roads, and bridges.' },
  { name: 'Direct Warfare Operations (Fuel & Ammo)', percentage: 24, color: '#f97316', description: 'Combustion of jet fuel (JP-8), diesel for armored columns, warships, missiles, propellant, and explosive detonation.' },
  { name: 'Energy Infrastructure Strikes & Leaks', percentage: 20, color: '#eab308', description: 'Methane pipeline ruptures, thermal power station strikes, refinery fires, and uncontrolled gas flaring.' },
  { name: 'Landscape, Forest & Field Fires', percentage: 11, color: '#84cc16', description: 'Artillery-ignited wildfire blazes across protected nature reserves, peat bogs, agricultural crops, and pine forests.' },
  { name: 'Refugee Logistics & Rerouted Flights', percentage: 7, color: '#06b6d4', description: 'Forced civilian mass displacement transport plus commercial jet detours around closed conflict airspace.' }
];

export const MILITARY_FOOTPRINT_VS_CIVILIAN = [
  { entity: 'Global Militaries Combined', emissionsMt: 2750, color: '#ef4444', isMilitary: true },
  { entity: 'Russia (Total National)', emissionsMt: 1720, color: '#64748b', isMilitary: false },
  { entity: 'India (Total National)', emissionsMt: 2710, color: '#64748b', isMilitary: false },
  { entity: 'Japan (Total National)', emissionsMt: 1060, color: '#64748b', isMilitary: false },
  { entity: 'Civil Aviation Worldwide', emissionsMt: 920, color: '#0ea5e9', isMilitary: false },
  { entity: 'Commercial Maritime Shipping', emissionsMt: 870, color: '#0284c7', isMilitary: false },
  { entity: 'Germany (Total National)', emissionsMt: 670, color: '#64748b', isMilitary: false },
  { entity: 'United Kingdom (Total National)', emissionsMt: 380, color: '#64748b', isMilitary: false },
];

export const WAR_ECOLOGICAL_DIMENSIONS = [
  {
    title: 'The "Reconstruction Carbon Debt" Trap',
    tag: 'Long-term Burden',
    icon: 'Hammer',
    stat: '35–45% of total war carbon',
    desc: 'When modern artillery or munitions level a city, the primary climate catastrophe happens in the years after fighting ceases. Manufacturing cement, steel rebar, and glass produces 0.9 kg of CO2 per kg of cement produced. Rebuilding destroyed urban centers locks in decades of hyper-intensive carbon debt.'
  },
  {
    title: 'Soil Compaction & Toxic Heavy Metals',
    tag: 'Agricultural Threat',
    icon: 'AlertOctagon',
    stat: 'Centuries of soil poisoning',
    desc: 'Detonated artillery releases heavy metals including lead, antimony, copper, mercury, and depleted uranium. Munition craters disrupt natural drainage layers and compress arable fertile chernozem soils, rendering topsoil toxic and vulnerable to catastrophic wind erosion.'
  },
  {
    title: 'Destruction of Renewable & Hydro Assets',
    tag: 'Clean Energy Setback',
    icon: 'ZapOff',
    stat: 'Gigawatts of clean energy lost',
    desc: 'Warfare routinely destroys clean energy infrastructure. In Ukraine, over 50% of thermal, hydro, and wind capacity was damaged or occupied, forcing remaining grids to ramp up inefficient, dirty coal and diesel back-up generators.'
  },
  {
    title: 'The UNFCCC Military Reporting Exemption',
    tag: 'Policy Blindspot',
    icon: 'FileWarning',
    stat: 'Zero mandatory reporting',
    desc: 'At the 1997 Kyoto negotiations, military operations were granted an exemption from mandatory carbon accounting under national emissions inventories. Under the Paris Agreement, military emissions reporting remains strictly voluntary, leaving huge portions of global carbon off the books.'
  }
];
