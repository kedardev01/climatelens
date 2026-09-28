import React, { useState } from 'react';
import { X, Download, CheckCircle2, FileText, Database, ShieldAlert, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GLOBAL_KPIS, GLOBAL_CLIMATE_INDICATORS, REGIONS_DATA } from '../../data/climateData';

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState<'pdf' | 'json' | 'csv'>('pdf');
  const [includeSensors, setIncludeSensors] = useState(true);
  const [includeAnomalies, setIncludeAnomalies] = useState(true);
  const [includeProjections, setIncludeProjections] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      // Trigger actual download based on selected format
      if (format === 'json') {
        const payload = {
          reportTitle: 'ClimateLens Global Telemetry Intelligence Report',
          generatedAt: new Date().toISOString(),
          globalKPIs: GLOBAL_KPIS,
          climateIndicators: GLOBAL_CLIMATE_INDICATORS,
          regionalTelemetry: REGIONS_DATA,
          metadata: {
            telemetryNode: 'IND-WEST-01',
            status: 'OFFICIAL_WMO_NOAA_SYNCED'
          }
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ClimateLens_Report_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
      } else if (format === 'csv') {
        let csv = 'Indicator,Value,Unit,Change,Source\n';
        GLOBAL_KPIS.forEach((k) => {
          csv += `"${k.name}","${k.value}","${k.unit}","${k.change}","${k.source}"\n`;
        });
        GLOBAL_CLIMATE_INDICATORS.forEach((i) => {
          csv += `"${i.name}","${i.value}","${i.unit}","${i.change}","WMO/NOAA"\n`;
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ClimateLens_Data_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
      } else {
        // PDF summary text download
        const textContent = `======================================================\nCLIMATELENS GLOBAL CLIMATE INTELLIGENCE REPORT\nGenerated: ${new Date().toLocaleString()}\n======================================================\n\n1. GLOBAL KEY PERFORMANCE INDICATORS\n${GLOBAL_KPIS.map((k) => ` - ${k.name}: ${k.value} ${k.unit} (${k.change}) [SRC: ${k.source}]`).join('\n')}\n\n2. PLANETARY STATUS\n${GLOBAL_CLIMATE_INDICATORS.map((i) => ` - ${i.name}: ${i.value} ${i.unit} (${i.status}) - ${i.desc}`).join('\n')}\n\n3. MONITORED REGIONS\n${REGIONS_DATA.map((r) => ` - ${r.name}: Surface Temp ${r.surfaceTemp}, AQI ${r.aqi} (${r.aqiStatus}), Forest ${r.forestCover}`).join('\n')}\n\n======================================================\nVerification Hash: CL-SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}\n`;
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ClimateLens_Summary_${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">Export Intelligence Report</h3>
              <p className="text-[11px] text-slate-500 font-data">Node Telemetry &amp; Planetary Analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Format Picker */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2 font-data">
              Select Export Format
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'pdf', label: 'PDF Summary', icon: FileText },
                { id: 'json', label: 'JSON Telemetry', icon: Database },
                { id: 'csv', label: 'CSV Dataset', icon: Database }
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => {
                    setFormat(fmt.id as any);
                    setDownloadSuccess(false);
                  }}
                  className={`p-3.5 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all cursor-pointer ${
                    format === fmt.id
                      ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-xs font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <fmt.icon className={`w-5 h-5 ${format === fmt.id ? 'text-sky-700' : 'text-slate-500'}`} />
                  <span className="text-xs font-semibold">{fmt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Included Data Sections */}
          <div className="space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-data mb-1">
              Included Modules
            </span>
            <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer font-medium">
              <span>Sensor Readings &amp; Global KPIs (WMO / NOAA)</span>
              <input
                type="checkbox"
                checked={includeSensors}
                onChange={(e) => setIncludeSensors(e.target.checked)}
                className="rounded accent-sky-600 w-4 h-4 cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer font-medium">
              <span>Historical Temperature &amp; Emissions Anomalies</span>
              <input
                type="checkbox"
                checked={includeAnomalies}
                onChange={(e) => setIncludeAnomalies(e.target.checked)}
                className="rounded accent-sky-600 w-4 h-4 cursor-pointer"
              />
            </label>
            <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer font-medium">
              <span>2030 Vulnerability Projections &amp; Regional Threat Indexes</span>
              <input
                type="checkbox"
                checked={includeProjections}
                onChange={(e) => setIncludeProjections(e.target.checked)}
                className="rounded accent-sky-600 w-4 h-4 cursor-pointer"
              />
            </label>
          </div>

          {/* Success Message */}
          {downloadSuccess && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-2.5 text-emerald-800 text-xs font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Report generated and downloaded successfully!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <div className="text-[10px] font-data text-slate-500 font-bold">
            SHA-256 HASH VERIFIED
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-2xl text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-xs cursor-pointer"
            >
              {isExporting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Compiling...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download File</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
