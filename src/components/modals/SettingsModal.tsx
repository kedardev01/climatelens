import React, { useState } from 'react';
import { X, Settings, Sliders, Moon, Zap, Shield, Cpu, RefreshCw } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [refreshInterval, setRefreshInterval] = useState('5s');
  const [highContrast, setHighContrast] = useState(false);
  const [particleDensity, setParticleDensity] = useState('High (3500)');
  const [streamAudioFeedback, setStreamAudioFeedback] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-sky-50 text-sky-700 border border-sky-100">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-slate-900 uppercase tracking-wider">System Settings</h3>
              <p className="text-[11px] text-slate-500 font-data">Client Telemetry Preferences</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Temperature Unit */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-800 block">Temperature Scale</label>
              <p className="text-[11px] text-slate-500 font-normal">Display unit for global thermal anomalies</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => setTempUnit('C')}
                className={`px-3.5 py-1 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  tempUnit === 'C' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                °C
              </button>
              <button
                onClick={() => setTempUnit('F')}
                className={`px-3.5 py-1 text-xs font-black rounded-xl transition-all cursor-pointer ${
                  tempUnit === 'F' ? 'bg-white text-sky-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                °F
              </button>
            </div>
          </div>

          {/* Telemetry Polling Rate */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-800 block">Telemetry Sync Stream</label>
              <p className="text-[11px] text-slate-500 font-normal">Frequency of background satellite ingest</p>
            </div>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold px-3.5 py-2 rounded-2xl font-data focus:outline-none focus:border-sky-500"
            >
              <option value="1s">Real-time (1s)</option>
              <option value="5s">Stable (5s)</option>
              <option value="30s">Battery Saver (30s)</option>
            </select>
          </div>

          {/* 3D Visual Detail */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-800 block">WebGL Starfield Density</label>
              <p className="text-[11px] text-slate-500 font-normal">GPU rendering particle allotment</p>
            </div>
            <select
              value={particleDensity}
              onChange={(e) => setParticleDensity(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold px-3.5 py-2 rounded-2xl font-data focus:outline-none focus:border-sky-500"
            >
              <option value="Ultra (5000)">Ultra (5,000)</option>
              <option value="High (3500)">High (3,500)</option>
              <option value="Medium (1500)">Medium (1,500)</option>
            </select>
          </div>

          {/* High Contrast Mode */}
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-800 block">High Contrast HUD</label>
              <p className="text-[11px] text-slate-500 font-normal">Enforce maximum contrast borders</p>
            </div>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="rounded accent-sky-600 w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            Apply Settings
          </button>
        </div>
      </div>
    </div>
  );
};
