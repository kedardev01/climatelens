import React, { useState } from 'react';
import { TabType } from '../types';
import { Bell, Settings, Activity, ShieldCheck, X, CheckCircle2, AlertTriangle, Download, BarChart2, ShieldAlert, Cpu } from 'lucide-react';

interface TopNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSettings: () => void;
  onOpenExport?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenSettings,
  onOpenExport
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Monsoon Telemetry Alert',
      time: '2m ago',
      type: 'warn',
      desc: 'Monsoon deficit detected in Sub-division 14. Anomaly adjusted to -12%.'
    },
    {
      id: '2',
      title: 'LULUCF Data Synchronized',
      time: '14m ago',
      type: 'success',
      desc: 'Global carbon sink estimates updated from Copernicus Atmosphere Service.'
    },
    {
      id: '3',
      title: 'Wet-Bulb Extreme Warning',
      time: '1h ago',
      type: 'alert',
      desc: 'Surface thermal sensor in NW corridor exceeded 35°C wet-bulb index.'
    }
  ]);

  const navItems: { id: TabType; label: string; badge?: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'war-impact', label: 'War & Climate' },
    { id: 'ai-impact', label: 'AI Boom' },
    { id: 'live-earth', label: 'Live Earth' },
    { id: 'climate', label: 'Climate' },
    { id: 'environment', label: 'Environment' },
    { id: 'energy', label: 'Energy' },
    { id: 'india', label: 'India' }
  ];

  return (
    <header className="bg-white/85 backdrop-blur-xl border-b border-slate-200/80 flex justify-between items-center w-full px-4 md:px-6 h-16 z-50 sticky top-0 shadow-sm">
      {/* Brand & Tabs */}
      <div className="flex items-center gap-4 xl:gap-6 overflow-hidden">
        <button
          onClick={() => onSelectTab('overview')}
          className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-teal-600 flex items-center justify-center text-white font-bold text-base shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
            CL
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
              ClimateLens
            </span>
            <span className="hidden xl:inline-block ml-2 text-[10px] uppercase font-data tracking-widest text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full font-semibold">
              Earth Monitor
            </span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-0.5 font-semibold text-xs tracking-wider uppercase h-16 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`h-full px-3 flex items-center border-b-2 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-sky-600 border-sky-600 bg-sky-50/50 font-bold'
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Trailing Tools: Telemetry Badge, Notifications, Settings */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Live Pulse Indicator */}
        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full font-data text-[11px] text-emerald-700 font-semibold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>LIVE TELEMETRY</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors focus:outline-none cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 z-50 border border-slate-200 animate-fadeIn">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sky-600" />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-900">System Advisories</span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-slate-50/90 border border-slate-200/70 hover:border-sky-300 hover:bg-sky-50/40 transition-all">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-1.5 font-semibold text-xs text-slate-900">
                        {n.type === 'warn' && <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                        {n.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                        {n.type === 'alert' && <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />}
                        <span>{n.title}</span>
                      </div>
                      <span className="font-data text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-between items-center">
                <button
                  onClick={() => setNotifications([])}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 uppercase tracking-wider cursor-pointer"
                >
                  Clear All
                </button>
                <span className="text-[11px] text-sky-600 font-data font-semibold bg-sky-50 px-2 py-0.5 rounded-md">Node: IND-WEST // Stable</span>
              </div>
            </div>
          )}
        </div>

        {/* Export Button */}
        {onOpenExport && (
          <button
            onClick={onOpenExport}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 hover:bg-sky-100 transition-colors text-xs font-bold cursor-pointer shadow-xs"
            title="Export Intelligence Report"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        )}

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors focus:outline-none cursor-pointer"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
