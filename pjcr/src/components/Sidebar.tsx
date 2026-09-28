import React from 'react';
import { TabType, SubTabType } from '../types';
import {
  Flame,
  BarChart3,
  BookOpen,
  FileText,
  Archive,
  Download,
  Terminal,
  Layers,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface SidebarProps {
  activeTab: TabType;
  activeSubTab?: SubTabType;
  onSelectSubTab: (subTab: SubTabType) => void;
  onSelectTab: (tab: TabType) => void;
  onOpenExport: () => void;
  onToggleLogs?: () => void;
  onOpenHelp?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  activeSubTab,
  onSelectSubTab,
  onSelectTab,
  onOpenExport,
  onToggleLogs,
  onOpenHelp
}) => {
  const subNavItems: { id: SubTabType; label: string; icon: any; count?: string }[] = [
    { id: 'disasters', label: 'Disasters', icon: Flame, count: '24' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'awareness', label: 'Awareness', icon: BookOpen },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'archive', label: 'Archive', icon: Archive }
  ];

  return (
    <aside className="w-64 bg-white/85 backdrop-blur-xl border-r border-slate-200/80 flex flex-col justify-between p-4 shrink-0 z-40 hidden md:flex min-h-[calc(100vh-4rem)] shadow-sm">
      {/* Top Section: System Intelligence Status */}
      <div className="space-y-6">
        {/* Intelligence Status Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 border border-slate-200/90 relative overflow-hidden shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-600 shadow-xs">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
            </div>
            <div>
              <div className="font-bold text-xs text-slate-900 uppercase tracking-wider">System Intel</div>
              <div className="font-data text-[10px] text-sky-600 font-semibold">V3.4 Global Monitor</div>
            </div>
          </div>

          <div className="mt-3.5 pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[11px] font-data">
            <span className="text-slate-500 font-medium">LINK:</span>
            <span className="text-emerald-700 bg-emerald-100/60 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1.5 text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              STABLE (12ms)
            </span>
          </div>
        </div>

        {/* Sub-Navigation */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-data uppercase tracking-widest text-slate-400 font-bold">
            Intelligence Modules
          </div>
          {subNavItems.map((item) => {
            const isActive = activeSubTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSubTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-sky-50 text-sky-700 border border-sky-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-700'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="font-data text-[10px] bg-rose-50 text-rose-600 border border-rose-200 px-2 py-0.5 rounded-full font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Actions & Links */}
      <div className="space-y-3 pt-4 border-t border-slate-200/80">
        <button
          onClick={onOpenExport}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>

        <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-slate-500 font-data">
          <button
            onClick={onToggleLogs}
            className="flex items-center gap-1.5 hover:text-sky-600 font-medium transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Logs</span>
          </button>
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 hover:text-sky-600 font-medium transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Guide</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
