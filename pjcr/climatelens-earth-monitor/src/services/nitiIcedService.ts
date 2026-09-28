/**
 * NITI Aayog - India Climate & Energy Dashboard (ICED 3.0) Service
 * Official data models, indicators, sector metrics and state-level indices
 * Inspired by https://iced.niti.gov.in/ and NITI Aayog State Energy & Climate Index (SECI)
 */

export interface NationalEnergyOverview {
  totalInstalledCapacityMW: number;
  fossilFuelCapacityMW: number;
  fossilSharePct: number;
  nonFossilCapacityMW: number;
  nonFossilSharePct: number;
  solarCapacityMW: number;
  windCapacityMW: number;
  largeHydroCapacityMW: number;
  nuclearCapacityMW: number;
  bioPowerCapacityMW: number;
  smallHydroCapacityMW: number;
  peakDemandMetGW: number;
  annualGenerationBU: number;
  renewableGenerationSharePct: number;
  perCapitaElectricityKWh: number;
  carbonIntensityReductionPct: number; // vs 2005 baseline
  cop26TargetNonFossilMW: number; // 500 GW by 2030
  netZeroTargetYear: number; // 2070
  activeEvCount: number;
  publicEvChargingStations: number;
  forestCarbonStockMT: number; // Million Tonnes CO2 equivalent
}

export const NATIONAL_ICED_METRICS: NationalEnergyOverview = {
  totalInstalledCapacityMW: 446190,
  fossilFuelCapacityMW: 238500,
  fossilSharePct: 53.4,
  nonFossilCapacityMW: 207690,
  nonFossilSharePct: 46.6,
  solarCapacityMW: 85470,
  windCapacityMW: 46160,
  largeHydroCapacityMW: 46920,
  nuclearCapacityMW: 8180,
  bioPowerCapacityMW: 10950,
  smallHydroCapacityMW: 5010,
  peakDemandMetGW: 250.2,
  annualGenerationBU: 1735.4,
  renewableGenerationSharePct: 24.8,
  perCapitaElectricityKWh: 1327,
  carbonIntensityReductionPct: 33.8, // Target 45% by 2030
  cop26TargetNonFossilMW: 500000,
  netZeroTargetYear: 2070,
  activeEvCount: 3820000,
  publicEvChargingStations: 12146,
  forestCarbonStockMT: 7204
};

export interface SeciParameterBreakdown {
  discomPerformance: number; // out of 100
  accessAffordabilityReliability: number; // out of 100
  cleanEnergyInitiatives: number; // out of 100
  energyEfficiency: number; // out of 100
  environmentalSustainability: number; // out of 100
  newInitiatives: number; // out of 100 (EV, Smart meters, Green H2)
}

export interface StateIcedData {
  id: string;
  stateName: string;
  stateCode: string;
  type: 'State' | 'Union Territory';
  zone: string;
  seciRank: number; // 1-36
  seciScore: number; // 0-100
  seciCategory: 'Front Runner' | 'Achiever' | 'Aspirant';
  installedCapacityMW: number;
  renewableCapacityMW: number;
  nonFossilSharePct: number;
  solarCapacityMW: number;
  windCapacityMW: number;
  hydroCapacityMW: number;
  bioPowerCapacityMW: number;
  perCapitaKWh: number;
  discomLossPct: number; // T&D / AT&C loss
  evCount: number;
  evChargingStations: number;
  forestCoverPct: number;
  co2PerCapitaTonnes: number;
  parameters: SeciParameterBreakdown;
  keyInitiative: string;
  majorPowerPlants: string[];
}

export const ALL_STATES_ICED_DATA: StateIcedData[] = [
  {
    id: 'gujarat',
    stateName: 'Gujarat',
    stateCode: 'GJ',
    type: 'State',
    zone: 'Western Arid',
    seciRank: 1,
    seciScore: 50.1,
    seciCategory: 'Front Runner',
    installedCapacityMW: 47200,
    renewableCapacityMW: 24100,
    nonFossilSharePct: 51.1,
    solarCapacityMW: 12500,
    windCapacityMW: 11100,
    hydroCapacityMW: 500,
    bioPowerCapacityMW: 0,
    perCapitaKWh: 2283,
    discomLossPct: 11.2,
    evCount: 245000,
    evChargingStations: 1950,
    forestCoverPct: 7.61,
    co2PerCapitaTonnes: 2.1,
    parameters: {
      discomPerformance: 68.4,
      accessAffordabilityReliability: 61.2,
      cleanEnergyInitiatives: 45.8,
      energyEfficiency: 42.1,
      environmentalSustainability: 43.5,
      newInitiatives: 39.6
    },
    keyInitiative: 'Khavda 30 GW Hybrid Renewable Park & Rooftop Solar Leader',
    majorPowerPlants: ['Khavda Hybrid Park', 'Charanka Solar Park', 'Mundra Thermal', 'Kakrapar Atomic']
  },
  {
    id: 'kerala',
    stateName: 'Kerala',
    stateCode: 'KL',
    type: 'State',
    zone: 'Southern Peninsular',
    seciRank: 2,
    seciScore: 49.1,
    seciCategory: 'Front Runner',
    installedCapacityMW: 5400,
    renewableCapacityMW: 3100,
    nonFossilSharePct: 57.4,
    solarCapacityMW: 1050,
    windCapacityMW: 70,
    hydroCapacityMW: 1950,
    bioPowerCapacityMW: 30,
    perCapitaKWh: 885,
    discomLossPct: 10.3,
    evCount: 190000,
    evChargingStations: 820,
    forestCoverPct: 54.7,
    co2PerCapitaTonnes: 0.9,
    parameters: {
      discomPerformance: 62.1,
      accessAffordabilityReliability: 72.4,
      cleanEnergyInitiatives: 38.9,
      energyEfficiency: 44.5,
      environmentalSustainability: 48.2,
      newInitiatives: 28.5
    },
    keyInitiative: '100% Electrification & Banasura Sagar Floating Solar',
    majorPowerPlants: ['Idukki Hydroelectric', 'Kayamkulam Combined', 'Banasura Sagar Floating Solar']
  },
  {
    id: 'punjab',
    stateName: 'Punjab',
    stateCode: 'PB',
    type: 'State',
    zone: 'Gangetic Plain',
    seciRank: 3,
    seciScore: 48.6,
    seciCategory: 'Front Runner',
    installedCapacityMW: 14600,
    renewableCapacityMW: 2150,
    nonFossilSharePct: 22.8,
    solarCapacityMW: 1250,
    windCapacityMW: 0,
    hydroCapacityMW: 720,
    bioPowerCapacityMW: 180,
    perCapitaKWh: 2160,
    discomLossPct: 14.8,
    evCount: 92000,
    evChargingStations: 380,
    forestCoverPct: 3.67,
    co2PerCapitaTonnes: 1.8,
    parameters: {
      discomPerformance: 64.2,
      accessAffordabilityReliability: 68.1,
      cleanEnergyInitiatives: 32.5,
      energyEfficiency: 41.2,
      environmentalSustainability: 42.0,
      newInitiatives: 43.6
    },
    keyInitiative: 'Bio-CNG CBG Plants from Paddy Stubble & Agro-Solar',
    majorPowerPlants: ['Guru Gobind Singh Super Thermal', 'Bhakra Nangal', 'Lehra Mohabbat']
  },
  {
    id: 'haryana',
    stateName: 'Haryana',
    stateCode: 'HR',
    type: 'State',
    zone: 'Gangetic Plain',
    seciRank: 4,
    seciScore: 47.9,
    seciCategory: 'Front Runner',
    installedCapacityMW: 13200,
    renewableCapacityMW: 1450,
    nonFossilSharePct: 18.5,
    solarCapacityMW: 1100,
    windCapacityMW: 0,
    hydroCapacityMW: 250,
    bioPowerCapacityMW: 100,
    perCapitaKWh: 2185,
    discomLossPct: 13.5,
    evCount: 115000,
    evChargingStations: 540,
    forestCoverPct: 3.63,
    co2PerCapitaTonnes: 2.3,
    parameters: {
      discomPerformance: 66.8,
      accessAffordabilityReliability: 63.4,
      cleanEnergyInitiatives: 29.8,
      energyEfficiency: 43.7,
      environmentalSustainability: 41.5,
      newInitiatives: 42.2
    },
    keyInitiative: 'Smart Metering Rollout & Gurugram EV Charging Hubs',
    majorPowerPlants: ['Rajiv Gandhi Thermal', 'Panipat Thermal', 'Gorakhpur Nuclear (Upcoming)']
  },
  {
    id: 'tamil-nadu',
    stateName: 'Tamil Nadu',
    stateCode: 'TN',
    type: 'State',
    zone: 'Southern Peninsular',
    seciRank: 5,
    seciScore: 47.1,
    seciCategory: 'Front Runner',
    installedCapacityMW: 37800,
    renewableCapacityMW: 19800,
    nonFossilSharePct: 52.4,
    solarCapacityMW: 7800,
    windCapacityMW: 10200,
    hydroCapacityMW: 2300,
    bioPowerCapacityMW: 1000,
    perCapitaKWh: 1895,
    discomLossPct: 12.9,
    evCount: 310000,
    evChargingStations: 1420,
    forestCoverPct: 20.31,
    co2PerCapitaTonnes: 1.7,
    parameters: {
      discomPerformance: 54.8,
      accessAffordabilityReliability: 67.5,
      cleanEnergyInitiatives: 48.9,
      energyEfficiency: 39.8,
      environmentalSustainability: 42.1,
      newInitiatives: 31.5
    },
    keyInitiative: 'Muppandal Wind Power Basin & EV Manufacturing Ecosystem',
    majorPowerPlants: ['Muppandal Wind Corridor', 'Kamuthi Solar Park', 'Kudankulam Nuclear', 'Tuticorin Thermal']
  },
  {
    id: 'karnataka',
    stateName: 'Karnataka',
    stateCode: 'KA',
    type: 'State',
    zone: 'Southern Peninsular',
    seciRank: 6,
    seciScore: 46.8,
    seciCategory: 'Front Runner',
    installedCapacityMW: 32400,
    renewableCapacityMW: 17600,
    nonFossilSharePct: 54.3,
    solarCapacityMW: 9200,
    windCapacityMW: 6100,
    hydroCapacityMW: 3600,
    bioPowerCapacityMW: 1900,
    perCapitaKWh: 1490,
    discomLossPct: 13.8,
    evCount: 340000,
    evChargingStations: 1780,
    forestCoverPct: 20.11,
    co2PerCapitaTonnes: 1.4,
    parameters: {
      discomPerformance: 56.4,
      accessAffordabilityReliability: 62.8,
      cleanEnergyInitiatives: 49.2,
      energyEfficiency: 38.5,
      environmentalSustainability: 44.2,
      newInitiatives: 29.7
    },
    keyInitiative: 'Pavagada Shakti Sthala 2,050 MW Solar Park & EV Capital Bengaluru',
    majorPowerPlants: ['Pavagada Solar Park', 'Sharavathi Hydro', 'Raichur Thermal', 'Kaiga Atomic']
  },
  {
    id: 'rajasthan',
    stateName: 'Rajasthan',
    stateCode: 'RJ',
    type: 'State',
    zone: 'Western Arid',
    seciRank: 7,
    seciScore: 45.4,
    seciCategory: 'Achiever',
    installedCapacityMW: 39800,
    renewableCapacityMW: 26800,
    nonFossilSharePct: 67.3,
    solarCapacityMW: 22400,
    windCapacityMW: 5200,
    hydroCapacityMW: 1750,
    bioPowerCapacityMW: 120,
    perCapitaKWh: 1360,
    discomLossPct: 19.5,
    evCount: 165000,
    evChargingStations: 690,
    forestCoverPct: 4.87,
    co2PerCapitaTonnes: 1.5,
    parameters: {
      discomPerformance: 48.2,
      accessAffordabilityReliability: 59.4,
      cleanEnergyInitiatives: 54.6,
      energyEfficiency: 34.2,
      environmentalSustainability: 43.1,
      newInitiatives: 32.9
    },
    keyInitiative: 'Bhadla 2.25 GW Solar Park & Green Energy Transmission Corridor',
    majorPowerPlants: ['Bhadla Solar Park', 'Fatehgarh Solar Corridor', 'Suratgarh Super Thermal', 'Rawatbhata Atomic']
  },
  {
    id: 'maharashtra',
    stateName: 'Maharashtra',
    stateCode: 'MH',
    type: 'State',
    zone: 'Southern Peninsular',
    seciRank: 8,
    seciScore: 45.2,
    seciCategory: 'Achiever',
    installedCapacityMW: 45600,
    renewableCapacityMW: 14200,
    nonFossilSharePct: 31.1,
    solarCapacityMW: 5800,
    windCapacityMW: 5100,
    hydroCapacityMW: 3300,
    bioPowerCapacityMW: 2700,
    perCapitaKWh: 1588,
    discomLossPct: 15.2,
    evCount: 420000,
    evChargingStations: 2650,
    forestCoverPct: 16.51,
    co2PerCapitaTonnes: 1.9,
    parameters: {
      discomPerformance: 52.6,
      accessAffordabilityReliability: 65.1,
      cleanEnergyInitiatives: 41.5,
      energyEfficiency: 37.8,
      environmentalSustainability: 40.5,
      newInitiatives: 33.7
    },
    keyInitiative: 'Koyna Hydroelectric Pumped Storage & FAME II EV Incentives',
    majorPowerPlants: ['Koyna Hydroelectric', 'Chandrapur Super Thermal', 'Tarapur Atomic', 'Dhule Solar']
  },
  {
    id: 'delhi',
    stateName: 'Delhi (NCT)',
    stateCode: 'DL',
    type: 'Union Territory',
    zone: 'Gangetic Plain',
    seciRank: 9,
    seciScore: 44.8,
    seciCategory: 'Achiever',
    installedCapacityMW: 2400,
    renewableCapacityMW: 310,
    nonFossilSharePct: 12.9,
    solarCapacityMW: 250,
    windCapacityMW: 0,
    hydroCapacityMW: 0,
    bioPowerCapacityMW: 60,
    perCapitaKWh: 1720,
    discomLossPct: 6.8,
    evCount: 280000,
    evChargingStations: 2890,
    forestCoverPct: 13.15,
    co2PerCapitaTonnes: 1.6,
    parameters: {
      discomPerformance: 78.5,
      accessAffordabilityReliability: 74.2,
      cleanEnergyInitiatives: 22.1,
      energyEfficiency: 41.8,
      environmentalSustainability: 24.5,
      newInitiatives: 48.7
    },
    keyInitiative: 'Leading EV Adoption Rate (18% of new sales) & Lowest DISCOM AT&C Losses (6.8%)',
    majorPowerPlants: ['Pragati CCGT', 'Bawana Gas', 'Timarpur-Okhla Waste-to-Energy', 'Delhi Airport Solar']
  },
  {
    id: 'ladakh',
    stateName: 'Ladakh (UT)',
    stateCode: 'LA',
    type: 'Union Territory',
    zone: 'Northern Cryosphere',
    seciRank: 10,
    seciScore: 43.9,
    seciCategory: 'Achiever',
    installedCapacityMW: 180,
    renewableCapacityMW: 155,
    nonFossilSharePct: 86.1,
    solarCapacityMW: 75,
    windCapacityMW: 10,
    hydroCapacityMW: 70,
    bioPowerCapacityMW: 0,
    perCapitaKWh: 620,
    discomLossPct: 18.2,
    evCount: 320,
    evChargingStations: 24,
    forestCoverPct: 1.35,
    co2PerCapitaTonnes: 0.4,
    parameters: {
      discomPerformance: 45.2,
      accessAffordabilityReliability: 48.5,
      cleanEnergyInitiatives: 62.4,
      energyEfficiency: 35.8,
      environmentalSustainability: 61.2,
      newInitiatives: 30.3
    },
    keyInitiative: 'Puga Valley 100 MW Geothermal & 13 GW Mega Solar-BESS Corridor',
    majorPowerPlants: ['Chutak Hydro', 'Nimoo Bazgo Hydro', 'Puga Geothermal Pilot', 'Phyang Solar']
  },
  {
    id: 'jammu-kashmir',
    stateName: 'Jammu & Kashmir (UT)',
    stateCode: 'JK',
    type: 'Union Territory',
    zone: 'Northern Cryosphere',
    seciRank: 11,
    seciScore: 42.8,
    seciCategory: 'Achiever',
    installedCapacityMW: 3600,
    renewableCapacityMW: 2600,
    nonFossilSharePct: 72.2,
    solarCapacityMW: 60,
    windCapacityMW: 0,
    hydroCapacityMW: 2540,
    bioPowerCapacityMW: 0,
    perCapitaKWh: 1240,
    discomLossPct: 44.5,
    evCount: 14000,
    evChargingStations: 75,
    forestCoverPct: 39.15,
    co2PerCapitaTonnes: 0.7,
    parameters: {
      discomPerformance: 31.2,
      accessAffordabilityReliability: 52.4,
      cleanEnergyInitiatives: 49.5,
      energyEfficiency: 36.1,
      environmentalSustainability: 51.8,
      newInitiatives: 35.8
    },
    keyInitiative: 'Chenab River Hydropower Cascade (Baglihar, Dulhasti, Ratle, Pakal Dul)',
    majorPowerPlants: ['Baglihar Hydro', 'Salal Hydro', 'Uri I & II', 'Dulhasti Hydro']
  },
  {
    id: 'arunachal-pradesh',
    stateName: 'Arunachal Pradesh',
    stateCode: 'AR',
    type: 'State',
    zone: 'North-Eastern Frontier',
    seciRank: 12,
    seciScore: 42.1,
    seciCategory: 'Achiever',
    installedCapacityMW: 1250,
    renewableCapacityMW: 1210,
    nonFossilSharePct: 96.8,
    solarCapacityMW: 12,
    windCapacityMW: 0,
    hydroCapacityMW: 1198,
    bioPowerCapacityMW: 0,
    perCapitaKWh: 810,
    discomLossPct: 38.2,
    evCount: 850,
    evChargingStations: 18,
    forestCoverPct: 79.33,
    co2PerCapitaTonnes: 0.3,
    parameters: {
      discomPerformance: 33.4,
      accessAffordabilityReliability: 46.8,
      cleanEnergyInitiatives: 58.7,
      energyEfficiency: 32.1,
      environmentalSustainability: 64.9,
      newInitiatives: 16.7
    },
    keyInitiative: 'Subansiri Lower 2,000 MW & Dibang 2,880 MW Clean Hydropower',
    majorPowerPlants: ['Kameng Hydro', 'Ranganadi Hydro', 'Subansiri Lower (Under Comm)', 'Pare Hydro']
  },
  {
    id: 'andhra-pradesh',
    stateName: 'Andhra Pradesh',
    stateCode: 'AP',
    type: 'State',
    zone: 'Southern Peninsular',
    seciRank: 13,
    seciScore: 44.1,
    seciCategory: 'Achiever',
    installedCapacityMW: 26800,
    renewableCapacityMW: 11200,
    nonFossilSharePct: 41.8,
    solarCapacityMW: 4600,
    windCapacityMW: 4100,
    hydroCapacityMW: 1800,
    bioPowerCapacityMW: 700,
    perCapitaKWh: 1640,
    discomLossPct: 12.1,
    evCount: 142000,
    evChargingStations: 680,
    forestCoverPct: 17.88,
    co2PerCapitaTonnes: 1.6,
    parameters: {
      discomPerformance: 54.1,
      accessAffordabilityReliability: 63.8,
      cleanEnergyInitiatives: 44.5,
      energyEfficiency: 36.8,
      environmentalSustainability: 38.9,
      newInitiatives: 26.5
    },
    keyInitiative: 'Pinnapuram 5.2 GW Integrated Renewable Energy with Pumped Storage',
    majorPowerPlants: ['Kurnool Ultra Mega Solar', 'Srisailam Hydro', 'Simhadri Super Thermal', 'Pinnapuram Hybrid']
  },
  {
    id: 'telangana',
    stateName: 'Telangana',
    stateCode: 'TG',
    type: 'State',
    zone: 'Southern Peninsular',
    seciRank: 14,
    seciScore: 43.5,
    seciCategory: 'Achiever',
    installedCapacityMW: 20400,
    renewableCapacityMW: 5800,
    nonFossilSharePct: 28.4,
    solarCapacityMW: 4700,
    windCapacityMW: 130,
    hydroCapacityMW: 2400,
    bioPowerCapacityMW: 220,
    perCapitaKWh: 2012,
    discomLossPct: 14.2,
    evCount: 135000,
    evChargingStations: 740,
    forestCoverPct: 18.35,
    co2PerCapitaTonnes: 1.8,
    parameters: {
      discomPerformance: 51.2,
      accessAffordabilityReliability: 66.8,
      cleanEnergyInitiatives: 38.4,
      energyEfficiency: 35.1,
      environmentalSustainability: 36.7,
      newInitiatives: 32.8
    },
    keyInitiative: 'Ramagundam 100 MW Floating Solar & 24x7 Agricultural Power Supply',
    majorPowerPlants: ['Ramagundam Floating Solar', 'Nagarjuna Sagar Hydro', 'Kothagudem Thermal', 'Singareni Thermal']
  },
  {
    id: 'madhya-pradesh',
    stateName: 'Madhya Pradesh',
    stateCode: 'MP',
    type: 'State',
    zone: 'Central Heartland',
    seciRank: 15,
    seciScore: 42.4,
    seciCategory: 'Achiever',
    installedCapacityMW: 31200,
    renewableCapacityMW: 7100,
    nonFossilSharePct: 22.8,
    solarCapacityMW: 3400,
    windCapacityMW: 2500,
    hydroCapacityMW: 3200,
    bioPowerCapacityMW: 130,
    perCapitaKWh: 1140,
    discomLossPct: 24.1,
    evCount: 125000,
    evChargingStations: 490,
    forestCoverPct: 25.14,
    co2PerCapitaTonnes: 1.4,
    parameters: {
      discomPerformance: 44.8,
      accessAffordabilityReliability: 57.2,
      cleanEnergyInitiatives: 39.1,
      energyEfficiency: 34.5,
      environmentalSustainability: 43.8,
      newInitiatives: 35.0
    },
    keyInitiative: 'Rewa Ultra Mega 750 MW Solar & Omkareshwar 600 MW Floating Solar',
    majorPowerPlants: ['Rewa Solar Park', 'Indira Sagar Hydro', 'Omkareshwar Hydro', 'Sanjay Gandhi Thermal']
  },
  {
    id: 'himachal-pradesh',
    stateName: 'Himachal Pradesh',
    stateCode: 'HP',
    type: 'State',
    zone: 'Northern Cryosphere',
    seciRank: 16,
    seciScore: 43.1,
    seciCategory: 'Achiever',
    installedCapacityMW: 11400,
    renewableCapacityMW: 10900,
    nonFossilSharePct: 95.6,
    solarCapacityMW: 120,
    windCapacityMW: 0,
    hydroCapacityMW: 10780,
    bioPowerCapacityMW: 10,
    perCapitaKWh: 1645,
    discomLossPct: 12.8,
    evCount: 6500,
    evChargingStations: 85,
    forestCoverPct: 27.73,
    co2PerCapitaTonnes: 0.6,
    parameters: {
      discomPerformance: 52.8,
      accessAffordabilityReliability: 64.1,
      cleanEnergyInitiatives: 51.2,
      energyEfficiency: 37.4,
      environmentalSustainability: 53.6,
      newInitiatives: 19.5
    },
    keyInitiative: 'Green Energy State Target by 2026 & Nathpa Jhakri 1,500 MW Hydro',
    majorPowerPlants: ['Nathpa Jhakri Hydro', 'Karcham Wangtoo Hydro', 'Bhakra Dam', 'Kol Dam Hydro']
  },
  {
    id: 'uttarakhand',
    stateName: 'Uttarakhand',
    stateCode: 'UK',
    type: 'State',
    zone: 'Northern Cryosphere',
    seciRank: 17,
    seciScore: 42.5,
    seciCategory: 'Achiever',
    installedCapacityMW: 5200,
    renewableCapacityMW: 4100,
    nonFossilSharePct: 78.8,
    solarCapacityMW: 580,
    windCapacityMW: 0,
    hydroCapacityMW: 3520,
    bioPowerCapacityMW: 30,
    perCapitaKWh: 1520,
    discomLossPct: 15.6,
    evCount: 22000,
    evChargingStations: 120,
    forestCoverPct: 45.44,
    co2PerCapitaTonnes: 0.8,
    parameters: {
      discomPerformance: 48.9,
      accessAffordabilityReliability: 61.2,
      cleanEnergyInitiatives: 46.5,
      energyEfficiency: 35.8,
      environmentalSustainability: 52.1,
      newInitiatives: 20.5
    },
    keyInitiative: 'Tehri 2,400 MW Hydro-PSP Complex & High-Altitude Solar Rooftops',
    majorPowerPlants: ['Tehri Dam & Pumped Storage', 'Koteshwar Hydro', 'Chibro Hydro', 'Gama Thermal']
  },
  {
    id: 'odisha',
    stateName: 'Odisha',
    stateCode: 'OD',
    type: 'State',
    zone: 'Eastern Deltas',
    seciRank: 18,
    seciScore: 41.6,
    seciCategory: 'Achiever',
    installedCapacityMW: 12800,
    renewableCapacityMW: 2900,
    nonFossilSharePct: 22.7,
    solarCapacityMW: 520,
    windCapacityMW: 0,
    hydroCapacityMW: 2150,
    bioPowerCapacityMW: 60,
    perCapitaKWh: 2100,
    discomLossPct: 23.4,
    evCount: 65000,
    evChargingStations: 290,
    forestCoverPct: 33.5,
    co2PerCapitaTonnes: 2.8,
    parameters: {
      discomPerformance: 46.1,
      accessAffordabilityReliability: 54.8,
      cleanEnergyInitiatives: 34.2,
      energyEfficiency: 36.5,
      environmentalSustainability: 41.2,
      newInitiatives: 37.0
    },
    keyInitiative: 'Private DISCOM PPP Model (TP Central/Western) & Green Hydrogen Hub at Paradip',
    majorPowerPlants: ['Hirakud Hydro', 'Talcher Super Thermal', 'IB Thermal', 'Balimela Hydro']
  },
  {
    id: 'west-bengal',
    stateName: 'West Bengal',
    stateCode: 'WB',
    type: 'State',
    zone: 'Eastern Deltas',
    seciRank: 19,
    seciScore: 40.8,
    seciCategory: 'Achiever',
    installedCapacityMW: 18900,
    renewableCapacityMW: 1950,
    nonFossilSharePct: 10.3,
    solarCapacityMW: 210,
    windCapacityMW: 0,
    hydroCapacityMW: 1390,
    bioPowerCapacityMW: 350,
    perCapitaKWh: 780,
    discomLossPct: 18.9,
    evCount: 88000,
    evChargingStations: 410,
    forestCoverPct: 19.04,
    co2PerCapitaTonnes: 1.3,
    parameters: {
      discomPerformance: 49.5,
      accessAffordabilityReliability: 58.2,
      cleanEnergyInitiatives: 27.8,
      energyEfficiency: 35.1,
      environmentalSustainability: 38.5,
      newInitiatives: 36.0
    },
    keyInitiative: 'Purulia 900 MW Pumped Storage Hydro & Kolkata Clean Electric Tram/Bus Transit',
    majorPowerPlants: ['Purulia Pumped Storage', 'Bakreswar Thermal', 'Kolaghat Thermal', 'Bandel Thermal']
  },
  {
    id: 'assam',
    stateName: 'Assam',
    stateCode: 'AS',
    type: 'State',
    zone: 'North-Eastern Frontier',
    seciRank: 20,
    seciScore: 39.4,
    seciCategory: 'Achiever',
    installedCapacityMW: 2200,
    renewableCapacityMW: 720,
    nonFossilSharePct: 32.7,
    solarCapacityMW: 150,
    windCapacityMW: 0,
    hydroCapacityMW: 520,
    bioPowerCapacityMW: 50,
    perCapitaKWh: 430,
    discomLossPct: 19.8,
    evCount: 78000,
    evChargingStations: 160,
    forestCoverPct: 36.09,
    co2PerCapitaTonnes: 0.6,
    parameters: {
      discomPerformance: 42.1,
      accessAffordabilityReliability: 48.9,
      cleanEnergyInitiatives: 33.4,
      energyEfficiency: 32.8,
      environmentalSustainability: 45.2,
      newInitiatives: 34.0
    },
    keyInitiative: 'Numaligarh Bamboo-based Bio-Ethanol Refinery & 1,000 MW Solar Initiative',
    majorPowerPlants: ['Karbi Langpi Hydro', 'Lakwa Gas Thermal', 'Namrup Combined', 'Amingaon Solar']
  },
  {
    id: 'sikkim',
    stateName: 'Sikkim',
    stateCode: 'SK',
    type: 'State',
    zone: 'North-Eastern Frontier',
    seciRank: 21,
    seciScore: 43.5,
    seciCategory: 'Achiever',
    installedCapacityMW: 2400,
    renewableCapacityMW: 2380,
    nonFossilSharePct: 99.2,
    solarCapacityMW: 5,
    windCapacityMW: 0,
    hydroCapacityMW: 2375,
    bioPowerCapacityMW: 0,
    perCapitaKWh: 980,
    discomLossPct: 22.4,
    evCount: 410,
    evChargingStations: 16,
    forestCoverPct: 47.11,
    co2PerCapitaTonnes: 0.4,
    parameters: {
      discomPerformance: 40.2,
      accessAffordabilityReliability: 58.7,
      cleanEnergyInitiatives: 59.8,
      energyEfficiency: 34.1,
      environmentalSustainability: 56.4,
      newInitiatives: 12.0
    },
    keyInitiative: '100% Organic Farming State & Teesta River Clean Hydropower Cascade',
    majorPowerPlants: ['Teesta V Hydro (510 MW)', 'Teesta III Hydro', 'Rangit Hydro', 'Chuzachen Hydro']
  },
  {
    id: 'chhattisgarh',
    stateName: 'Chhattisgarh',
    stateCode: 'CG',
    type: 'State',
    zone: 'Central Heartland',
    seciRank: 22,
    seciScore: 38.9,
    seciCategory: 'Achiever',
    installedCapacityMW: 14800,
    renewableCapacityMW: 1250,
    nonFossilSharePct: 8.4,
    solarCapacityMW: 320,
    windCapacityMW: 0,
    hydroCapacityMW: 140,
    bioPowerCapacityMW: 790,
    perCapitaKWh: 2040,
    discomLossPct: 18.2,
    evCount: 62000,
    evChargingStations: 190,
    forestCoverPct: 41.21,
    co2PerCapitaTonnes: 3.2,
    parameters: {
      discomPerformance: 44.8,
      accessAffordabilityReliability: 52.4,
      cleanEnergyInitiatives: 25.1,
      energyEfficiency: 33.8,
      environmentalSustainability: 38.4,
      newInitiatives: 39.0
    },
    keyInitiative: 'Biomass Cogeneration Power Plants & Supercritical Pithead Thermal Plants',
    majorPowerPlants: ['Korba Super Thermal', 'Hasdeo Thermal', 'Sipat Super Thermal', 'Marwa Thermal']
  },
  {
    id: 'jharkhand',
    stateName: 'Jharkhand',
    stateCode: 'JH',
    type: 'State',
    zone: 'Eastern Deltas',
    seciRank: 23,
    seciScore: 35.8,
    seciCategory: 'Aspirant',
    installedCapacityMW: 4800,
    renewableCapacityMW: 240,
    nonFossilSharePct: 5.0,
    solarCapacityMW: 130,
    windCapacityMW: 0,
    hydroCapacityMW: 210,
    bioPowerCapacityMW: 0,
    perCapitaKWh: 890,
    discomLossPct: 32.5,
    evCount: 41000,
    evChargingStations: 140,
    forestCoverPct: 29.76,
    co2PerCapitaTonnes: 2.9,
    parameters: {
      discomPerformance: 31.8,
      accessAffordabilityReliability: 46.2,
      cleanEnergyInitiatives: 22.4,
      energyEfficiency: 31.5,
      environmentalSustainability: 36.8,
      newInitiatives: 46.0
    },
    keyInitiative: 'Damodar Valley Corporation DVC Canal-Top Solar & Coal Bed Methane Pilots',
    majorPowerPlants: ['Patratu Thermal', 'Maithon Hydro (DVC)', 'Bokaro Thermal', 'North Karanpura Super Thermal']
  },
  {
    id: 'bihar',
    stateName: 'Bihar',
    stateCode: 'BR',
    type: 'State',
    zone: 'Gangetic Plain',
    seciRank: 24,
    seciScore: 37.2,
    seciCategory: 'Aspirant',
    installedCapacityMW: 8600,
    renewableCapacityMW: 480,
    nonFossilSharePct: 5.6,
    solarCapacityMW: 240,
    windCapacityMW: 0,
    hydroCapacityMW: 60,
    bioPowerCapacityMW: 180,
    perCapitaKWh: 360,
    discomLossPct: 28.6,
    evCount: 110000,
    evChargingStations: 230,
    forestCoverPct: 7.84,
    co2PerCapitaTonnes: 0.5,
    parameters: {
      discomPerformance: 36.4,
      accessAffordabilityReliability: 49.1,
      cleanEnergyInitiatives: 21.8,
      energyEfficiency: 32.4,
      environmentalSustainability: 35.2,
      newInitiatives: 48.0
    },
    keyInitiative: 'Prepaid Smart Metering Leader (3.5M+ meters installed) & Jal-Jeevan-Hariyali',
    majorPowerPlants: ['Barh Super Thermal', 'NTPC Kahalgaon', 'Kanti Thermal', 'Nabinagar Super Thermal']
  },
  {
    id: 'uttar-pradesh',
    stateName: 'Uttar Pradesh',
    stateCode: 'UP',
    type: 'State',
    zone: 'Gangetic Plain',
    seciRank: 25,
    seciScore: 38.6,
    seciCategory: 'Achiever',
    installedCapacityMW: 32500,
    renewableCapacityMW: 5100,
    nonFossilSharePct: 15.7,
    solarCapacityMW: 2800,
    windCapacityMW: 0,
    hydroCapacityMW: 530,
    bioPowerCapacityMW: 2200,
    perCapitaKWh: 680,
    discomLossPct: 26.4,
    evCount: 520000,
    evChargingStations: 1650,
    forestCoverPct: 6.15,
    co2PerCapitaTonnes: 1.1,
    parameters: {
      discomPerformance: 38.2,
      accessAffordabilityReliability: 51.5,
      cleanEnergyInitiatives: 31.8,
      energyEfficiency: 34.6,
      environmentalSustainability: 35.8,
      newInitiatives: 40.0
    },
    keyInitiative: 'National Leader in Electric Vehicle Registrations & Bundelkhand 4 GW Solar Corridor',
    majorPowerPlants: ['Singrauli Super Thermal', 'Anpara Thermal', 'Obra Thermal', 'Narora Atomic']
  },
  {
    id: 'andaman-nicobar',
    stateName: 'Andaman & Nicobar (UT)',
    stateCode: 'AN',
    type: 'Union Territory',
    zone: 'Island Territory',
    seciRank: 26,
    seciScore: 40.2,
    seciCategory: 'Achiever',
    installedCapacityMW: 120,
    renewableCapacityMW: 35,
    nonFossilSharePct: 29.2,
    solarCapacityMW: 30,
    windCapacityMW: 0,
    hydroCapacityMW: 5,
    bioPowerCapacityMW: 0,
    perCapitaKWh: 790,
    discomLossPct: 16.5,
    evCount: 180,
    evChargingStations: 12,
    forestCoverPct: 81.75,
    co2PerCapitaTonnes: 0.8,
    parameters: {
      discomPerformance: 42.5,
      accessAffordabilityReliability: 54.1,
      cleanEnergyInitiatives: 39.8,
      energyEfficiency: 31.2,
      environmentalSustainability: 58.6,
      newInitiatives: 15.0
    },
    keyInitiative: 'Green Island Zero-Diesel Transition Target & 50 MWh Distributed Battery Storage',
    majorPowerPlants: ['Garacharma Solar-BESS', 'Kalpong Hydro (Diglipur)', 'Suryachakra Power']
  },
  {
    id: 'lakshadweep',
    stateName: 'Lakshadweep (UT)',
    stateCode: 'LD',
    type: 'Union Territory',
    zone: 'Island Territory',
    seciRank: 27,
    seciScore: 39.1,
    seciCategory: 'Achiever',
    installedCapacityMW: 28,
    renewableCapacityMW: 8,
    nonFossilSharePct: 28.6,
    solarCapacityMW: 8,
    windCapacityMW: 0,
    hydroCapacityMW: 0,
    bioPowerCapacityMW: 0,
    perCapitaKWh: 820,
    discomLossPct: 14.8,
    evCount: 65,
    evChargingStations: 8,
    forestCoverPct: 90.33,
    co2PerCapitaTonnes: 0.5,
    parameters: {
      discomPerformance: 41.2,
      accessAffordabilityReliability: 53.8,
      cleanEnergyInitiatives: 38.5,
      energyEfficiency: 30.5,
      environmentalSustainability: 59.8,
      newInitiatives: 12.0
    },
    keyInitiative: 'Solar-Plus-Storage Microgrids across 10 Inhabited Atolls & Low Temperature Thermal Desalination (LTTD)',
    majorPowerPlants: ['Kavaratti Solar-BESS', 'Agatti Island Microgrid', 'Minicoy Hybrid Solar']
  },
  {
    id: 'goa',
    stateName: 'Goa',
    stateCode: 'GA',
    type: 'State',
    zone: 'Southern Peninsular',
    seciRank: 28,
    seciScore: 45.8,
    seciCategory: 'Front Runner',
    installedCapacityMW: 620,
    renewableCapacityMW: 45,
    nonFossilSharePct: 7.3,
    solarCapacityMW: 40,
    windCapacityMW: 0,
    hydroCapacityMW: 0,
    bioPowerCapacityMW: 5,
    perCapitaKWh: 2460,
    discomLossPct: 13.1,
    evCount: 28000,
    evChargingStations: 145,
    forestCoverPct: 60.62,
    co2PerCapitaTonnes: 1.9,
    parameters: {
      discomPerformance: 55.4,
      accessAffordabilityReliability: 68.2,
      cleanEnergyInitiatives: 32.4,
      energyEfficiency: 40.5,
      environmentalSustainability: 52.8,
      newInitiatives: 25.5
    },
    keyInitiative: '100% Green Energy Mandate for New Commercial Buildings & EV Tourism Fleet',
    majorPowerPlants: ['Reliance Sancoale Gas', 'Khandepar Solar', 'Salaulim Solar']
  }
];

/**
 * Helper to retrieve State ICED profile by state ID
 */
export function getStateIcedProfile(stateId: string): StateIcedData | undefined {
  return ALL_STATES_ICED_DATA.find((s) => s.id === stateId);
}

/**
 * SECI Rank Category Badges
 */
export function getSeciCategoryColor(category: 'Front Runner' | 'Achiever' | 'Aspirant'): {
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentHex: string;
} {
  switch (category) {
    case 'Front Runner':
      return {
        badgeBg: 'bg-[#00e676]/20',
        badgeText: 'text-[#00e676]',
        badgeBorder: 'border-[#00e676]/40',
        accentHex: '#00e676'
      };
    case 'Achiever':
      return {
        badgeBg: 'bg-[#00e5ff]/20',
        badgeText: 'text-[#00e5ff]',
        badgeBorder: 'border-[#00e5ff]/40',
        accentHex: '#00e5ff'
      };
    case 'Aspirant':
      return {
        badgeBg: 'bg-[#ffd166]/20',
        badgeText: 'text-[#ffd166]',
        badgeBorder: 'border-[#ffd166]/40',
        accentHex: '#ffd166'
      };
  }
}
