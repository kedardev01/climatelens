import React, { useState } from 'react';
import { SubTabType } from '../types';
import {
  Flame,
  BarChart3,
  BookOpen,
  FileText,
  Archive,
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  ExternalLink,
  MapPin,
  TrendingUp,
  Search
} from 'lucide-react';

interface SubTabsViewProps {
  subTab: SubTabType;
  onOpenExport: () => void;
}

export const SubTabsView: React.FC<SubTabsViewProps> = ({ subTab, onOpenExport }) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high' | 'critical'>('all');

  const disastersList = [
    {
      id: 'd1',
      title: 'Cyclonic Storm "Dana" - Bay of Bengal',
      type: 'Cyclone',
      severity: 'critical',
      location: 'Odisha / West Bengal Coastline',
      windSpeed: '120 km/h',
      status: 'Active Warning',
      affected: '4.2M People in coastal zones',
      date: '2024-10-24'
    },
    {
      id: 'd2',
      title: 'Amazon Basin Hydro-Drought Crisis',
      type: 'Drought',
      severity: 'critical',
      location: 'Rio Negro / Manaus, Brazil',
      windSpeed: 'N/A',
      status: 'Emergency State',
      affected: 'Lowest river levels in 122 years',
      date: '2024-10-18'
    },
    {
      id: 'd3',
      title: 'Western Himalayas Glacier Outburst Risk',
      type: 'GLOF Risk',
      severity: 'high',
      location: 'Sikkim / Himachal Pradesh',
      windSpeed: 'N/A',
      status: 'Telemetry Alert',
      affected: 'Hydro dams on standby',
      date: '2024-10-12'
    },
    {
      id: 'd4',
      title: 'Mediterranean Atmospheric Heat Dome',
      type: 'Heatwave',
      severity: 'high',
      location: 'Southern Europe / Greece / Italy',
      windSpeed: 'N/A',
      status: 'Active',
      affected: '+4.1°C surface anomaly',
      date: '2024-09-28'
    }
  ];

  const archiveReports = [
    { title: 'IPCC AR6 Working Group I: Physical Science Basis', year: '2021', size: '24.2 MB', pages: 3949 },
    { title: 'WMO State of the Global Climate 2023', year: '2024', size: '8.4 MB', pages: 112 },
    { title: 'India Third Biennial Update Report to UNFCCC', year: '2023', size: '14.1 MB', pages: 280 },
    { title: 'Copernicus Climate Change Service: Global Climate Highlights', year: '2024', size: '5.2 MB', pages: 64 },
    { title: 'Global Carbon Budget 2023 Assessment', year: '2023', size: '11.8 MB', pages: 145 }
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {subTab === 'disasters' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
                  <Flame className="w-5 h-5" />
                </span>
                <h2 className="text-xl font-black text-slate-900">Extreme Climate Events Observatory</h2>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Real-time tracking of tropical cyclones, marine heatwaves, glacial lake outbursts, and drought declarations.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-data bg-rose-50 text-rose-700 border border-rose-200 px-3.5 py-1 rounded-full font-bold">
                24 ACTIVE EVENTS MONITORED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {disastersList.map((d) => (
              <div
                key={d.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-rose-300 shadow-sm transition-all space-y-3.5"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-data uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 font-bold">
                    {d.type}
                  </span>
                  <span className="text-xs text-slate-500 font-data font-bold">{d.date}</span>
                </div>

                <h3 className="font-black text-base text-slate-900">{d.title}</h3>

                <div className="grid grid-cols-2 gap-2 text-xs font-data">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-slate-500 block text-[10px] font-semibold">Location</span>
                    <span className="text-slate-900 font-bold block mt-0.5">{d.location}</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <span className="text-slate-500 block text-[10px] font-semibold">Status</span>
                    <span className="text-sky-700 font-bold block mt-0.5">{d.status}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-1 font-normal">
                  Impact Assessment: <strong className="text-slate-800">{d.affected}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100">
                  <BarChart3 className="w-5 h-5" />
                </span>
                <h2 className="text-xl font-black text-slate-900">Planetary Telemetry Analytics</h2>
              </div>
              <p className="text-xs text-slate-600 mt-1">Multi-variate statistical regressions across temperature, greenhouse concentrations, and precipitation shifts.</p>
            </div>
            <button
              onClick={onOpenExport}
              className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              Export Dataset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-data text-slate-500 font-bold">THERMAL FORCING SENSITIVITY</span>
              <div className="text-2xl font-black font-data text-rose-600">+3.0°C per 2x CO2</div>
              <p className="text-xs text-slate-600">IPCC equilibrium climate sensitivity canonical median.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-data text-slate-500 font-bold">GLOBAL CARBON BUDGET (1.5°C)</span>
              <div className="text-2xl font-black font-data text-amber-600">250 Gt CO2 Remaining</div>
              <p className="text-xs text-slate-600">Approximately 6 years at current global annual emission rates.</p>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-data text-slate-500 font-bold">OCEAN HEAT CONTENT (OHC)</span>
              <div className="text-2xl font-black font-data text-sky-700">360 ZJ Anomaly</div>
              <p className="text-xs text-slate-600">Upper 2,000m layer thermal energy accumulation record high.</p>
            </div>
          </div>
        </div>
      )}

      {subTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100">
                  <FileText className="w-5 h-5" />
                </span>
                <h2 className="text-xl font-black text-slate-900">Climate &amp; Policy Intelligence Reports</h2>
              </div>
              <p className="text-xs text-slate-600 mt-1">Official synthesis reports, peer-reviewed telemetry dossiers, and emissions balance sheets.</p>
            </div>
            <button
              onClick={onOpenExport}
              className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              Generate Custom PDF
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider font-data">
              Published Global Dossiers
            </h3>
            <div className="space-y-3">
              {archiveReports.map((r, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-sky-300 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{r.title}</h4>
                    <span className="text-xs text-slate-500 font-data">Year: {r.year} // {r.pages} Pages // {r.size}</span>
                  </div>
                  <button
                    onClick={onOpenExport}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-sky-50 text-sky-700 text-xs font-bold font-data self-start sm:self-auto transition-colors cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(subTab === 'awareness' || subTab === 'archive') && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100 flex items-center justify-center mx-auto">
            <BookOpen className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-black text-slate-900 uppercase tracking-wider font-data">
            {subTab === 'awareness' ? 'Global Awareness & Educational Campaign' : 'Historical Satellite Telemetry Archive'}
          </h2>
          <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
            Access complete historical datasets spanning 1880 to 2024, downloadable in open NetCDF, GeoTIFF, and JSON formats for climate researchers and policy analysts.
          </p>
          <button
            onClick={onOpenExport}
            className="px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            Access Full Telemetry Archive
          </button>
        </div>
      )}
    </div>
  );
};
